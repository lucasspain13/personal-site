<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animate';
	import portrait from '$lib/images/portrait-2.jpeg';

	// Career journey milestones
	const careerJourney = [
		{
			year: '2021-2022',
			title: 'Graduate Teaching Assistant',
			description:
				'Supported students at University of Iowa in understanding programming and logical concepts.'
		},
		{
			year: '2022-2024',
			title: 'ITDP',
			description:
				'Joined John Deere, developing full stack applications using React and Spring, hosted on AWS. Focused on site reliability engineering, CI/CD pipeline development, and cloud infrastructure management.'
		},
		{
			year: '2024-2025',
			title: 'Software Engineer',
			description:
				'Built a full-stack web application with a React frontend and a Spring Boot backend.'
		},
		{
			year: '2025-Present',
			title: 'Senior Software Engineer, AI Solutions Team',
			description: 'Building AI applications with LangGraph, LangChain, the OpenAI APIs, and RAG.'
		}
	];
</script>

<section id="about" class="page-section bg-base-100 py-20">
	<div class="container mx-auto px-4">
		<!-- Section header -->
		<div class="text-center mb-16" use:animateOnScroll>
			<h2 class="section-title text-primary">About Me</h2>
			<p class="section-subtitle">From full-stack engineering to AI</p>
		</div>

		<!-- Centered single-column layout -->
		<div class="max-w-4xl mx-auto">
			<!-- About content -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
				<!-- Left column: Image and quick facts -->
				<div class="about-image-container md:sticky md:top-24" use:animateOnScroll>
					<div class="relative mx-auto max-w-md">
						<img
							src={portrait}
							alt="Lucas Spain"
							loading="lazy"
							class="rounded-lg shadow-xl w-full object-cover aspect-[4/5]"
						/>

						<!-- Decorative elements (Optional, adjust if needed) -->
						<div
							class="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-secondary opacity-50 -z-10"
						></div>
						<div
							class="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-secondary opacity-50 -z-10"
						></div>
					</div>

					<!-- Quick facts below image -->
					<div class="bg-base-200 rounded-lg p-6 shadow-lg mt-8 max-w-md mx-auto">
						<h3 class="text-xl font-bold mb-4">Quick Facts</h3>
						<ul class="space-y-2 text-sm">
							<li class="flex items-center">
								<span class="text-primary mr-2 flex-shrink-0">
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
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
								</span>
								<span>Based in Bettendorf, IA</span>
							</li>
							<li class="flex items-center">
								<span class="text-primary mr-2 flex-shrink-0">
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
											d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										/>
									</svg>
								</span>
								<span>4+ Years Professional Experience</span>
							</li>
							<li class="flex items-center">
								<span class="text-primary mr-2 flex-shrink-0">
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
											d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
										/>
									</svg>
								</span>
								<span>Master of Computer Science</span>
							</li>
							<li class="flex items-center">
								<span class="text-primary mr-2 flex-shrink-0">
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
											d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</span>
								<span>Code Pair & Behavioral Interviewer</span>
							</li>
						</ul>
					</div>
				</div>

				<!-- Right column: Bio and career journey -->
				<div class="about-content" use:animateOnScroll>
					<div>
						<h3 class="text-2xl font-bold mb-4">My Story</h3>
						<div class="space-y-4 mb-12 text-base-content/80">
							<p>
								I'm a software engineer who moved from full-stack web development into AI. I've
								worked across the whole stack, from infrastructure and pipelines to the interfaces
								people use.
							</p>
							<p>
								I started at John Deere in the Information Technology Development Program (ITDP),
								where I worked on full-stack applications, CI/CD pipelines, and AWS infrastructure.
								That work in deployment and site reliability still informs how I work today.
							</p>
							<p>
								Now I focus on AI applications, building retrieval systems and agent workflows with
								<span class="font-semibold text-accent">LangChain</span>,
								<span class="font-semibold text-accent">LangGraph</span>, and the OpenAI APIs.
							</p>
						</div>

						<!-- Career journey -->
						<h3 class="text-2xl font-bold mb-8">Career Journey</h3>
						<div class="relative border-l-2 border-primary/30 ml-4 space-y-12 py-4">
							{#each careerJourney as milestone}
								<div class="milestone relative pl-10">
									<!-- Timeline Dot -->
									<div
										class="absolute -left-[calc(0.5rem+1px)] top-1 w-4 h-4 bg-primary rounded-full border-2 border-base-100 ring-4 ring-primary/10"
									></div>

									<!-- Content -->
									<div class="ml-4">
										<span class="badge badge-outline badge-primary mb-1">{milestone.year}</span>
										<h4 class="text-lg font-semibold text-primary">{milestone.title}</h4>
										<p class="mt-1 text-sm text-base-content/80">{milestone.description}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
