<script>
	import Footer from '$lib/components/Footer.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import '../app.css';
	import Header from './Header.svelte';
</script>

<div class="app min-h-screen flex flex-col bg-base-100 text-base-content w-full">
	<Header />

	<main class="flex-1 w-full">
		<slot />
	</main>

	<Footer />
	<ScrollToTop />
</div>

<style>
	:global(html) {
		/* Keep anchor targets clear of the sticky header. */
		scroll-padding-top: 5rem;
		scroll-behavior: smooth;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(html) {
			scroll-behavior: auto;
		}
	}

	:global(::selection) {
		background-color: var(--p);
		color: white;
	}

	:global(.page-section) {
		padding-top: 4rem;
		padding-bottom: 4rem;
	}

	@media (min-width: 768px) {
		:global(.page-section) {
			padding-left: 2rem;
			padding-right: 2rem;
		}
	}

	:global(.section-subtitle) {
		font-size: 1.25rem;
		line-height: 1.75rem;
		margin-bottom: 3rem;
		text-align: center;
		opacity: 0.8;
	}

	@media (min-width: 768px) {
		:global(.section-subtitle) {
			font-size: 1.5rem;
			line-height: 2rem;
		}
	}

	:global(.container) {
		max-width: 80rem;
		margin-left: auto;
		margin-right: auto;
		box-sizing: border-box;
	}

	:global(.card-hover) {
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 300ms;
	}

	:global(.card-hover:hover) {
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
		transform: translateY(-0.25rem);
	}

	:global(.section-title) {
		font-size: 2.25rem;
		line-height: 2.5rem;
		font-weight: 700;
		margin-bottom: 2rem;
		text-align: center;
	}

	@media (min-width: 768px) {
		:global(.section-title) {
			font-size: 3rem;
			line-height: 1;
		}
	}

	:global(.animate-on-scroll) {
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.6s ease-out,
			transform 0.6s ease-out;
	}

	:global(.animate-on-scroll.visible) {
		opacity: 1;
		transform: translateY(0);
	}
</style>
