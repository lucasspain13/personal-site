<script lang="ts">
	import { onMount } from 'svelte';
	// Removed fly and quintOut imports as we'll use CSS transitions

	// Theme state
	let theme = 'light';
	let mounted = false;

	// Initialize theme on mount
	onMount(() => {
		// Check for saved theme preference or use system preference
		const savedTheme = localStorage.getItem('theme');

		if (savedTheme) {
			theme = savedTheme;
		} else {
			// Check system preference
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			theme = prefersDark ? 'dark' : 'light';
		}

		applyTheme(theme);
		mounted = true;
	});

	// Toggle between light and dark themes
	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		applyTheme(theme);
		localStorage.setItem('theme', theme);
	}

	// Apply theme to HTML element
	function applyTheme(newTheme: string) {
		document.documentElement.setAttribute('data-theme', newTheme);
	}
</script>

<button
	aria-label="Toggle theme"
	class="btn btn-circle btn-ghost relative overflow-hidden"
	on:click={toggleTheme}
>
	{#if mounted}
		{#if theme === 'light'}
			<!-- Sun icon: Flies in from right, out to left -->
			<div class="icon-wrapper sun-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
					/>
				</svg>
			</div>
		{:else}
			<!-- Moon icon: Flies in from right, out to left -->
			<div class="icon-wrapper moon-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
					/>
				</svg>
			</div>
		{/if}
	{/if}
</button>

<style>
	.icon-wrapper {
		/* Center the icon within the button space */
		display: grid;
		place-items: center;
		/* Ensure wrappers occupy the same space */
		grid-area: 1 / 1 / 2 / 2;
		/* Add the transition */
		transition:
			opacity 0.4s ease-in-out,
			transform 0.4s ease-in-out;
		/* Start transparent and slightly rotated/scaled */
		opacity: 1; /* Start visible */
		transform: rotate(0deg) scale(1);
	}

	/* We might not need explicit enter/exit states if Svelte's DOM manipulation + transition works */
	/* Example of how you *could* define states if needed:
    .sun-icon.entering, .moon-icon.entering { opacity: 1; transform: rotate(0deg) scale(1); }
    .sun-icon.leaving, .moon-icon.leaving { opacity: 0; transform: rotate(-90deg) scale(0.8); }
    */

	button {
		/* Ensure the button itself acts as a grid container for the icons */
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		transition: transform 0.2s ease; /* Keep button hover/active effect */
	}

	button:hover {
		transform: scale(1.1);
	}

	button:active {
		transform: scale(0.95);
	}
</style>
