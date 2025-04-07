<script lang="ts">
	import { animateOnScroll, staggerChildren } from '$lib/actions/animate';
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';

	// Work experience data
	const experiences = [
		{
			title: 'AI Solutions Engineer',
			company: 'TechInnovate AI',
			period: '2023 - Present',
			location: 'San Francisco, CA',
			description:
				'Leading the development of AI-powered applications using LangChain, LangGraph, and vector databases. Building multi-agent systems and RAG implementations for enterprise clients.',
			achievements: [
				'Architected and implemented a multi-agent system that reduced document processing time by 75%',
				'Developed a RAG-based knowledge assistant that improved customer support response accuracy by 40%',
				'Led a team of 5 engineers in building AI-powered solutions for Fortune 500 clients',
				'Presented AI solutions at industry conferences and published technical articles on AI implementation'
			],
			technologies: [
				'LangChain',
				'LangGraph',
				'OpenAI',
				'Vector Databases',
				'Python',
				'TypeScript',
				'React'
			]
		},
		{
			title: 'Senior Full Stack Developer',
			company: 'WebSphere Solutions',
			period: '2021 - 2023',
			location: 'Austin, TX',
			description:
				'Designed and developed scalable web applications for enterprise clients. Led development teams and mentored junior developers.',
			achievements: [
				'Spearheaded the migration of a legacy system to a modern microservices architecture',
				'Implemented CI/CD pipelines that reduced deployment time by 60%',
				'Optimized database queries resulting in a 45% improvement in application performance',
				'Developed and maintained RESTful APIs serving over 1 million requests daily'
			],
			technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS']
		},
		{
			title: 'DevOps Engineer',
			company: 'CloudScale Systems',
			period: '2020 - 2021',
			location: 'Seattle, WA',
			description:
				'Managed cloud infrastructure and deployment pipelines. Implemented monitoring and alerting systems for production environments.',
			achievements: [
				'Automated infrastructure provisioning reducing setup time from days to hours',
				'Implemented monitoring solutions that improved system uptime by 15%',
				'Designed disaster recovery procedures that reduced recovery time by 70%',
				'Collaborated with development teams to optimize application performance in cloud environments'
			],
			technologies: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Prometheus', 'Grafana']
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
	let activeExperience = experiences[0];

	// Define experience type
	type Experience = (typeof experiences)[0];

	function setActiveExperience(experience: Experience) {
		activeExperience = experience;
	}

	onMount(() => {
		visible = true;
	});
</script>

<section id="experience" class="page-section bg-base-200 py-20">
	<div class="container mx-auto px-4">
		<!-- Section header -->
		<div class="text-center mb-16" use:animateOnScroll>
			<h2 class="section-title text-primary">Work Experience</h2>
			<p class="section-subtitle">My professional journey and career achievements</p>
		</div>

		<!-- Experience timeline -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
			<!-- Left column: Timeline -->
			<div class="timeline-container">
				<div class="bg-base-100 rounded-lg shadow-md p-6" use:animateOnScroll>
					<h3 class="text-xl font-bold mb-6">Career Timeline</h3>

					<div class="timeline relative pl-8 border-l-2 border-primary">
						{#each experiences as experience, i}
							<div
								class="timeline-item relative mb-12 cursor-pointer"
								class:active={activeExperience === experience}
								on:click={() => setActiveExperience(experience)}
								use:animateOnScroll
							>
								<!-- Timeline dot -->
								<div
									class="absolute -left-[25px] w-12 h-12 rounded-full bg-base-100 border-4 border-primary flex items-center justify-center transition-all duration-300 {activeExperience ===
									experience
										? 'scale-110'
										: ''}"
								>
									<span class="text-sm font-bold">{experience.period.split(' - ')[0]}</span>
								</div>

								<!-- Content -->
								<div
									class="ml-4 transition-all duration-300 {activeExperience === experience
										? 'opacity-100'
										: 'opacity-70'}"
								>
									<h4 class="text-lg font-bold">{experience.title}</h4>
									<p class="text-sm">{experience.company}</p>
									<p class="text-xs opacity-70">{experience.period}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Right column: Experience details -->
			<div class="experience-details col-span-2">
				{#if visible}
					<div class="bg-base-100 rounded-lg shadow-md p-8" in:fade={{ duration: 300 }}>
						<div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
							<div>
								<h3 class="text-2xl font-bold">{activeExperience.title}</h3>
								<p class="text-lg">{activeExperience.company}</p>
							</div>
							<div class="mt-2 md:mt-0">
								<div class="badge badge-primary">{activeExperience.period}</div>
								<div class="badge badge-outline ml-2">{activeExperience.location}</div>
							</div>
						</div>

						<p class="mb-8">{activeExperience.description}</p>

						<!-- Key achievements -->
						<div class="mb-8">
							<h4 class="text-lg font-semibold mb-4">Key Achievements</h4>
							<ul class="space-y-2">
								{#each activeExperience.achievements as achievement}
									<li class="flex items-start">
										<span class="text-primary mr-2 mt-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M5 13l4 4L19 7"
												/>
											</svg>
										</span>
										<span>{achievement}</span>
									</li>
								{/each}
							</ul>
						</div>

						<!-- Technologies used -->
						<div>
							<h4 class="text-lg font-semibold mb-4">Technologies Used</h4>
							<div class="flex flex-wrap gap-2">
								{#each activeExperience.technologies as tech}
									<div class="badge badge-secondary">{tech}</div>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Testimonials -->
		<div class="mt-20">
			<h3 class="text-2xl font-bold text-center mb-10">What People Say</h3>

			<div
				class="grid grid-cols-1 md:grid-cols-3 gap-8"
				use:staggerChildren={{ selector: '.testimonial-card', staggerTime: 200 }}
			>
				{#each testimonials as testimonial, i}
					<div class="testimonial-card card bg-base-100 shadow-xl">
						<div class="card-body">
							<div class="flex items-center mb-4">
								<div class="avatar mr-4">
									<div class="w-12 h-12 rounded-full">
										<img src={testimonial.avatar} alt={testimonial.author} />
									</div>
								</div>
								<div>
									<h4 class="font-bold">{testimonial.author}</h4>
									<p class="text-xs opacity-70">{testimonial.position}</p>
								</div>
							</div>

							<div class="relative">
								<svg
									class="absolute -top-4 -left-4 w-8 h-8 text-primary opacity-20"
									fill="currentColor"
									viewBox="0 0 32 32"
								>
									<path
										d="M10 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm12-14c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"
									></path>
								</svg>
								<p class="italic">{testimonial.text}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Resume download -->
		<div class="text-center mt-16" use:animateOnScroll>
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
		</div>
	</div>
</section>

<style>
	.timeline-item {
		transition: all 0.3s ease;
	}

	.timeline-item:hover {
		transform: translateX(5px);
	}

	.timeline-item.active {
		transform: translateX(5px);
	}

	.timeline::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: -8px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: var(--p);
	}

	.testimonial-card {
		transition: all 0.3s ease;
	}

	.testimonial-card:hover {
		transform: translateY(-5px);
	}
</style>
