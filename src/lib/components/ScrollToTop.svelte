<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	let scrollY = 0;
	$: showButton = scrollY > 300;

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window bind:scrollY />

{#if showButton}
	<button
		on:click={scrollToTop}
		class="btn btn-circle btn-primary fixed bottom-6 right-6 z-50 shadow-lg transition-transform duration-300 hover:scale-110"
		aria-label="Scroll to top"
		in:fly={{ y: 20, duration: 300 }}
		out:fade={{ duration: 200 }}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			class="h-6 w-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
		</svg>
	</button>
{/if}
