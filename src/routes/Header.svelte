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

<header class="sticky top-0 z-50 w-full border-b border-base-300/60 bg-base-100/80 backdrop-blur">
	<nav class="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
		<a href="#hero" class="text-lg font-bold tracking-tight text-primary">Lucas&nbsp;Spain</a>

		<div class="hidden items-center gap-1 md:flex">
			{#each links as link}
				<a
					href={link.href}
					class="btn btn-ghost btn-sm font-medium hover:bg-primary hover:text-primary-content"
				>
					{link.name}
				</a>
			{/each}
		</div>

		<div class="flex items-center gap-2">
			<ThemeToggle />

			<a href="#contact" class="btn btn-primary btn-sm hidden sm:inline-flex">Contact Me</a>

			<div class="dropdown dropdown-end md:hidden" use:clickAway={closeMenu}>
				<button
					type="button"
					class="btn btn-ghost btn-circle"
					aria-label="Toggle navigation menu"
					aria-expanded={isOpen}
					on:click={() => (isOpen = !isOpen)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
				{#if isOpen}
					<ul class="menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg">
						{#each links as link}
							<li>
								<a href={link.href} on:click={closeMenu}>{link.name}</a>
							</li>
						{/each}
						<li><a href="#contact" on:click={closeMenu}>Contact Me</a></li>
					</ul>
				{/if}
			</div>
		</div>
	</nav>
</header>
