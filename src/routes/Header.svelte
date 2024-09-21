<script>
	import logo from '$lib/images/header-logo.png';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { clickAway } from '../actions';
	let isHovered = false;
	let isClicked = false;
	let visible = false;
	$: isOpen = isClicked || isHovered;

	const links = [
		{ href: '/', name: 'About' },
		{ href: '/', name: 'Projects' },
		{ href: '/', name: 'Skills' }
	];

	onMount(() => {
		visible = true;
	});
</script>

{#if visible}
	<div class="sticky top-0 z-50">
		<div class="navbar bg-base-100 pt-6" transition:fly={{ y: -200, duration: 2000 }}>
			<div class="flex-1">
				<a class="font-poppins text-xl p-2 max-w-56" href="/"
					><picture><img src={logo} alt="Logo" /></picture></a
				>
			</div>
			<div class="flex-none gap-2">
				<div class="form-control">
					<input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
				</div>
				<div class="divider divider-horizontal" />
				<div tabindex="0" role="button" class="btn btn-primary">
					<p class="text-sm font-medium p-1">Contact Me</p>
				</div>
				<div
					class="dropdown dropdown-hover dropdown-end"
					role="menu"
					tabindex="0"
					on:mouseenter={() => (isHovered = true)}
					on:mouseleave={() => (isHovered = false)}
					on:mousedown={() => (isClicked = true)}
					use:clickAway={() => (isClicked = false)}
				>
					<div tabindex="0" role="button" class="btn btn-ghost">
						<p class="text-sm font-light">Jump to Segment</p>
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
					<ul
						class="flex items-stretch dropdown-content menu bg-base-100 rounded-box z-[1] w-full shadow"
					>
						{#each links as link}
							<li class="ml-auto">
								<a href={link.href}>{link.name}</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
{/if}
