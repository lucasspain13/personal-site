<script>
	import { clickAway } from '$lib/actions/clickAway';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let isOpen = false;

	const links = [
		{ href: '#about', name: 'About' },
		{ href: '#skills', name: 'Skills' },
		{ href: '#projects', name: 'Projects' },
		{ href: '#experience', name: 'Experience' },
		{ href: '#contact', name: 'Contact' }
	];

	function closeMenu() {
		isOpen = false;
	}
</script>

<header class="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100">
	<nav class="wrap flex h-14 items-center justify-between gap-4">
		<a href="#hero" class="font-display text-xl font-semibold italic leading-none"
			>Lucas&nbsp;Spain</a
		>

		<div class="hidden items-center gap-6 md:flex">
			{#each links as link, i}
				<a href={link.href} class="meta lk no-underline">
					<span class="text-primary" aria-hidden="true">{i + 1}.</span>
					{link.name}
				</a>
			{/each}
		</div>

		<div class="flex items-center gap-4">
			<ThemeToggle />

			<div class="relative md:hidden" use:clickAway={closeMenu}>
				<button
					type="button"
					class="meta border border-base-content px-3 py-2"
					aria-label="Toggle navigation menu"
					aria-expanded={isOpen}
					on:click={() => (isOpen = !isOpen)}
				>
					Menu
				</button>
				{#if isOpen}
					<ul
						role="list"
						class="absolute right-0 top-full z-[1] mt-2 w-56 border border-base-content bg-base-100 shadow-[6px_6px_0_0] shadow-base-content/20"
					>
						{#each links as link, i}
							<li class="border-b border-base-300 last:border-b-0">
								<a
									href={link.href}
									class="meta block px-4 py-3 hover:bg-base-200"
									on:click={closeMenu}
								>
									<span class="text-primary" aria-hidden="true">{i + 1}.</span>
									{link.name}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	</nav>
</header>
