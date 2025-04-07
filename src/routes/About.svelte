<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animate';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	// Profile image
	import portrait from '$lib/images/portrait.png';

	// Career journey milestones
	const careerJourney = [
		{
			year: '2020',
			title: 'Operations Specialist',
			description:
				'Started career in IT operations, managing infrastructure and deployment pipelines.'
		},
		{
			year: '2021',
			title: 'Full Stack Developer',
			description:
				'Transitioned to full stack development, building web applications with modern frameworks.'
		},
		{
			year: '2022',
			title: 'Senior Developer',
			description:
				'Led development teams and architected scalable solutions for enterprise clients.'
		},
		{
			year: '2023',
			title: 'AI Solutions Engineer',
			description:
				'Specialized in AI-powered applications using LangChain, LangGraph, and vector databases.'
		}
	];

	let visible = false;

	onMount(() => {
		visible = true;
	});
</script>

<section id="about" class="page-section bg-base-100 py-20">
	<div class="container mx-auto px-4">
		<!-- Section header -->
		<div class="text-center mb-16" use:animateOnScroll>
			<h2 class="section-title text-primary">About Me</h2>
			<p class="section-subtitle">My journey from operations to AI solutions</p>
		</div>

		<!-- About content -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<!-- Left column: Image and quick facts -->
			<div class="about-image-container" use:animateOnScroll>
				<div class="relative mx-auto max-w-md">
					<img
						src={portrait}
						alt="Professional portrait"
						class="rounded-lg shadow-xl w-full object-cover"
					/>

					<!-- Decorative elements -->
					<div class="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary opacity-10"></div>
					<div
						class="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-secondary opacity-10"
					></div>

					<!-- Quick facts -->
					<div class="bg-base-200 rounded-lg p-6 shadow-lg mt-8">
						<h3 class="text-xl font-bold mb-4">Quick Facts</h3>
						<ul class="space-y-2">
							<li class="flex items-center">
								<span class="text-primary mr-2">
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
								<span>Based in San Francisco, CA</span>
							</li>
							<li class="flex items-center">
								<span class="text-primary mr-2">
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
								<span>3+ Years Professional Experience</span>
							</li>
							<li class="flex items-center">
								<span class="text-primary mr-2">
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
								<span>Masters in Software Engineering</span>
							</li>
							<li class="flex items-center">
								<span class="text-primary mr-2">
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
								<span>Fluent in 5+ Programming Languages</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Right column: Bio and career journey -->
			<div class="about-content">
				{#if visible}
					<div in:fly={{ y: 20, duration: 800 }}>
						<h3 class="text-2xl font-bold mb-4">My Story</h3>
						<div class="space-y-4 mb-8">
							<p>
								I'm a software engineer with a unique journey from operations to full-stack
								development to AI solutions. My diverse background gives me a holistic perspective
								on building robust, scalable applications.
							</p>
							<p>
								Starting in operations, I gained valuable insights into infrastructure, deployment,
								and system reliability. This foundation helped me transition into full-stack
								development, where I built web and mobile applications using modern frameworks and
								technologies.
							</p>
							<p>
								Today, I specialize in building AI-powered applications using <span
									class="text-accent-blue font-semibold">LangChain</span
								>,
								<span class="text-accent-blue font-semibold">LangGraph</span>, and other
								cutting-edge AI technologies. I'm passionate about creating intelligent systems that
								solve real-world problems.
							</p>
						</div>

						<!-- Career journey -->
						<h3 class="text-2xl font-bold mb-4">Career Journey</h3>
						<div class="career-timeline relative pl-8 border-l-2 border-primary">
							{#each careerJourney as milestone, i}
								<div
									class="milestone relative mb-8"
									in:fly={{ y: 20, duration: 500, delay: 300 + i * 200 }}
								>
									<!-- Timeline dot -->
									<div
										class="absolute -left-[25px] w-12 h-12 rounded-full bg-base-100 border-4 border-primary flex items-center justify-center"
									>
										<span class="text-sm font-bold">{milestone.year}</span>
									</div>

									<!-- Content -->
									<div class="ml-4">
										<h4 class="text-xl font-bold">{milestone.title}</h4>
										<p class="mt-2 opacity-80">{milestone.description}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.career-timeline::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: -8px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: var(--p);
	}

	.milestone {
		position: relative;
	}
</style>
