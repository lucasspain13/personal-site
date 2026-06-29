#!/usr/bin/env bash
set -euo pipefail

# Build + publish the static site to S3 and invalidate CloudFront.
# Invoked by semantic-release (@semantic-release/exec publishCmd) once a
# release is cut, so this only runs after a successful version bump on main.

BUCKET="lucas-spain.com"
DISTRIBUTION_ID="E38BBTIAOYYYYC"
IMMUTABLE="public, max-age=31536000, immutable"
LONG_CACHE="public, max-age=2592000"
NO_CACHE="no-cache, must-revalidate"

npm run build

# 1) Publish new content-hashed bundles alongside the old ones (no --delete
#    yet). The live index.html still references the old hashes, so in-flight
#    clients keep working until they reload.
aws s3 sync build/_app/ "s3://${BUCKET}/_app/" \
  --cache-control "${IMMUTABLE}" \
  --exclude ".DS_Store"

# 2) Images with a 30-day cache.
aws s3 sync build/images/ "s3://${BUCKET}/images/" \
  --cache-control "${LONG_CACHE}" \
  --exclude ".DS_Store"

# 3) Publish root files (index.html, favicon, robots, sitemap) and prune
#    orphaned root files. The new index.html — pointing at the new bundle
#    hashes — goes live here. PDFs are handled separately (step 3b) so they
#    get an explicit Content-Type.
aws s3 sync build/ "s3://${BUCKET}/" \
  --delete \
  --exclude "_app/*" \
  --exclude "images/*" \
  --exclude ".DS_Store" \
  --exclude "*.pdf" \
  --cache-control "${NO_CACHE}"

# 3b) Upload PDFs (e.g. the resume) with an EXPLICIT Content-Type. We use
#     `cp` (not `sync`) so the correct metadata is reasserted every deploy —
#     `sync` skips objects whose size/mtime match, which can leave a stale
#     Content-Type that makes the file download as ".pdf.html".
while IFS= read -r pdf; do
  aws s3 cp "${pdf}" "s3://${BUCKET}/$(basename "${pdf}")" \
    --content-type "application/pdf" \
    --cache-control "${LONG_CACHE}"
done < <(find build -maxdepth 1 -type f -name "*.pdf")

# 4) Prune stale hashed bundles now that no HTML references them.
aws s3 sync build/_app/ "s3://${BUCKET}/_app/" \
  --delete \
  --cache-control "${IMMUTABLE}" \
  --exclude ".DS_Store"

# 5) Invalidate every non-hashed path so updated HTML / images / metadata go
#    live, while leaving /_app/* alone — those are content-hashed immutable
#    bundles, and evicting them from the edge would 404 lazy imports for
#    clients still running the previous index.html. Build the path list
#    dynamically so any new top-level file/dir is cache-busted automatically.
INVALIDATION_PATHS=("/")
while IFS= read -r f; do
  INVALIDATION_PATHS+=("/$(basename "$f")")
done < <(find build -maxdepth 1 -type f ! -name ".DS_Store")
for d in build/*/; do
  name="$(basename "$d")"
  case "$name" in
    _app) continue ;;
  esac
  INVALIDATION_PATHS+=("/${name}/*")
done

aws cloudfront create-invalidation \
  --distribution-id "${DISTRIBUTION_ID}" \
  --paths "${INVALIDATION_PATHS[@]}"
