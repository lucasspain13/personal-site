<script lang="ts">
	import { animateOnScroll, staggerChildren } from '$lib/actions/animate';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade, fly, scale } from 'svelte/transition';

	// Define project type interface
	interface Project {
		title: string;
		description: string;
		image: string;
		tags: string[];
		category: string;
		featured: boolean;
		type: 'personal-with-repo' | 'personal' | 'work';
		repoUrl?: string;
	}

	// Project data
	const projects: Project[] = [
		// Personal projects with repo links
		{
			title: 'Gatsby - Local Voice Assistant',
			description:
				'A fully local voice assistant using LangGraph and Ollama for inference. Integrated with a Whisper-based speech recognition engine using the Wyoming protocol for home automation.',
			image: 'https://placehold.co/600x400/3498db/ffffff?text=Gatsby',
			tags: ['LangGraph', 'Ollama', 'Qdrant', 'FastAPI', 'Docker'],
			category: 'AI',
			featured: true,
			type: 'personal-with-repo',
			repoUrl: 'https://github.com/lucasspain13/gatsby'
		},
		{
			title: 'Personal Website',
			description:
				'Look around! This is my personal website, built with SvelteKit and TailwindCSS. Enhanced with agentic coding through Roo Code, this site serves as a way to showcase my work and projects.',
			image: 'https://placehold.co/600x400/f1c40f/ffffff?text=Portfolio',
			tags: ['SvelteKit', 'TypeScript', 'TailwindCSS', 'Web Development', 'Agentic Coding'],
			category: 'Web Development',
			featured: true,
			type: 'personal-with-repo',
			repoUrl: 'https://github.com/lucasspain13/personal-site'
		},
		{
			title: 'Wedding Website',
			description:
				'A personalized wedding website to be used as a template for future events. Built with React and Express, this site includes E2E RSVP, guest, request, and gift management.',
			image: 'https://placehold.co/600x400/9b59b6/ffffff?text=React+App',
			tags: ['React', 'Express', 'SQL', 'SES', 'CSS'],
			category: 'Web Development',
			featured: true,
			type: 'personal-with-repo',
			repoUrl: 'https://github.com/lucasspain13/dealer-assistant'
		},
		{
			title: 'Scarf Pattern Generator',
			description:
				'A local application built before the age of generative AI, this app generates scarf patterns with images and printable instructions. Built completely in Python, this app supports generating symetric or asymetric patterns with up to 3 colors and adjustable ratios.',
			image: 'https://placehold.co/600x400/e74c3c/ffffff?text=Design+Algorithm',
			tags: ['Python', 'Tkinter', 'Algorithms'],
			category: 'Other',
			featured: false,
			type: 'personal'
		},
		{
			title: 'Wyoming Whisper with Multi-User Voice Recognition',
			description:
				'A reusable docker container forked from an existing transcriber for a local voice assistant. This project build upon the transcripton functionality by labeling user voices using embeddings stored in a local file.',
			image: 'https://placehold.co/600x400/1abc9c/ffffff?text=Speech+to+Text',
			tags: ['AI', 'STT', 'Machine Learning', 'Whisper', 'Embeddings', 'Python'],
			category: 'AI',
			featured: false,
			type: 'personal-with-repo',
			repoUrl: 'https://github.com/lucasspain13/wyoming-faster-whisper-recognition'
		},
		{
			title: 'Plex Uploader',
			description:
				'A simple web application to upload media files to a Plex server. Built with Express and React, this app allows users to upload files, add them to a queue to be AI enhanced locally, and added to a Plex library in a higher definition.',
			image: 'https://placehold.co/600x400/2ecc71/ffffff?text=Plex+Uploader',
			tags: ['Express', 'React', 'Queues', 'AI', 'APIs'],
			category: 'Web Development',
			featured: false,
			type: 'personal-with-repo',
			repoUrl: 'https://github.com/lucasspain13/plex-uploader'
		},
		// Work projects
		{
			title: 'CSRF Protection Implementation',
			description:
				'Implemented a global application design change to protect against an identified security flaw in a production application.',
			image: 'https://placehold.co/600x400/2ecc71/ffffff?text=Security+Project',
			tags: ['Security', 'CSRF', 'Java', 'Spring', 'JavaScript'],
			category: 'Security',
			featured: false,
			type: 'work'
		},
		{
			title: 'Fully Automated CI/CD Pipeline',
			description:
				'Independently developed and deployed a first-in-organization CI/CD pipeline that automatically deployed and completely tested new changes in each production. This reduced deployment time from 1 day to 20 minutes.',
			image: 'https://placehold.co/600x400/f39c12/ffffff?text=Server+Test',
			tags: ['AWS', 'CI/CD', 'GHA', 'Playwright', 'Webhooks'],
			category: 'DevOps',
			featured: true,
			type: 'work'
		},
		{
			title: 'GitHub Bot',
			description:
				'Developed a GitHub bot to automate issue management and pull request reviews. Integrated with GitHub Actions for CI/CD workflows. Hosted with AWS Lambda.',
			image: 'https://placehold.co/600x400/1abc9c/ffffff?text=GitHub+Bot',
			tags: ['GHA', 'GitHub', 'GitHub API', 'Terraform', 'Lambda', 'IAM'],
			category: 'DevOps',
			featured: true,
			type: 'work'
		},
		{
			title: 'Complete API',
			description:
				'Independently developed an internal API for AI usecases to specifically exclude chat history while encapsulating configuration and providing access to all tools and output structuring.',
			image: 'https://placehold.co/600x400/3498db/ffffff?text=AI+API',
			tags: ['Microservices', 'API', 'Gateway'],
			category: 'AI',
			featured: false,
			type: 'work'
		}
	];

	// Filter state
	let activeFilter = 'All';

	// Helper function to check if a project matches the specified filter
	function projectMatches(project: Project, filter: string): boolean {
		return filter === 'All' || project.category === filter;
	}

	// Base filtered projects (these don't change based on activeFilter)
	const personalProjects = projects.filter((project) => project.type !== 'work');
	const workProjects = projects.filter((project) => project.type === 'work');

	// Reactive sorted lists that explicitly depend on activeFilter
	$: sortedPersonalProjects = personalProjects
		.filter((p) => p)
		.sort((a, b) => {
			// Filter out undefined/null first
			const aMatches = projectMatches(a, activeFilter);
			const bMatches = projectMatches(b, activeFilter);

			if (aMatches && !bMatches) return -1;
			if (!aMatches && bMatches) return 1;
			return 0; // Keep original order if both match or both don't match
		});
	$: console.log(
		'Sorted Personal Projects:',
		sortedPersonalProjects.map(
			(p) => p.title + (projectMatches(p, activeFilter) ? ' (match)' : ' (no match)')
		) // Also use activeFilter here
	);

	$: sortedWorkProjects = workProjects
		.filter((p) => p)
		.sort((a, b) => {
			// Filter out undefined/null first
			const aMatches = projectMatches(a, activeFilter);
			const bMatches = projectMatches(b, activeFilter);

			if (aMatches && !bMatches) return -1;
			if (!aMatches && bMatches) return 1;
			return 0; // Keep original order if both match or both don't match
		});
	$: console.log(
		'Sorted Work Projects:',
		sortedWorkProjects.map(
			(p) => p.title + (projectMatches(p, activeFilter) ? ' (match)' : ' (no match)')
		) // Also use activeFilter here
	);

	// Set active filter
	function setFilter(filter: string) {
		activeFilter = filter;
	}

	// Available categories
	$: categories = ['All', ...new Set(projects.map((p) => p.category))];

	let visible = false;

	onMount(() => {
		visible = true;
	});
	let tabsEl: HTMLDivElement;

	$: if (tabsEl) {
		console.log(
			'Tabs width:',
			tabsEl.offsetWidth,
			'Parent width:',
			tabsEl.parentElement?.offsetWidth
		);
	}

	onMount(() => {
		if (tabsEl) {
			console.log(
				'Tabs width (onMount):',
				tabsEl.offsetWidth,
				'Parent width:',
				tabsEl.parentElement?.offsetWidth
			);
		}
		const handleResize = () => {
			if (tabsEl) {
				console.log(
					'Tabs width (resize):',
					tabsEl.offsetWidth,
					'Parent width:',
					tabsEl.parentElement?.offsetWidth
				);
			}
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<section id="projects" class="page-section bg-base-100 py-20 w-full">
	<div class="container mx-auto px-4">
		<!-- Section header -->
		<div class="text-center mb-16" use:animateOnScroll>
			<h2 class="section-title text-primary">Projects</h2>
			<p class="section-subtitle">Showcasing my work and technical expertise</p>
		</div>

		<!-- Filters -->
		<div class="filters mb-12">
			<div class="flex justify-center">
				<!-- Centered category filters -->
				<div class="category-filters mx-auto" use:animateOnScroll>
					<div class="tabs tabs-boxed gap-4 p-2 flex flex-wrap justify-center" bind:this={tabsEl}>
						{#each categories as category}
							<button
								class="tab {activeFilter === category ? 'tab-active' : ''}"
								on:click={() => setFilter(category)}
								data-category={category}
								data-testid="filter-{category}"
							>
								{category}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Projects grid -->
		{#if visible}
			<!-- Personal Projects Section -->
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				use:staggerChildren={{ selector: '.project-card', staggerTime: 150 }}
			>
				<!-- All Personal Projects (Matches first, then non-matches) -->
				{#each sortedPersonalProjects as project (project.title)}
					{@const isMatch = projectMatches(project, activeFilter)}
					<div
						class="project-card card group bg-base-100 shadow-xl overflow-hidden h-full flex flex-col transition-all duration-500"
						class:card-active={isMatch}
						class:card-hover={project.type === 'personal-with-repo' && isMatch}
						class:non-matching={!isMatch}
						animate:flip={{ duration: 600 }}
						in:fade={{ duration: 300 }}
					>
						<!-- Project image -->
						<figure class="relative">
							<img src={project.image} alt={project.title} class="w-full h-48 object-cover" />

							{#if project.featured}
								<div class="absolute top-2 right-2 badge badge-primary">Featured</div>
							{/if}

							{#if project.type === 'personal-with-repo'}
								<div
									class="absolute inset-0 bg-gradient-to-t from-base-300 to-transparent opacity-0 transition-opacity duration-300 flex items-end justify-center p-4"
									class:group-hover:opacity-100={isMatch}
								>
									<div class="flex gap-2">
										<a
											href={project.repoUrl}
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
							{/if}
						</figure>
						<!-- Project content -->
						<div class="card-body flex flex-col flex-grow py-6">
							<div class="mb-3">
								<div class="flex flex-col">
									<div class="flex items-center justify-between mb-1">
										<h3 class="card-title text-lg">{project.title}</h3>
										<div class="badge badge-secondary whitespace-nowrap ml-2">
											{project.category}
										</div>
									</div>
								</div>
							</div>

							<p class="text-sm opacity-80 line-clamp-3 flex-grow">{project.description}</p>

							<!-- Tags -->
							<div class="card-actions justify-start mt-auto pt-4 flex-wrap gap-2">
								{#each project.tags as tag}
									<div class="badge badge-outline">{tag}</div>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Work Projects Section -->
			{#if workProjects.length > 0}
				<div class="mt-20">
					<h3 class="text-2xl font-bold mb-6 text-center">Work Experience</h3>
					<div
						class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
						use:staggerChildren={{ selector: '.work-project-card', staggerTime: 100 }}
					>
						<!-- All Work Projects (Matches first, then non-matches) -->
						{#each sortedWorkProjects as project (project.title)}
							{@const isMatch = projectMatches(project, activeFilter)}
							<div
								class="work-project-card card bg-base-100 shadow-md overflow-hidden flex flex-col transition-all duration-500"
								class:card-active={isMatch}
								class:non-matching={!isMatch}
								animate:flip={{ duration: 600 }}
								in:fade={{ duration: 300 }}
							>
								<!-- Project image -->
								<figure class="relative">
									<img src={project.image} alt={project.title} class="w-full h-32 object-cover" />
									<div class="absolute top-2 right-2 badge badge-accent badge-sm">Work</div>
								</figure>
								<!-- Project content -->
								<div class="card-body p-2">
									<div class="mb-2">
										<div class="flex flex-col">
											<div class="flex items-center justify-between mb-1">
												<h3 class="card-title text-sm">{project.title}</h3>
											</div>
										</div>
									</div>

									{#if isMatch}
										<h4 class="text-xs font-semibold">Key Points</h4>
										<ul class="list-disc list-inside text-xs opacity-80">
											{#each project.description.split('. ').filter((s) => s) as sentence}
												<li>{sentence.trim()}</li>
											{/each}
										</ul>
									{:else}
										<p class="text-xs opacity-80 line-clamp-2">{project.description}</p>
									{/if}

									<!-- Tags - limited to 3 -->
									<div class="card-actions justify-start mt-1 flex-wrap gap-1">
										{#each project.tags.slice(0, 3) as tag}
											<div class="badge badge-outline badge-sm">{tag}</div>
										{/each}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/if}

		<!-- Call to action -->
		<div class="text-center mt-16" use:animateOnScroll>
			<p class="mb-6 opacity-80">Interested in seeing more of my work?</p>
			<div class="flex justify-center gap-4">
				<a
					href="https://github.com/lucasspain13"
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
			</div>
		</div>
	</div>
</section>

<style>
	.project-card {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease,
			filter 0.5s ease,
			opacity 0.5s ease,
			scale 0.5s ease;
		display: flex;
		flex-direction: column;
		will-change: transform, opacity, filter;
	}

	.project-card.card-active:hover {
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
		min-height: 6rem; /* Increased height for description area */
	}

	/* Adjust spacing for work project cards */
	.work-project-card .card-body {
		display: flex;
		flex-direction: column;
	}

	.work-project-card {
		transition:
			all 0.3s ease,
			filter 0.5s ease,
			opacity 0.5s ease,
			scale 0.5s ease;
		display: flex;
		flex-direction: column;
		will-change: transform, opacity, filter;
	}

	.card-active {
		z-index: 10; /* Ensure active cards appear above non-active ones */
	}

	/* Combined class for non-matching projects */
	.non-matching {
		filter: blur(4px);
		opacity: 0.4;
		transform: scale(0.95);
		pointer-events: none;
	}

	/* Tab styling */
	.tab-active {
		font-weight: bold;
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		min-height: 2.5rem;
	}
</style>
