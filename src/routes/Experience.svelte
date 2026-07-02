<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animate';
	import SectionHead from '$lib/components/SectionHead.svelte';

	const experiences = [
		{
			title: 'Senior Software Engineer, AI Solutions Team',
			company: 'John Deere',
			period: '2025–present',
			location: 'Moline, IL',
			description:
				'Building AI applications: coding agents, data-processing graphs, and deployed models across AI/ML frameworks and cloud services.',
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
			title: 'Software Engineer',
			company: 'John Deere',
			period: '2024–2025',
			location: 'Moline, IL',
			description:
				'Built a full-stack web application with a React frontend and a Spring Boot backend.',
			achievements: [
				'Built React frontend features backed by a Spring Boot REST API.',
				'Delivered full-stack features end to end, from UI to data layer.',
				'Collaborated on a shared codebase using code review and CI/CD.'
			],
			technologies: ['React', 'Spring Boot', 'Java', 'TypeScript', 'JavaScript', 'REST APIs']
		},
		{
			title: 'Information Technology Development Program (ITDP)',
			company: 'John Deere',
			period: '2022–2024',
			location: 'Moline, IL',
			description:
				'Developed full-stack applications, managed cloud infrastructure, and owned site reliability, delivering features through secure coding, CI/CD, and infrastructure work.',
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
			period: '2021–2022',
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

<section id="experience" class="py-20 md:py-28">
	<div class="wrap">
		<div use:animateOnScroll>
			<SectionHead number="05" title="Experience" note="Where I've worked" />
		</div>

		<ol>
			{#each experiences as experience}
				<li
					class="grid gap-4 border-b border-base-300 py-10 first:pt-0 lg:grid-cols-12 lg:gap-8"
					use:animateOnScroll
				>
					<div class="lg:col-span-3">
						<p class="meta text-primary">{experience.period}</p>
						<p class="meta mt-1 opacity-60">{experience.location}</p>
					</div>

					<div class="lg:col-span-9">
						<h3 class="font-display text-2xl font-medium md:text-3xl">{experience.title}</h3>
						<p class="meta mt-1 opacity-60">{experience.company}</p>

						<p class="mt-4 max-w-prose text-sm leading-relaxed opacity-90">
							{experience.description}
						</p>

						<ul class="mt-4 max-w-prose space-y-1.5 text-sm leading-relaxed opacity-75">
							{#each experience.achievements as achievement}
								<li class="flex gap-3">
									<span class="text-primary" aria-hidden="true">–</span>
									<span>{achievement}</span>
								</li>
							{/each}
						</ul>

						<p class="meta mt-5 normal-case tracking-normal opacity-60">
							stack: {experience.technologies.join(' · ')}
						</p>
					</div>
				</li>
			{/each}
		</ol>

		<p class="mt-12" use:animateOnScroll>
			<a href="/Lucas_Spain_Resume.pdf" download="Lucas_Spain_Resume.pdf" class="meta lk">
				⤓ Download the résumé (PDF)
			</a>
		</p>
	</div>
</section>
