<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animate';
	import { fade } from 'svelte/transition';

	const skillCategories = [
		{
			name: 'AI & Machine Learning',
			description: 'Building AI-powered applications, agents, and retrieval systems.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>`,
			skills: [
				'LangChain',
				'LangGraph',
				'LangServe',
				'OpenAI APIs',
				'RAG Systems',
				'Embeddings',
				'OpenSearch',
				'Whisper',
				'Cross-Encoders'
			]
		},
		{
			name: 'Frontend Development',
			description: 'Responsive, accessible, and interactive user interfaces.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`,
			skills: [
				'JavaScript',
				'TypeScript',
				'React',
				'Svelte',
				'Redux',
				'HTML5',
				'CSS3',
				'TailwindCSS',
				'Playwright'
			]
		},
		{
			name: 'Backend Development',
			description: 'Robust server-side applications, APIs, and data layers.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" /></svg>`,
			skills: [
				'Python',
				'FastAPI',
				'Java',
				'Spring',
				'RESTful APIs',
				'PostgreSQL',
				'Rust',
				'C',
				'Haskell'
			]
		},
		{
			name: 'DevOps & Cloud',
			description: 'Infrastructure, deployment pipelines, and reliability on AWS.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" /></svg>`,
			skills: [
				'AWS',
				'Docker',
				'Terraform',
				'GitHub Actions',
				'CI/CD',
				'AWS Lambda',
				'IAM',
				'CloudWatch',
				'Secrets Management'
			]
		}
	];

	let activeCategory = skillCategories[0];

	type SkillCategory = (typeof skillCategories)[0];

	function setActiveCategory(category: SkillCategory) {
		activeCategory = category;
	}
</script>

<section id="skills" class="page-section bg-base-200 py-20">
	<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div class="mb-16 text-center" use:animateOnScroll>
			<h2 class="section-title text-primary">Skills &amp; Tools</h2>
			<p class="section-subtitle">The technologies I reach for most</p>
		</div>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<!-- Category nav -->
			<div class="col-span-1">
				<div class="w-full rounded-lg bg-base-100 p-6 shadow-md" use:animateOnScroll>
					<h3 class="mb-6 text-xl font-bold">Categories</h3>
					<ul class="space-y-2">
						{#each skillCategories as category}
							<li>
								<button
									class="flex w-full items-center gap-3 rounded-lg p-4 text-left transition-colors duration-200 {activeCategory.name ===
									category.name
										? 'bg-primary text-primary-content'
										: 'hover:bg-base-200'}"
									on:click={() => setActiveCategory(category)}
								>
									<span>{@html category.icon}</span>
									<span class="font-medium">{category.name}</span>
								</button>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<!-- Skill tags -->
			<div class="col-span-1 lg:col-span-2">
				{#key activeCategory}
					<div class="rounded-lg bg-base-100 p-6 shadow-md sm:p-8" in:fade={{ duration: 250 }}>
						<div class="mb-2 flex items-center justify-between">
							<h3 class="text-xl font-bold">{activeCategory.name}</h3>
							<span class="badge badge-primary">{activeCategory.skills.length}</span>
						</div>
						<p class="mb-8 opacity-80">{activeCategory.description}</p>

						<div class="flex flex-wrap gap-3">
							{#each activeCategory.skills as skill}
								<span
									class="rounded-full border border-base-300 bg-base-200 px-4 py-2 text-sm font-medium"
								>
									{skill}
								</span>
							{/each}
						</div>
					</div>
				{/key}
			</div>
		</div>
	</div>
</section>
