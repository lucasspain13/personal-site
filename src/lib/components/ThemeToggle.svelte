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
	class="meta lk min-w-[4.5rem] text-left no-underline"
	on:click={toggleTheme}
>
	{#if mounted}
		<span class="text-primary" aria-hidden="true">◐</span>
		{theme === 'light' ? 'dark' : 'light'}
	{/if}
</button>
