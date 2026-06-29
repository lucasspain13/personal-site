<script lang="ts">
	import { onMount } from 'svelte';

	let theme = 'light';
	let mounted = false;

	onMount(() => {
		// The pre-paint script in app.html already set data-theme; mirror it here.
		theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
		mounted = true;
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<button
	aria-label="Toggle theme"
	class="btn btn-circle btn-ghost relative overflow-hidden"
	on:click={toggleTheme}
>
	{#if mounted}
		{#if theme === 'light'}
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
		display: grid;
		place-items: center;
		grid-area: 1 / 1 / 2 / 2;
		transition:
			opacity 0.4s ease-in-out,
			transform 0.4s ease-in-out;
	}

	button {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		transition: transform 0.2s ease;
	}

	button:hover {
		transform: scale(1.1);
	}

	button:active {
		transform: scale(0.95);
	}
</style>
