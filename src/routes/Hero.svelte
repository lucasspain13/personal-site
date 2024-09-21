<script>
	import portrait from '$lib/images/portrait.png';
	import IntersectionObserver from 'svelte-intersection-observer';
	import { fly } from 'svelte/transition';
	let intersecting;
	let element;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#if intersecting}
	<div class:intersecting>
		<div class="banner bg-neutral" transition:fly={{ x: -700, duration: 2000 }} />
		<section>
			<div class="hero">
				<div class="hero-content flex-col lg:flex-row">
					<picture
						><img
							src={portrait}
							class="max-w-lg rounded-lg shadow-2xl mask mask-hexagon-2 bg-warning"
							alt="Portrait"
							transition:fly={{ x: -500, duration: 2000 }}
						/></picture
					>
					<div transition:fly={{ x: -1000, duration: 2000 }}>
						<h1 class="text-5xl font-bold text-secondary">Lucas Spain</h1>
						<h3 class="text-xl font-bold pb-6 text-secondary">Software Engineer</h3>
						<p class="text-accent">
							Specializing in web development, application development, machine learning operations,
							and infrastructure operations.
						</p>
					</div>
				</div>
			</div>
		</section>
	</div>
{/if}
<IntersectionObserver {element} bind:intersecting>
	<div bind:this={element} />
</IntersectionObserver>

<style>
	section {
		display: flex;
		flex-direction: column;
		margin-top: 4rem;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.banner {
		position: absolute;
		top: 14rem;
		left: 0;
		min-width: 95vw;
		height: 20rem;
		padding: 10px;
		z-index: -1;
		clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
	}
</style>
