<script lang="ts">
	import { animateOnScroll, staggerChildren } from '$lib/actions/animate';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	interface Project {
		title: string;
		description: string;
		tags: string[];
		category: string;
		featured: boolean;
		type: 'personal-with-repo' | 'personal' | 'work';
		repoUrl?: string;
		repoPrivate?: boolean;
		liveUrl?: string;
	}

	const projects: Project[] = [
		// Personal projects
		{
			title: 'Pride in Motion',
			description:
				'The official site for Pride in Motion, the Quad Cities LGBTQIA+ recreational sports league (~200 visitors/week). A full-stack app with event listings, schedules, standings, online registration, and a gated admin CMS, backed by Supabase and served from AWS S3 and CloudFront.',
			tags: ['React', 'TypeScript', 'Supabase', 'Mantine', 'AWS'],
			category: 'Web Development',
			featured: true,
			type: 'personal-with-repo',
			repoUrl: 'https://github.com/lucasspain13/pride-in-motion',
			repoPrivate: true,
			liveUrl: 'https://prideinmotion.com'
		},
		{
			title: 'Gatsby: Local Voice Assistant',
			description:
				'A fully local voice assistant using LangGraph and Ollama for inference, with a Whisper-based speech engine over the Wyoming protocol for home automation.',
			tags: ['LangGraph', 'Ollama', 'Qdrant', 'FastAPI', 'Docker'],
			category: 'AI',
			featured: true,
			type: 'personal-with-repo',
			repoUrl: 'https://github.com/lucasspain13/gatsby',
			repoPrivate: true
		},
		{
			title: 'Personal Website',
			description:
				'This site, built with SvelteKit and TailwindCSS. I used agentic coding tools to help put it together.',
			tags: ['SvelteKit', 'TypeScript', 'TailwindCSS', 'Agentic Coding'],
			category: 'Web Development',
			featured: true,
			type: 'personal-with-repo',
			repoUrl: 'https://github.com/lucasspain13/personal-site'
		},
		{
			title: 'Wedding Website',
			description:
				'A personalized wedding site designed to double as a template for future events. Built with React and Express, with end-to-end RSVP, guest, request, and gift management.',
			tags: ['React', 'Express', 'SQL', 'SES', 'CSS'],
			category: 'Web Development',
			featured: true,
			type: 'personal-with-repo',
			repoUrl: 'https://github.com/lucasspain13/dealer-assistant',
			repoPrivate: true
		},
		{
			title: 'Scarf Pattern Generator',
			description:
				'A Python desktop app, built before the generative-AI era, that produces scarf patterns with images and printable instructions. It supports symmetric or asymmetric patterns, up to three colors, with adjustable ratios.',
			tags: ['Python', 'Tkinter', 'Algorithms'],
			category: 'Other',
			featured: false,
			type: 'personal'
		},
		{
			title: 'Wyoming Whisper: Multi-User Voice Recognition',
			description:
				'A reusable Docker container forked from an existing transcriber for a local voice assistant. It adds speaker labeling by matching voices against embeddings stored locally.',
			tags: ['STT', 'Whisper', 'Embeddings', 'Python', 'Docker'],
			category: 'AI',
			featured: false,
			type: 'personal-with-repo',
			repoUrl: 'https://github.com/lucasspain13/wyoming-faster-whisper-recognition'
		},
		{
			title: 'Plex Uploader',
			description:
				'A web app for uploading media to a Plex server. Built with Express and React, it queues files for local AI upscaling before adding them to a Plex library in higher definition.',
			tags: ['Express', 'React', 'Queues', 'AI', 'APIs'],
			category: 'Web Development',
			featured: false,
			type: 'personal-with-repo',
			repoUrl: 'https://github.com/lucasspain13/plex-uploader',
			repoPrivate: true
		},
		// Work projects
		{
			title: 'Joe, the AI Avatar',
			description:
				'An AI avatar kiosk that pairs a HeyGen avatar with a live salesperson over WebRTC and A2A for a resilient customer experience. Added MCP app integration for rich UIs in AI chat, built the chat voice and audio pipeline, and modernized the enterprise site to React 18 with React Testing Library.',
			tags: ['HeyGen', 'WebRTC', 'A2A', 'MCP', 'React 18', 'RTL'],
			category: 'AI',
			featured: true,
			type: 'work'
		},
		{
			title: 'Dealer Assistant',
			description:
				'An AI chatbot that helps John Deere dealers find answers fast, using retrieval over dealer-facing content to ground its responses.',
			tags: ['AI Chatbot', 'RAG', 'LLM'],
			category: 'AI',
			featured: true,
			type: 'work'
		},
		{
			title: 'MCP App Integration',
			description:
				'Integrated Model Context Protocol (MCP) apps into AI chat so tools can render rich, interactive UIs inline instead of plain text responses.',
			tags: ['MCP', 'AI Chat', 'Rich UIs'],
			category: 'AI',
			featured: true,
			type: 'work'
		},
		{
			title: 'CSRF Protection',
			description:
				'Designed and rolled out an application-wide change to close an identified security flaw in a production system.',
			tags: ['Security', 'CSRF', 'Java', 'Spring', 'JavaScript'],
			category: 'Security',
			featured: false,
			type: 'work'
		},
		{
			title: 'Automated CI/CD Pipeline',
			description:
				'Independently built and deployed a first-in-org CI/CD pipeline that fully tested and deployed changes to production, cutting deployment time from a day to 20 minutes.',
			tags: ['AWS', 'CI/CD', 'GitHub Actions', 'Playwright', 'Webhooks'],
			category: 'DevOps',
			featured: true,
			type: 'work'
		},
		{
			title: 'Francois, the GitHub Bot',
			description:
				'Francois, a GitHub bot that automates issue triage and pull-request reviews, wired into GitHub Actions and hosted on AWS Lambda.',
			tags: ['GitHub API', 'GitHub Actions', 'Terraform', 'Lambda', 'IAM'],
			category: 'DevOps',
			featured: true,
			type: 'work'
		},
		{
			title: 'Completions API',
			description:
				'Designed an internal API for AI use cases that deliberately excludes chat history while encapsulating configuration and exposing tools and structured output.',
			tags: ['Microservices', 'API', 'Gateway'],
			category: 'AI',
			featured: false,
			type: 'work'
		}
	];

	const categoryStyles: Record<string, { gradient: string; icon: string }> = {
		AI: {
			gradient: 'from-sky-500 to-indigo-600',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>`
		},
		'Web Development': {
			gradient: 'from-violet-500 to-fuchsia-600',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`
		},
		DevOps: {
			gradient: 'from-amber-500 to-orange-600',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>`
		},
		Security: {
			gradient: 'from-emerald-500 to-teal-600',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>`
		},
		Other: {
			gradient: 'from-rose-500 to-pink-600',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" /></svg>`
		}
	};

	const fallbackStyle = { gradient: 'from-slate-500 to-slate-700', icon: '' };

	function styleFor(category: string) {
		return categoryStyles[category] ?? fallbackStyle;
	}

	let activeFilter = 'All';

	function setFilter(filter: string) {
		activeFilter = filter;
	}

	$: categories = ['All', ...new Set(projects.map((p) => p.category))];
	$: personalProjects = projects.filter(
		(p) => p.type !== 'work' && (activeFilter === 'All' || p.category === activeFilter)
	);
	$: workProjects = projects.filter(
		(p) => p.type === 'work' && (activeFilter === 'All' || p.category === activeFilter)
	);
</script>

<section id="projects" class="page-section w-full bg-base-100 py-20">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center" use:animateOnScroll>
			<h2 class="section-title text-primary">Projects</h2>
			<p class="section-subtitle">A mix of personal projects and work</p>
		</div>

		<!-- Filters -->
		<div class="mb-12 flex justify-center" use:animateOnScroll>
			<div class="tabs-boxed tabs flex flex-wrap justify-center gap-1 p-2">
				{#each categories as category}
					<button
						class="tab {activeFilter === category ? 'tab-active' : ''}"
						on:click={() => setFilter(category)}
						data-testid="filter-{category}"
					>
						{category}
					</button>
				{/each}
			</div>
		</div>

		<!-- Personal projects -->
		<div
			class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
			use:staggerChildren={{ selector: '.project-card', staggerTime: 120 }}
		>
			{#each personalProjects as project (project.title)}
				{@const style = styleFor(project.category)}
				<article
					class="project-card card card-hover group flex h-full flex-col overflow-hidden bg-base-100 shadow-xl"
					animate:flip={{ duration: 400 }}
					in:fade={{ duration: 300 }}
				>
					<!-- Banner -->
					<div
						class="relative flex h-32 items-center justify-center bg-gradient-to-br {style.gradient} text-white/90"
					>
						{@html style.icon}
						{#if project.featured}
							<span class="badge badge-sm absolute right-2 top-2 border-none bg-white/90 text-black"
								>Featured</span
							>
						{/if}
					</div>

					<div class="card-body flex flex-grow flex-col p-6">
						<div class="mb-1 flex items-start justify-between gap-2">
							<h3 class="card-title text-lg">{project.title}</h3>
							<span class="badge badge-secondary badge-sm whitespace-nowrap"
								>{project.category}</span
							>
						</div>
						<p class="flex-grow text-sm opacity-80">{project.description}</p>

						<div class="mt-4 flex flex-wrap gap-2 pt-2">
							{#each project.tags as tag}
								<span class="badge badge-outline badge-sm">{tag}</span>
							{/each}
						</div>

						{#if project.liveUrl || (project.repoUrl && !project.repoPrivate)}
							<div class="mt-4 flex flex-wrap gap-2">
								{#if project.liveUrl}
									<a
										href={project.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="btn btn-primary btn-sm"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path d="M15 3h6v6" />
											<path d="M10 14 21 3" />
											<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
										</svg>
										Visit Site
									</a>
								{/if}
								{#if project.repoUrl && !project.repoPrivate}
									<a
										href={project.repoUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="btn btn-outline btn-sm"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="currentColor"
										>
											<path
												d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
											/>
										</svg>
										View Code
									</a>
								{/if}
							</div>
						{/if}
					</div>
				</article>
			{/each}
		</div>

		<!-- Work projects -->
		{#if workProjects.length > 0}
			<div class="mt-20">
				<h3 class="mb-6 text-center text-2xl font-bold">From My Day Job</h3>
				<div
					class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
					use:staggerChildren={{ selector: '.work-card', staggerTime: 100 }}
				>
					{#each workProjects as project (project.title)}
						{@const style = styleFor(project.category)}
						<article
							class="work-card card overflow-hidden bg-base-100 shadow-md"
							animate:flip={{ duration: 400 }}
							in:fade={{ duration: 300 }}
						>
							<div class="h-1.5 bg-gradient-to-r {style.gradient}"></div>
							<div class="card-body p-5">
								<div class="mb-1 flex items-center justify-between gap-2">
									<h4 class="card-title text-base">{project.title}</h4>
									<span class="badge badge-accent badge-sm">Work</span>
								</div>
								<p class="text-sm opacity-80">{project.description}</p>
								<div class="mt-3 flex flex-wrap gap-1.5">
									{#each project.tags.slice(0, 3) as tag}
										<span class="badge badge-outline badge-sm">{tag}</span>
									{/each}
								</div>
							</div>
						</article>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Call to action -->
		<div class="mt-16 text-center" use:animateOnScroll>
			<p class="mb-6 opacity-80">Want to see more?</p>
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
				>
					<path
						d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
					/>
				</svg>
				GitHub Profile
			</a>
		</div>
	</div>
</section>

<style>
	.tab-active {
		font-weight: 700;
	}
</style>
