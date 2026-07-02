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
		class="meta fixed bottom-5 right-5 z-50 border border-base-content bg-base-100 px-3 py-2 transition-colors hover:bg-base-content hover:text-base-100"
		aria-label="Scroll to top"
		in:fly={{ y: 12, duration: 250 }}
		out:fade={{ duration: 150 }}
	>
		↑ top
	</button>
{/if}
