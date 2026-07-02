<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animate';
	import SectionHead from '$lib/components/SectionHead.svelte';
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

	let activeFilter = 'All';

	$: categories = ['All', ...new Set(projects.map((p) => p.category))];
	$: personalProjects = projects.filter(
		(p) => p.type !== 'work' && (activeFilter === 'All' || p.category === activeFilter)
	);
	$: workProjects = projects.filter(
		(p) => p.type === 'work' && (activeFilter === 'All' || p.category === activeFilter)
	);
</script>

<section id="projects" class="border-t border-base-300 bg-base-200 py-20 md:py-28">
	<div class="wrap">
		<div use:animateOnScroll>
			<SectionHead number="04" title="Project index" />
		</div>

		<nav class="mb-10 flex flex-wrap gap-x-6 gap-y-2" aria-label="Filter projects by category">
			{#each categories as category}
				<button
					class="meta transition-colors {activeFilter === category
						? 'text-primary underline decoration-2 underline-offset-4'
						: 'opacity-60 hover:opacity-100'}"
					on:click={() => (activeFilter = category)}
					data-testid="filter-{category}"
					aria-pressed={activeFilter === category}
				>
					{category}
				</button>
			{/each}
		</nav>

		<ol class="border-t border-base-content">
			{#each personalProjects as project, i (project.title)}
				<li
					class="project-card group grid gap-3 border-b border-base-300 py-7 md:grid-cols-12 md:gap-8"
					animate:flip={{ duration: 350 }}
					in:fade={{ duration: 250 }}
				>
					<span class="meta pt-1.5 text-primary md:col-span-1">
						p-{String(i + 1).padStart(2, '0')}
					</span>

					<div class="md:col-span-8">
						<h3
							class="font-display text-2xl font-medium transition-colors group-hover:text-primary"
						>
							{project.title}{#if project.featured}<span class="text-primary" aria-hidden="true"
									>&nbsp;*</span
								>{/if}
						</h3>
						<p class="mt-2 max-w-prose text-sm leading-relaxed opacity-75">
							{project.description}
						</p>
						<p class="meta mt-3 normal-case tracking-normal opacity-60">
							{project.tags.join(' · ')}
						</p>
					</div>

					<div class="flex gap-6 md:col-span-3 md:flex-col md:items-end md:gap-2">
						<span class="meta opacity-60">{project.category}</span>
						{#if project.liveUrl}
							<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" class="meta lk">
								visit site ↗
							</a>
						{/if}
						{#if project.repoUrl && !project.repoPrivate}
							<a href={project.repoUrl} target="_blank" rel="noopener noreferrer" class="meta lk">
								view code ↗
							</a>
						{/if}
					</div>
				</li>
			{/each}
		</ol>

		<p class="meta mt-4 opacity-60"><span class="text-primary">*</span> a personal favorite</p>

		{#if workProjects.length > 0}
			<div class="mt-20">
				<h3 class="meta mb-6 border-t border-base-content pt-4">From My Day Job</h3>
				<ol class="grid md:grid-cols-2 md:gap-x-16">
					{#each workProjects as project, i (project.title)}
						<li
							class="work-card border-b border-base-300 py-6"
							animate:flip={{ duration: 350 }}
							in:fade={{ duration: 250 }}
						>
							<div class="flex items-baseline gap-4">
								<span class="meta text-primary">w-{String(i + 1).padStart(2, '0')}</span>
								<div>
									<h4 class="font-display text-xl font-medium">{project.title}</h4>
									<p class="mt-1.5 text-sm leading-relaxed opacity-75">{project.description}</p>
									<p class="meta mt-2 normal-case tracking-normal opacity-60">
										{project.tags.join(' · ')}
									</p>
								</div>
							</div>
						</li>
					{/each}
				</ol>
			</div>
		{/if}

		<p class="mt-14" use:animateOnScroll>
			<a
				href="https://github.com/lucasspain13"
				target="_blank"
				rel="noopener noreferrer"
				class="meta lk"
			>
				More on GitHub ↗
			</a>
		</p>
	</div>
</section>
