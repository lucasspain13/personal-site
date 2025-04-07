<script lang="ts">
	export let title = 'Portfolio | Software Engineer';
	export let description =
		'Software Engineer specializing in web development, application development, machine learning operations, and infrastructure operations.';
	export let keywords =
		'software engineer, web development, full stack, AI, machine learning, operations, portfolio';
	export let author = 'Your Name';
	export let ogImage = '/og-image.jpg';
	export let ogUrl = 'https://yourportfolio.com';
	export let twitterHandle = '@yourhandle';
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content={author} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={ogUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={ogUrl} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={ogImage} />
	<meta property="twitter:creator" content={twitterHandle} />

	<!-- Canonical URL -->
	<link rel="canonical" href={ogUrl} />
</svelte:head>
