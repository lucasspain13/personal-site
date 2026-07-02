<script>
	import Footer from '$lib/components/Footer.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import '../app.css';
	import Header from './Header.svelte';
</script>

<div class="flex min-h-screen w-full flex-col bg-base-100 text-base-content">
	<a
		href="#main"
		class="meta absolute left-4 top-4 z-[60] -translate-y-20 border border-base-content bg-base-100 px-3 py-2 transition-transform focus:translate-y-0"
	>
		Skip to content
	</a>

	<Header />

	<main id="main" class="w-full flex-1">
		<slot />
	</main>

	<Footer />
	<ScrollToTop />
</div>

<style>
	:global(html) {
		/* Keep anchor targets clear of the sticky header. */
		scroll-padding-top: 4.5rem;
		scroll-behavior: smooth;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(html) {
			scroll-behavior: auto;
		}
	}
</style>
