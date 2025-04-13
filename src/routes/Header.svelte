<script>
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import logo from '$lib/images/header-logo.png';
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { clickAway } from '../actions';
	let isClicked = false;
	let visible = false;
	$: isOpen = isClicked;

	const links = [
		{ href: '#about', name: 'About' },
		{ href: '#skills', name: 'Skills' },
		{ href: '#projects', name: 'Projects' },
		{ href: '#experience', name: 'Experience' },
		{ href: '#contact', name: 'Contact' }
	];

	onMount(() => {
		visible = true;
		console.log('Header mounted: layout debug active');
	});
	let menuEl = null;
</script>

{#if visible}
	<div class="sticky top-0 z-50 w-full backdrop-blur-sm shadow-sm">
		<div
			class="flex justify-between items-center bg-base-100 bg-opacity-80 pt-4 pb-3 w-full rounded-xl shadow-sm backdrop-blur-sm"
			transition:fly={{ y: -200, duration: 2000 }}
		>
			<!-- Left section: Desktop nav links -->
			<div class="hidden md:flex items-center gap-1">
				{#each links as link, i}
					<a
						href={link.href}
						class="btn btn-ghost btn-sm hover:bg-primary hover:text-white transition-colors duration-300"
						in:fade={{ delay: 100 * i, duration: 300 }}
					>
						{link.name}
					</a>
				{/each}
			</div>
			<!-- Right section: ThemeToggle, Contact, Hamburger -->
			<div
				class="flex flex-row flex-nowrap items-center gap-x-4 w-full md:w-auto justify-end pr-4 md:pr-8"
			>
				<div class="divider divider-horizontal hidden md:flex ml-2"></div>
				<div in:fade={{ delay: 500, duration: 300 }}>
					<ThemeToggle />
				</div>
				<a
					href="#contact"
					tabindex="0"
					role="button"
					class="btn btn-primary hover:scale-105 transition-transform duration-300"
					in:fade={{ delay: 600, duration: 300 }}
				>
					<p class="text-sm font-medium p-1">Contact Me</p>
				</a>
				<!-- Mobile Menu -->
				<div
					class="dropdown md:hidden"
					role="menu"
					tabindex="0"
					use:clickAway={() => {
						console.log('clickAway fired', { isClicked, event: window.event });
						isClicked = false;
					}}
					in:fade={{ delay: 700, duration: 300 }}
				>
					<div
						tabindex="0"
						role="button"
						class="btn btn-ghost btn-circle"
						on:mousedown={() => {
							console.log('hamburger mousedown', { isClicked, event: window.event });
							isClicked = !isClicked;
						}}
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
					</div>
					{#if isOpen}
						<ul
							class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow-lg mt-2 p-2 right-0"
							bind:this={menuEl}
						>
							{#each links as link}
								<li>
									<a
										href={link.href}
										class="hover:bg-primary hover:text-white transition-colors duration-300"
									>
										{link.name}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
