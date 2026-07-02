<script lang="ts">
	import { animateOnScroll, staggerChildren } from '$lib/actions/animate';
	import SectionHead from '$lib/components/SectionHead.svelte';

	const highlights = [
		{
			title: 'AI Applications',
			description:
				'Production agents and RAG systems built with LangGraph, LangChain, and the OpenAI APIs.'
		},
		{
			title: 'Full-Stack Development',
			description:
				'React and Spring front-to-back, with FastAPI services and PostgreSQL behind them.'
		},
		{
			title: 'Cloud & DevOps',
			description:
				'CI/CD pipelines, infrastructure as code, and AWS: Lambda, IAM, and Secrets Manager.'
		},
		{
			title: 'Site Reliability',
			description:
				'Built a first-in-org CI/CD pipeline that cut deployment time from a day to 20 minutes.'
		},
		{
			title: 'Teaching & Mentoring',
			description: 'Two years as a graduate TA at Iowa; now a code-pair and behavioral interviewer.'
		},
		{
			title: 'Security',
			description:
				'Shipped org-wide CSRF protection and kept zero exploitable vulnerabilities in production.'
		}
	];
</script>

<section id="highlights" class="border-t border-base-300 bg-base-200 py-20 md:py-28">
	<div class="wrap">
		<div use:animateOnScroll>
			<SectionHead number="02" title="What I do" note="The short version" />
		</div>

		<ol
			class="grid gap-x-16 md:grid-cols-2"
			use:staggerChildren={{ selector: '.highlight-row', staggerTime: 80 }}
		>
			{#each highlights as item, i}
				<li class="highlight-row border-b border-base-300 py-6">
					<div class="flex items-baseline gap-4">
						<span class="meta text-primary">{String(i + 1).padStart(2, '0')}</span>
						<div>
							<h3 class="font-display text-2xl font-medium">{item.title}</h3>
							<p class="mt-2 text-sm leading-relaxed opacity-75">{item.description}</p>
						</div>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>
