<script lang="ts">
	import { animateOnScroll, staggerChildren } from '$lib/actions/animate';

	const highlights = [
		{
			title: 'AI Applications',
			description:
				'Production agents and RAG systems built with LangGraph, LangChain, and the OpenAI APIs.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>`
		},
		{
			title: 'Full-Stack Development',
			description:
				'React and Spring front-to-back, with FastAPI services and PostgreSQL behind them.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`
		},
		{
			title: 'Cloud & DevOps',
			description:
				'CI/CD pipelines, infrastructure as code, and AWS — Lambda, IAM, and Secrets Manager.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" /></svg>`
		},
		{
			title: 'Site Reliability',
			description:
				'Built a first-in-org CI/CD pipeline that cut deployment time from a day to 20 minutes.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`
		},
		{
			title: 'Master of Computer Science',
			description:
				'University of Iowa — and two years as a graduate teaching assistant in the CS department.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>`
		},
		{
			title: 'Secure by Default',
			description:
				'Shipped org-wide CSRF protection and maintained zero exploitable vulnerabilities in production.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>`
		}
	];
</script>

<section id="highlights" class="page-section bg-base-200 py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center" use:animateOnScroll>
			<h2 class="section-title text-primary">What I Do</h2>
			<p class="section-subtitle">A quick look at where I spend my time</p>
		</div>

		<div
			class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
			use:staggerChildren={{ selector: '.highlight-card', staggerTime: 100 }}
		>
			{#each highlights as item}
				<div class="highlight-card card card-hover bg-base-100 shadow-md">
					<div class="card-body p-6">
						<div
							class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary"
						>
							{@html item.icon}
						</div>
						<h3 class="card-title text-lg">{item.title}</h3>
						<p class="text-sm opacity-70">{item.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
