<script lang="ts">
	import { animateOnScroll, staggerChildren } from '$lib/actions/animate';
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';

	// Project data
	const projects = [
		{
			title: 'AI Knowledge Assistant',
			description:
				'A RAG-based knowledge assistant that leverages LangChain and vector databases to provide accurate answers from company documentation.',
			image: 'https://placehold.co/600x400/3498db/ffffff?text=AI+Assistant',
			tags: ['LangChain', 'OpenAI', 'Vector DB', 'RAG', 'React'],
			category: 'AI',
			featured: true,
			demoUrl: '#',
			codeUrl: '#'
		},
		{
			title: 'Multi-Agent Workflow System',
			description:
				'A LangGraph-powered system that orchestrates multiple AI agents to collaborate on complex tasks with human-in-the-loop capabilities.',
			image: 'https://placehold.co/600x400/9b59b6/ffffff?text=Multi-Agent+System',
			tags: ['LangGraph', 'Agents', 'Workflow', 'TypeScript', 'Node.js'],
			category: 'AI',
			featured: true,
			demoUrl: '#',
			codeUrl: '#'
		},
		{
			title: 'E-Commerce Platform',
			description:
				'A full-featured e-commerce platform with product management, cart functionality, payment processing, and order tracking.',
			image: 'https://placehold.co/600x400/e74c3c/ffffff?text=E-Commerce',
			tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
			category: 'Full Stack',
			featured: true,
			demoUrl: '#',
			codeUrl: '#'
		},
		{
			title: 'Real-time Chat Application',
			description:
				'A real-time messaging platform with features like typing indicators, read receipts, and file sharing capabilities.',
			image: 'https://placehold.co/600x400/2ecc71/ffffff?text=Chat+App',
			tags: ['WebSockets', 'React', 'Express', 'MongoDB', 'Socket.io'],
			category: 'Full Stack',
			featured: false,
			demoUrl: '#',
			codeUrl: '#'
		},
		{
			title: 'Document Analysis Tool',
			description:
				'An AI-powered tool that extracts insights and key information from legal and financial documents using NLP techniques.',
			image: 'https://placehold.co/600x400/f39c12/ffffff?text=Document+Analysis',
			tags: ['Python', 'NLP', 'OCR', 'FastAPI', 'Vue.js'],
			category: 'AI',
			featured: false,
			demoUrl: '#',
			codeUrl: '#'
		},
		{
			title: 'DevOps Dashboard',
			description:
				'A comprehensive dashboard for monitoring CI/CD pipelines, infrastructure health, and deployment status across multiple environments.',
			image: 'https://placehold.co/600x400/1abc9c/ffffff?text=DevOps+Dashboard',
			tags: ['AWS', 'Docker', 'Kubernetes', 'Grafana', 'React'],
			category: 'DevOps',
			featured: false,
			demoUrl: '#',
			codeUrl: '#'
		}
	];

	// Filter state
	let activeFilter = 'All';
	let searchQuery = '';

	// Filtered projects
	$: filteredProjects = projects.filter((project) => {
		// Filter by category
		const categoryMatch = activeFilter === 'All' || project.category === activeFilter;

		// Filter by search query
		const searchMatch =
			searchQuery === '' ||
			project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

		return categoryMatch && searchMatch;
	});

	// Available categories
	$: categories = ['All', ...new Set(projects.map((p) => p.category))];

	// Set active filter
	function setFilter(filter: string) {
		activeFilter = filter;
	}

	let visible = false;

	onMount(() => {
		visible = true;
	});
</script>

<section id="projects" class="page-section bg-base-100 py-20">
	<div class="container mx-auto px-4">
		<!-- Section header -->
		<div class="text-center mb-16" use:animateOnScroll>
			<h2 class="section-title text-primary">Projects</h2>
			<p class="section-subtitle">Showcasing my work and technical expertise</p>
		</div>

		<!-- Filters -->
		<div class="filters mb-12">
			<div class="flex flex-col md:flex-row justify-between items-center gap-6">
				<!-- Category filters -->
				<div class="category-filters" use:animateOnScroll>
					<div class="tabs tabs-boxed p-1 bg-base-200">
						{#each categories as category}
							<button
								class="tab {activeFilter === category ? 'tab-active' : ''}"
								on:click={() => setFilter(category)}
							>
								{category}
							</button>
						{/each}
					</div>
				</div>

				<!-- Search -->
				<div class="search-box" use:animateOnScroll>
					<div class="form-control">
						<div class="input-group">
							<input
								type="text"
								placeholder="Search projects..."
								class="input input-bordered"
								bind:value={searchQuery}
							/>
							<button class="btn btn-square">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Projects grid -->
		{#if visible}
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				use:staggerChildren={{ selector: '.project-card', staggerTime: 150 }}
			>
				{#each filteredProjects as project, i}
					<div class="project-card card card-hover bg-base-100 shadow-xl overflow-hidden">
						<!-- Project image -->
						<figure class="relative">
							<img src={project.image} alt={project.title} class="w-full h-48 object-cover" />

							{#if project.featured}
								<div class="absolute top-2 right-2 badge badge-primary">Featured</div>
							{/if}

							<div
								class="absolute inset-0 bg-gradient-to-t from-base-300 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4"
							>
								<div class="flex gap-2">
									<a
										href={project.demoUrl}
										class="btn btn-sm btn-primary"
										target="_blank"
										rel="noopener noreferrer"
									>
										Live Demo
									</a>
									<a
										href={project.codeUrl}
										class="btn btn-sm btn-outline"
										target="_blank"
										rel="noopener noreferrer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-4 w-4 mr-1"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
											/>
										</svg>
										Code
									</a>
								</div>
							</div>
						</figure>

						<!-- Project content -->
						<div class="card-body">
							<div class="flex justify-between items-start">
								<h3 class="card-title text-lg">{project.title}</h3>
								<div class="badge badge-secondary">{project.category}</div>
							</div>

							<p class="mt-2 text-sm opacity-80 line-clamp-3">{project.description}</p>

							<!-- Tags -->
							<div class="card-actions justify-start mt-4 flex-wrap">
								{#each project.tags as tag}
									<div class="badge badge-outline">{tag}</div>
								{/each}
							</div>
						</div>
					</div>
				{:else}
					<div class="col-span-full text-center py-12">
						<div class="text-2xl font-bold opacity-50">No projects found</div>
						<p class="mt-2">Try adjusting your filters or search query</p>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Call to action -->
		<div class="text-center mt-16" use:animateOnScroll>
			<p class="mb-6 opacity-80">Interested in seeing more of my work?</p>
			<div class="flex justify-center gap-4">
				<a
					href="https://github.com/yourusername"
					class="btn btn-primary"
					target="_blank"
					rel="noopener noreferrer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="mr-2"
					>
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>
					GitHub Profile
				</a>
				<a href="/portfolio" class="btn btn-outline"> View All Projects </a>
			</div>
		</div>
	</div>
</section>

<style>
	.project-card {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.project-card:hover {
		transform: translateY(-5px);
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
