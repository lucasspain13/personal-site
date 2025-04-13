<script lang="ts">
	import { animateOnScroll, staggerChildren } from '$lib/actions/animate';
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';

	// Define highlight categories
	const categories = [
		{
			title: 'Experience',
			items: [
				{
					title: 'Work Experience',
					value: '3+ Years',
					description: 'Full Stack & AI Development',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>`,
					color: 'bg-primary text-primary-content'
				},
				{
					title: 'Education',
					value: "Master's",
					description: 'Computer Science',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>`,
					color: 'bg-secondary text-secondary-content'
				},
				{
					title: 'Contributions',
					value: '60+',
					description: 'Personal GitHub Contributions',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" /></svg>`,
					color: 'bg-accent text-accent-content'
				}
			]
		},
		{
			title: 'AI Expertise',
			items: [
				{
					title: 'LangChain & LangGraph',
					value: 'Expert',
					description: 'Building AI-powered Applications',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487 18.549 4.5a1 1 0 0 1 1.053.9l.192 1.664a1 1 0 0 1-.765 1.067l-1.563.38a3.5 3.5 0 0 1-1.049.078l-.346-.114a2.001 2.001 0 0 0-1.862.516l-.312.317a2 2 0 0 1-1.618.586l-.393-.028a2 2 0 0 0-1.618.586l-.312.317a2 2 0 0 1-1.862.516l-.346-.114a3.5 3.5 0 0 1-1.049.078l-1.563-.38a1 1 0 0 1-.765-1.067l.192-1.664a1 1 0 0 1 1.053-.9l1.687-.013a3.5 3.5 0 0 1 1.049.078l.346.114a2 2 0 0 0 1.862-.516l.312-.317a2 2 0 0 1 1.618-.586l.393.028a2 2 0 0 0 1.618-.586l.312-.317a2 2 0 0 1 1.862-.516l.346.114a3.5 3.5 0 0 1 1.049-.078Z" /></svg>`,
					color: 'bg-accent-blue'
				},
				{
					title: 'RAG Systems',
					value: 'Advanced',
					description: 'Embeddings & OpenSearch',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>`,
					color: 'bg-primary-focus'
				},
				{
					title: 'OpenAI API',
					value: 'Specialist',
					description: 'Completions, Structured Outputs, Embeddings, Images',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" /></svg>`,
					color: 'bg-accent-yellow'
				}
			]
		},
		{
			title: 'Projects & Skills',
			items: [
				{
					title: 'Programming Languages',
					value: '9+',
					description: 'Python, Java, TypeScript, Ruby...',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" /></svg>`,
					color: 'bg-secondary-focus'
				},
				{
					title: 'CI/CD & DevOps',
					value: 'Expert',
					description: 'GitHub Actions, Docker, Terraform',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`,
					color: 'bg-neutral'
				},
				{
					title: 'Projects',
					value: '6+',
					description: 'Gatsby, GitHub Bot, Full Stack Web App',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" /></svg>`,
					color: 'bg-info text-info-content'
				}
			]
		}
	];

	let visible = false;

	onMount(() => {
		visible = true;
	});
</script>

<svelte:head>
	<title>Highlights | Lucas Spain - AI, Web Development, Agents, Computer Science, Iowa</title>
	<meta
		name="description"
		content="See the highlights and key achievements of Lucas Spain, including AI, web development, agents, and computer science. Based in Iowa, Quad Cities, Maquoketa, and Moline. Specialized in LangChain, LangGraph, and cloud infrastructure."
	/>
	<meta
		name="keywords"
		content="Highlights, Lucas Spain, AI, web development, agents, computer science, LangChain, LangGraph, Maquoketa, Iowa, Quad Cities, Moline, East Moline, Davenport, University of Iowa, John Deere, cloud infrastructure, achievements"
	/>
	<meta name="robots" content="index, follow" />
</svelte:head>

<section id="highlights" class="page-section bg-base-200 py-16">
	<div class="container mx-auto px-4">
		<!-- Section header -->
		<div class="text-center mb-12" use:animateOnScroll>
			<h2 class="section-title text-primary">Highlights & Expertise</h2>
			<p class="section-subtitle">Key achievements and specialized skills</p>
		</div>

		<!-- Categories -->
		{#if visible}
			<div class="space-y-12">
				{#each categories as category, categoryIndex}
					<div class="category" in:fly={{ y: 50, duration: 800, delay: categoryIndex * 200 }}>
						<h3 class="text-2xl font-bold mb-6 text-center md:text-left">{category.title}</h3>

						<div
							class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
							use:staggerChildren={{ selector: '.stat-card', staggerTime: 150 }}
						>
							{#each category.items as item, itemIndex}
								<div class="stat-card card card-hover bg-base-100 shadow-md overflow-hidden">
									<div class="card-body p-6">
										<div class="flex items-start justify-between">
											<div>
												<h3 class="card-title text-lg mb-1">{item.title}</h3>
												<div class="stat-value text-3xl font-bold mb-2">{item.value}</div>
												<p class="text-sm opacity-70">{item.description}</p>
											</div>
											<div
												class={`stat-figure p-3 rounded-full ${item.color} transform transition-transform duration-300 hover:scale-110 hover:rotate-12`}
											>
												{@html item.icon}
											</div>
										</div>

										<!-- Progress indicator -->
										<div class="mt-4 h-1 w-full bg-base-300 rounded-full overflow-hidden">
											<div class="progress-bar h-full rounded-full" style="width: 85%;"></div>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.progress-bar {
		background: linear-gradient(90deg, var(--p) 0%, var(--s) 100%);
		animation: progress-animation 2s ease-in-out;
	}

	@keyframes progress-animation {
		0% {
			width: 0%;
		}
		100% {
			width: 85%;
		}
	}

	.stat-figure {
		transition: all 0.3s ease;
	}

	.stat-card:hover .stat-figure {
		transform: scale(1.1) rotate(12deg);
	}

	.stat-card {
		transition: all 0.3s ease;
	}

	.stat-card:hover {
		transform: translateY(-5px);
		box-shadow:
			0 10px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}
</style>
