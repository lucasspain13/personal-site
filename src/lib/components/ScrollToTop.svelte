<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let showButton = false;
	let scrollY: number;

	// Show button when user scrolls down 300px
	function handleScroll() {
		showButton = scrollY > 300;
	}

	// Scroll to top with smooth animation
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	onMount(() => {
		// Add scroll event listener
		window.addEventListener('scroll', () => {
			scrollY = window.scrollY;
			handleScroll();
		});

		return () => {
			// Clean up event listener
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

{#if showButton}
	<button
		on:click={scrollToTop}
		class="fixed bottom-6 right-6 z-50 btn btn-circle btn-primary shadow-lg hover:scale-110 transition-transform duration-300"
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
			class="w-6 h-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
		</svg>
	</button>
{/if}

<style>
	button {
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(0, 119, 182, 0.7);
		}
		70% {
			box-shadow: 0 0 0 10px rgba(0, 119, 182, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(0, 119, 182, 0);
		}
	}
</style>
