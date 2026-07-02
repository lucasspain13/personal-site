<script lang="ts">
	const year = new Date().getFullYear();

	const socialLinks = [
		{ name: 'GitHub', url: 'https://github.com/lucasspain13' },
		{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/lucas-spain-24189715a' },
		{ name: 'Email', url: 'mailto:lnsjds@gmail.com' }
	];
</script>

<footer class="border-t border-base-content">
	<div class="wrap flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
		<div>
			<p class="font-display text-lg font-medium">© {year} Lucas Spain</p>
			<p class="meta mt-2 max-w-md normal-case tracking-normal opacity-60">
				Made in Iowa. Set in Fraunces and IBM Plex Mono. Built with SvelteKit, Tailwind CSS, and
				daisyUI. No trackers, no cookies.
			</p>
		</div>

		<nav class="flex gap-6" aria-label="Social links">
			{#each socialLinks as link}
				<a href={link.url} target="_blank" rel="noopener noreferrer" class="meta lk">
					{link.name} <span aria-hidden="true">↗</span>
				</a>
			{/each}
		</nav>
	</div>
</footer>
