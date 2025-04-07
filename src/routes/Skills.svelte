<script lang="ts">
	import { animateOnScroll, staggerChildren } from '$lib/actions/animate';
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';

	// Define skill categories
	const skillCategories = [
		{
			name: 'AI & Machine Learning',
			description: 'Specialized expertise in building AI-powered applications',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" /></svg>`,
			skills: [
				{ name: 'LangChain', level: 95 },
				{ name: 'LangGraph', level: 90 },
				{ name: 'Vector Databases (OpenSearch, Chroma)', level: 85 },
				{ name: 'RAG Systems', level: 90 },
				{ name: 'Multi-Agent Systems', level: 85 },
				{ name: 'Prompt Engineering', level: 90 },
				{ name: 'OpenAI API', level: 95 },
				{ name: 'Ollama', level: 80 },
				{ name: 'Multi-Modal AI', level: 75 }
			]
		},
		{
			name: 'Frontend Development',
			description: 'Creating responsive and interactive user interfaces',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`,
			skills: [
				{ name: 'JavaScript/TypeScript', level: 95 },
				{ name: 'React', level: 90 },
				{ name: 'Svelte', level: 85 },
				{ name: 'HTML5/CSS3', level: 95 },
				{ name: 'TailwindCSS', level: 90 },
				{ name: 'Responsive Design', level: 95 },
				{ name: 'UI/UX Principles', level: 85 }
			]
		},
		{
			name: 'Backend Development',
			description: 'Building robust server-side applications and APIs',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" /></svg>`,
			skills: [
				{ name: 'Node.js', level: 90 },
				{ name: 'Python', level: 95 },
				{ name: 'Express/FastAPI', level: 90 },
				{ name: 'RESTful APIs', level: 95 },
				{ name: 'GraphQL', level: 85 },
				{ name: 'MongoDB/PostgreSQL', level: 90 },
				{ name: 'Serverless Architecture', level: 85 }
			]
		},
		{
			name: 'DevOps & Cloud',
			description: 'Managing infrastructure and deployment pipelines',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" /></svg>`,
			skills: [
				{ name: 'AWS', level: 90 },
				{ name: 'Docker', level: 95 },
				{ name: 'Kubernetes', level: 80 },
				{ name: 'CI/CD Pipelines', level: 85 },
				{ name: 'Infrastructure as Code', level: 80 },
				{ name: 'Monitoring & Logging', level: 85 },
				{ name: 'Security Best Practices', level: 90 }
			]
		}
	];

	// Active category
	let activeCategory = skillCategories[0];

	// Define category type
	type SkillCategory = (typeof skillCategories)[0];

	// Set active category
	function setActiveCategory(category: SkillCategory) {
		activeCategory = category;
	}

	let visible = false;

	onMount(() => {
		visible = true;
	});
</script>

<section id="skills" class="page-section bg-base-200 py-20">
	<div class="container mx-auto px-4">
		<!-- Section header -->
		<div class="text-center mb-16" use:animateOnScroll>
			<h2 class="section-title text-primary">Skills & Expertise</h2>
			<p class="section-subtitle">
				Specialized technical capabilities with focus on AI technologies
			</p>
		</div>

		<!-- Skills content -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Left column: Categories -->
			<div class="categories">
				<div class="bg-base-100 rounded-lg shadow-md p-6" use:animateOnScroll>
					<h3 class="text-xl font-bold mb-6">Skill Categories</h3>

					<ul class="space-y-2">
						{#each skillCategories as category, i}
							<li>
								<button
									class="w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center gap-3 {activeCategory.name ===
									category.name
										? 'bg-primary text-primary-content'
										: 'hover:bg-base-200'}"
									on:click={() => setActiveCategory(category)}
									use:animateOnScroll
								>
									<span class="icon">{@html category.icon}</span>
									<span class="font-medium">{category.name}</span>
								</button>
							</li>
						{/each}
					</ul>

					<!-- Skill summary -->
					<div class="mt-8 p-4 bg-base-200 rounded-lg">
						<h4 class="font-semibold mb-2">Skill Summary</h4>
						<p class="text-sm opacity-80">
							Specialized in AI technologies with strong full-stack development capabilities.
							Experienced in building end-to-end solutions from infrastructure to user interfaces.
						</p>
					</div>
				</div>
			</div>

			<!-- Right column: Skills visualization -->
			<div class="skills-visualization col-span-2">
				{#if visible}
					<div class="bg-base-100 rounded-lg shadow-md p-6" in:fade={{ duration: 500 }}>
						<div class="flex justify-between items-center mb-8">
							<h3 class="text-xl font-bold">{activeCategory.name}</h3>
							<span class="badge badge-primary">{activeCategory.skills.length} Skills</span>
						</div>

						<p class="mb-8 opacity-80">{activeCategory.description}</p>

						<!-- Skills bars -->
						<div
							class="skills-list space-y-6"
							use:staggerChildren={{ selector: '.skill-item', staggerTime: 100 }}
						>
							{#each activeCategory.skills as skill, i}
								<div class="skill-item">
									<div class="flex justify-between mb-2">
										<span class="font-medium">{skill.name}</span>
										<span class="text-sm opacity-80">{skill.level}%</span>
									</div>
									<div class="w-full bg-base-300 rounded-full h-2.5 overflow-hidden">
										<div
											class="skill-progress h-2.5 rounded-full"
											style="width: {skill.level}%; background: linear-gradient(90deg, var(--p) 0%, var(--s) 100%);"
										></div>
									</div>
								</div>
							{/each}
						</div>

						<!-- Skill radar chart placeholder -->
						<div class="mt-12 flex justify-center">
							<div class="skill-radar w-64 h-64 relative">
								<!-- Radar background -->
								<div
									class="absolute inset-0 rounded-full border-2 border-base-300 opacity-20"
								></div>
								<div
									class="absolute inset-[10%] rounded-full border-2 border-base-300 opacity-30"
								></div>
								<div
									class="absolute inset-[20%] rounded-full border-2 border-base-300 opacity-40"
								></div>
								<div
									class="absolute inset-[30%] rounded-full border-2 border-base-300 opacity-50"
								></div>
								<div
									class="absolute inset-[40%] rounded-full border-2 border-base-300 opacity-60"
								></div>

								<!-- Radar points -->
								{#each activeCategory.skills.slice(0, 5) as skill, i}
									{@const angle = i * ((2 * Math.PI) / 5) - Math.PI / 2}
									{@const radius = (skill.level / 100) * 32}
									{@const x = 32 + radius * Math.cos(angle)}
									{@const y = 32 + radius * Math.sin(angle)}

									<div
										class="absolute w-3 h-3 rounded-full bg-primary transform -translate-x-1/2 -translate-y-1/2"
										style="left: {x}%; top: {y}%;"
									></div>

									<div
										class="absolute text-xs font-medium transform -translate-x-1/2 -translate-y-1/2"
										style="
                      left: {32 + 36 * Math.cos(angle)}%; 
                      top: {32 + 36 * Math.sin(angle)}%;
                    "
									>
										{skill.name}
									</div>
								{/each}

								<!-- Radar area -->
								<svg class="absolute inset-0 w-full h-full" viewBox="0 0 64 64">
									<polygon
										points={activeCategory.skills
											.slice(0, 5)
											.map((skill, i) => {
												const angle = i * ((2 * Math.PI) / 5) - Math.PI / 2;
												const radius = (skill.level / 100) * 32;
												const x = 32 + radius * Math.cos(angle);
												const y = 32 + radius * Math.sin(angle);
												return `${x},${y}`;
											})
											.join(' ')}
										fill="rgba(var(--p), 0.2)"
										stroke="var(--p)"
										stroke-width="0.5"
									/>
								</svg>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.skill-progress {
		animation: progress-animation 1.5s ease-out;
	}

	@keyframes progress-animation {
		0% {
			width: 0%;
		}
	}

	.skill-radar {
		animation: fade-in 1s ease-out;
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
