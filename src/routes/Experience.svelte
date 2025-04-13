<script lang="ts">
	import { animateOnScroll, staggerChildren } from '$lib/actions/animate';
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';

	// Work experience data
	const experiences = [
		{
			title: 'Software Engineer, AI Solutions Team',
			company: 'John Deere',
			period: 'February 2025 – Present',
			location: 'Moline, IL',
			description:
				'Developed AI applications integrating AI agents for coding tasks, built complex data processing graphs, and deployed AI models. Focused on creating scalable and efficient solutions using various AI/ML frameworks and cloud services.',
			achievements: [
				'Developed applications integrating AI agents to assist in coding tasks.',
				'Built complex graphs using LangGraph for data processing and analysis.',
				'Integrated OpenAI APIs for enhanced application functionalities.',
				'Implemented RAG techniques for improved data retrieval and response generation.',
				'Utilized embeddings and OpenSearch for efficient document retrieval systems.',
				'Worked with specialized models, including Whisper for speech recognition.',
				'Designed and developed frontend interfaces, managing data streams from React applications.',
				'Utilized PostgreSQL for checkpoint functionalities.',
				'Managed AWS services for secrets management, Lambda functions, and logging.'
			],
			technologies: [
				'LangChain',
				'LangGraph',
				'LangServe',
				'OpenAI API',
				'RAG',
				'Embeddings',
				'OpenSearch',
				'Whisper',
				'React',
				'PostgreSQL',
				'Docker',
				'Docker Compose',
				'AWS Lambda',
				'AWS Secrets Manager'
			]
		},
		{
			title: 'ITDP', // Combined roles from resumes
			company: 'John Deere',
			period: 'June 2022 – February 2025', // Deduced end date from start of next role
			location: 'Moline, IL',
			description:
				'Developed full-stack applications, managed cloud infrastructure, and ensured site reliability. Focused on delivering value through secure coding practices, CI/CD pipeline development, and infrastructure optimization.',
			achievements: [
				'Ensured application uptime by implementing quality checks and optimizing infrastructure (SRE).',
				'Designed Continuous Integration/Continuous Deployment pipelines using GitHub Actions and AWS.',
				'Achieved zero exploitable application vulnerabilities through secure coding practices.',
				'Delivered value by designing and implementing frontend and backend features.',
				'Maintained AWS-hosted cloud infrastructure, ensuring scalability and reliability while managing costs.'
			],
			technologies: [
				'React',
				'Spring (Java)', // Mentioned in Resume 2 for ITDP
				'JavaScript',
				'TypeScript',
				'Python',
				'AWS',
				'GitHub Actions',
				'Docker',
				'Terraform',
				'IAM',
				'Playwright',
				'SQL' // Implied by SRE/Backend work
			]
		},
		{
			title: 'Graduate Teaching Assistant',
			company: 'University of Iowa Department of Computer Science',
			period: 'August 2021 – May 2022',
			location: 'Iowa City, IA',
			description:
				'Supported undergraduate students in learning programming and logical concepts through leading lab sections and providing feedback on assignments.',
			achievements: [
				'Assisted students in understanding programming and logical concepts by leading lab sections.',
				'Provided feedback by reviewing assignments and projects to facilitate student growth.'
			],
			technologies: ['Python'] // No specific technologies mentioned for this role
		}
	];

	// Testimonials
	const testimonials = [
		{
			text: 'An exceptional engineer who consistently delivers innovative solutions. Their expertise in AI technologies has been instrumental in our digital transformation journey.',
			author: 'Sarah Johnson',
			position: 'CTO, TechInnovate AI',
			avatar: 'https://placehold.co/100x100/3498db/ffffff?text=SJ'
		},
		{
			text: "One of the most talented developers I've worked with. Their ability to solve complex problems and mentor others makes them an invaluable team member.",
			author: 'Michael Chen',
			position: 'Engineering Director, WebSphere Solutions',
			avatar: 'https://placehold.co/100x100/e74c3c/ffffff?text=MC'
		},
		{
			text: 'Their deep understanding of both development and operations has helped us build more reliable and scalable systems. A true DevOps professional.',
			author: 'Alex Rodriguez',
			position: 'VP of Engineering, CloudScale Systems',
			avatar: 'https://placehold.co/100x100/2ecc71/ffffff?text=AR'
		}
	];

	let visible = false;

	// Define experience type
	type Experience = (typeof experiences)[0];

	onMount(() => {
		visible = true;
	});
</script>

<svelte:head>
	<title>Experience | Lucas Spain - Software Engineer, AI, Web Development, Iowa</title>
	<meta
		name="description"
		content="Review the professional experience of Lucas Spain, including roles in AI, web development, agents, and software engineering at John Deere and University of Iowa. Based in Iowa, Quad Cities, Maquoketa, and Moline."
	/>
	<meta
		name="keywords"
		content="Experience, Lucas Spain, software engineer, AI, web development, agents, Maquoketa, Iowa, Quad Cities, Moline, East Moline, Davenport, University of Iowa, computer science, John Deere, LangChain, LangGraph, prompt engineering"
	/>
	<meta name="robots" content="index, follow" />
</svelte:head>

<section id="experience" class="page-section bg-base-200 py-20">
	<div class="container mx-auto px-4">
		<!-- Section header -->
		<div class="text-center mb-16" use:animateOnScroll>
			<h2 class="section-title text-primary">Work Experience</h2>
			<p class="section-subtitle">My professional journey and career achievements</p>
		</div>

		<!-- Redesigned Vertical Experience Timeline -->
		<div class="max-w-3xl mx-auto">
			<div class="relative border-l-2 border-primary/30 ml-4 space-y-12 py-4">
				{#each experiences as experience, i}
					<div class="timeline-entry relative pl-10" use:animateOnScroll>
						<!-- Timeline Dot -->
						<div
							class="absolute -left-[calc(0.5rem+1px)] top-1 w-4 h-4 bg-primary rounded-full border-2 border-base-200 ring-4 ring-primary/10"
						></div>

						<!-- Content Card -->
						<div class="bg-base-100 rounded-lg shadow-md p-6 transition-shadow hover:shadow-lg">
							<!-- Header -->
							<div
								class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3"
							>
								<div>
									<h3 class="text-xl font-bold text-primary">{experience.title}</h3>
									<p class="text-md text-base-content/90">{experience.company}</p>
								</div>
								<div class="mt-2 sm:mt-0 text-sm sm:text-right space-x-2 flex-shrink-0">
									<span class="badge badge-secondary">{experience.period}</span>
									<span class="badge badge-outline">{experience.location}</span>
								</div>
							</div>

							<!-- Description as bullet points -->
							<div class="mb-5 text-base-content/80">
								<h4 class="text-md font-semibold mb-2">Key Responsibilities</h4>
								<ul class="list-disc list-inside space-y-1 text-sm">
									{#each experience.description.split('. ').filter((s) => s) as sentence}
										<li>{sentence.trim()}</li>
									{/each}
								</ul>
							</div>

							<!-- Key achievements -->
							<div class="mb-5">
								<h4 class="text-md font-semibold mb-2">Key Achievements</h4>
								<ul class="list-disc list-inside space-y-1 text-sm text-base-content/80">
									{#each experience.achievements as achievement}
										<li>{achievement}</li>
									{/each}
								</ul>
							</div>

							<!-- Technologies used -->
							<div>
								<h4 class="text-md font-semibold mb-2">Technologies Used</h4>
								<div class="flex flex-wrap gap-2">
									{#each experience.technologies as tech}
										<div class="badge badge-accent badge-outline text-xs">{tech}</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- TODO: Restore resume download when ready -->
		<!-- <div class="text-center mt-16" use:animateOnScroll>
			<a href="/resume.pdf" class="btn btn-primary btn-lg">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 mr-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
					/>
				</svg>
				Download Full Resume
			</a>
		</div> -->
		<div class="text-center mt-16" use:animateOnScroll>
			<div class="alert alert-warning max-w-md mx-auto">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<span
					>My resume is under construction right now. Don't hesitate to reach out to me directly
					with any questions!</span
				>
			</div>
		</div>
	</div>
</section>

<style>
	.testimonial-card {
		transition: all 0.3s ease;
	}

	.testimonial-card:hover {
		transform: translateY(-5px);
	}
</style>
