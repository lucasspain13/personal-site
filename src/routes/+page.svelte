<script>
	import portrait from '$lib/images/portrait.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="banner bg-neutral" />
<section>
	<div class="hero">
		<div class="hero-content flex-col lg:flex-row">
			<picture class="pr-56"
				><img
					src={portrait}
					class="max-w-lg rounded-lg shadow-2xl mask mask-hexagon-2 bg-warning"
					alt="Portrait"
				/></picture
			>
			<div>
				<h1 class="text-5xl font-bold text-secondary">Lucas Spain</h1>
				<h3 class="text-xl font-bold pb-6 text-secondary">Software Engineer</h3>
				<p class="text-accent">
					Specializing in web development, application development, machine learning operations, and
					infrastructure operations.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		margin-top: 6rem;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.banner {
		position: absolute;
		top: 16rem;
		left: 0;
		min-width: 95vw;
		height: 20rem;
		padding: 10px;
		z-index: -1;
		clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
	}
</style>
