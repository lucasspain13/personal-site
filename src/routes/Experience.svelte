<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animate';

	const experiences = [
		{
			title: 'Software Engineer, AI Solutions Team',
			company: 'John Deere',
			period: 'February 2025 – Present',
			location: 'Moline, IL',
			description:
				'Building AI applications: coding agents, data-processing graphs, and deployed models, with a focus on scalable, efficient solutions across AI/ML frameworks and cloud services.',
			achievements: [
				'Developed applications integrating AI agents to assist with coding tasks.',
				'Built complex LangGraph graphs for data processing and analysis.',
				'Integrated OpenAI APIs and RAG techniques for better retrieval and responses.',
				'Used embeddings and OpenSearch for efficient document retrieval.',
				'Worked with specialized models, including Whisper for speech recognition.',
				'Built frontend interfaces, managing data streams from React applications.',
				'Used PostgreSQL for checkpointing and AWS for secrets, Lambda, and logging.'
			],
			technologies: [
				'LangChain',
				'LangGraph',
				'LangServe',
				'OpenAI API',
				'RAG',
				'OpenSearch',
				'Whisper',
				'React',
				'PostgreSQL',
				'Docker',
				'AWS Lambda'
			]
		},
		{
			title: 'Information Technology Development Program (ITDP)',
			company: 'John Deere',
			period: 'June 2022 – February 2025',
			location: 'Moline, IL',
			description:
				'Developed full-stack applications, managed cloud infrastructure, and owned site reliability — delivering features through secure coding, CI/CD, and infrastructure work.',
			achievements: [
				'Kept applications reliable through quality checks and infrastructure tuning (SRE).',
				'Designed CI/CD pipelines using GitHub Actions and AWS.',
				'Maintained zero exploitable application vulnerabilities through secure coding.',
				'Shipped both frontend and backend features end to end.',
				'Maintained scalable, cost-aware AWS infrastructure.'
			],
			technologies: [
				'React',
				'Spring (Java)',
				'JavaScript',
				'TypeScript',
				'Python',
				'AWS',
				'GitHub Actions',
				'Docker',
				'Terraform',
				'Playwright'
			]
		},
		{
			title: 'Graduate Teaching Assistant',
			company: 'University of Iowa, Department of Computer Science',
			period: 'August 2021 – May 2022',
			location: 'Iowa City, IA',
			description:
				'Supported undergraduates in programming and logic by leading lab sections and giving feedback on their work.',
			achievements: [
				'Led lab sections to help students grasp programming and logical concepts.',
				'Reviewed assignments and projects to give feedback that supported student growth.'
			],
			technologies: ['Python']
		}
	];
</script>

<section id="experience" class="page-section bg-base-200 py-20">
	<div class="container mx-auto px-4">
		<div class="mb-16 text-center" use:animateOnScroll>
			<h2 class="section-title text-primary">Experience</h2>
			<p class="section-subtitle">My professional journey so far</p>
		</div>

		<div class="mx-auto max-w-3xl">
			<div class="relative ml-4 space-y-12 border-l-2 border-primary/30 py-4">
				{#each experiences as experience}
					<div class="relative pl-10" use:animateOnScroll>
						<div
							class="absolute -left-[calc(0.5rem+1px)] top-1 h-4 w-4 rounded-full border-2 border-base-200 bg-primary ring-4 ring-primary/10"
						></div>

						<div class="rounded-lg bg-base-100 p-6 shadow-md transition-shadow hover:shadow-lg">
							<div class="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
								<div>
									<h3 class="text-xl font-bold text-primary">{experience.title}</h3>
									<p class="text-base-content/90">{experience.company}</p>
								</div>
								<div class="flex flex-shrink-0 flex-wrap gap-2 text-sm sm:justify-end">
									<span class="badge badge-secondary">{experience.period}</span>
									<span class="badge badge-outline">{experience.location}</span>
								</div>
							</div>

							<p class="mb-5 text-sm text-base-content/80">{experience.description}</p>

							<h4 class="mb-2 text-sm font-semibold">Highlights</h4>
							<ul class="mb-5 list-inside list-disc space-y-1 text-sm text-base-content/80">
								{#each experience.achievements as achievement}
									<li>{achievement}</li>
								{/each}
							</ul>

							<div class="flex flex-wrap gap-2">
								{#each experience.technologies as tech}
									<span class="badge badge-accent badge-outline text-xs">{tech}</span>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="mt-16 text-center" use:animateOnScroll>
			<div class="alert alert-info mx-auto max-w-md">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span
					>My full resume is in the works — feel free to reach out directly in the meantime.</span
				>
			</div>
		</div>
	</div>
</section>
