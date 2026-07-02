<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animate';
	import SectionHead from '$lib/components/SectionHead.svelte';
	import portrait from '$lib/images/portrait-2.jpeg';

	const quickFacts = [
		{ label: 'Base', value: 'Bettendorf, Iowa' },
		{ label: 'Experience', value: '4+ years professional' },
		{ label: 'Degree', value: 'M.C.S., University of Iowa' },
		{ label: 'Also', value: 'Code-pair & behavioral interviewer' }
	];

	const careerJourney = [
		{
			year: '2021–22',
			title: 'Graduate Teaching Assistant',
			description:
				'Supported students at University of Iowa in understanding programming and logical concepts.'
		},
		{
			year: '2022–24',
			title: 'ITDP',
			description:
				'Joined John Deere, developing full stack applications using React and Spring, hosted on AWS. Focused on site reliability engineering, CI/CD pipeline development, and cloud infrastructure management.'
		},
		{
			year: '2024–25',
			title: 'Software Engineer',
			description:
				'Built a full-stack web application with a React frontend and a Spring Boot backend.'
		},
		{
			year: '2025–',
			title: 'Senior Software Engineer, AI Solutions Team',
			description: 'Building AI applications with LangGraph, LangChain, the OpenAI APIs, and RAG.'
		}
	];
</script>

<section id="about" class="py-20 md:py-28">
	<div class="wrap">
		<div use:animateOnScroll>
			<SectionHead number="01" title="About" />
		</div>

		<div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-7" use:animateOnScroll>
				<div class="max-w-prose space-y-5 text-lg leading-relaxed opacity-90">
					<p>
						I'm a software engineer who moved from full-stack web development into AI. I've worked
						across the whole stack, from infrastructure and pipelines to the interfaces people use.
					</p>
					<p>
						I started at John Deere in the Information Technology Development Program, where I
						worked on full-stack applications, CI/CD pipelines, and AWS infrastructure. That work in
						deployment and site reliability still informs how I build today.
					</p>
					<p>
						Now I focus on AI applications: retrieval systems and agent workflows with LangChain,
						LangGraph, and the OpenAI APIs.
					</p>
				</div>

				<h3 class="meta mb-6 mt-14 border-t border-base-300 pt-4">Career journey</h3>
				<ol class="space-y-0">
					{#each careerJourney as milestone}
						<li class="grid gap-1 border-b border-base-300 py-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
							<span class="meta pt-1 text-primary">{milestone.year}</span>
							<div>
								<h4 class="font-display text-xl font-medium">{milestone.title}</h4>
								<p class="mt-1 text-sm leading-relaxed opacity-75">{milestone.description}</p>
							</div>
						</li>
					{/each}
				</ol>
			</div>

			<div class="lg:col-span-5" use:animateOnScroll>
				<div class="max-w-sm">
					<img
						src={portrait}
						alt="Lucas Spain"
						loading="lazy"
						class="plate aspect-[4/5] w-full object-cover"
					/>
				</div>

				<dl class="mt-10 max-w-sm">
					{#each quickFacts as fact}
						<div class="grid grid-cols-[7rem_1fr] gap-4 border-b border-base-300 py-3">
							<dt class="meta pt-0.5 opacity-60">{fact.label}</dt>
							<dd class="text-sm">{fact.value}</dd>
						</div>
					{/each}
				</dl>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	.plate {
		border: 1px solid theme('colors.base-content' / 100%);
		box-shadow: 10px 10px 0 0 theme('colors.base-content' / 12%);
	}
</style>
