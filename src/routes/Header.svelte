<script>
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import logo from '$lib/images/header-logo.png';
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { clickAway } from '../actions';
	let isHovered = false;
	let isClicked = false;
	let visible = false;
	$: isOpen = isClicked || isHovered;

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
</script>

{#if visible}
	<div class="sticky top-0 z-50 backdrop-blur-sm shadow-sm">
		<div class="navbar bg-base-100 bg-opacity-80 pt-4" transition:fly={{ y: -200, duration: 2000 }}>
			<div class="navbar-start">
				<!-- Navigation Links for Desktop -->
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
			</div>
			<div class="navbar-end flex items-center pr-8">
				<div class="flex ml-auto gap-x-4 items-center">
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
				</div>
				<!-- Mobile Menu -->
				<div
					class="dropdown dropdown-end md:hidden"
					role="menu"
					tabindex="0"
					on:mouseenter={() => (isHovered = true)}
					on:mouseleave={() => (isHovered = false)}
					on:mousedown={() => (isClicked = true)}
					use:clickAway={() => (isClicked = false)}
					in:fade={{ delay: 700, duration: 300 }}
				>
					<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
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
						{#if !isOpen}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m19.5 8.25-7.5 7.5-7.5-7.5"
								/>
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m4.5 15.75 7.5-7.5 7.5 7.5"
								/>
							</svg>
						{/if}
					</div>
					<ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow-lg mt-2 p-2">
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
				</div>
			</div>
		</div>
	</div>
{/if}
