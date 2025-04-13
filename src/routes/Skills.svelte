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
				{ name: 'LangChain', level: 90 },
				{ name: 'LangGraph', level: 95 },
				{ name: 'OpenAI APIs', level: 90 },
				{ name: 'RAG Systems', level: 85 },
				{ name: 'Embeddings', level: 80 },
				{ name: 'LangServe', level: 75 },
				{ name: 'OpenSearch', level: 70 },
				{ name: 'Whisper', level: 90 },
				{ name: 'Cross-Encoders', level: 85 }
			]
		},
		{
			name: 'Frontend Development',
			description: 'Creating responsive and interactive user interfaces',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`,
			skills: [
				{ name: 'JavaScript/TypeScript', level: 90 },
				{ name: 'React', level: 95 },
				{ name: 'HTML5/CSS3', level: 90 },
				{ name: 'Responsive Design', level: 80 },
				{ name: 'UI/UX Principles', level: 75 },
				{ name: 'Redux', level: 85 },
				{ name: 'Playwright', level: 90 },
				{ name: 'Svelte', level: 60 }
			]
		},
		{
			name: 'Backend Development',
			description: 'Building robust server-side applications and APIs',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" /></svg>`,
			skills: [
				{ name: 'Python', level: 95 },
				{ name: 'Java (Spring)', level: 80 },
				{ name: 'PostgreSQL', level: 75 },
				{ name: 'RESTful APIs', level: 90 },
				{ name: 'FastAPI', level: 85 },
				{ name: 'Rust', level: 65 },
				{ name: 'C', level: 60 },
				{ name: 'Haskell', level: 60 }
			]
		},
		{
			name: 'DevOps & Cloud',
			description: 'Managing infrastructure and deployment pipelines',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" /></svg>`,
			skills: [
				{ name: 'AWS', level: 85 },
				{ name: 'Docker', level: 90 },
				{ name: 'GitHub Actions', level: 95 },
				{ name: 'Terraform', level: 90 },
				{ name: 'CI/CD Pipelines', level: 95 },
				{ name: 'Lambda Functions', level: 85 },
				{ name: 'AWS IAM', level: 75 },
				{ name: 'CloudWatch', level: 75 },
				{ name: 'Secrets Management', level: 90 }
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

<svelte:head>
	<title>Skills | Lucas Spain - AI, Web Development, Agents, Computer Science, Iowa</title>
	<meta
		name="description"
		content="Discover the technical skills and expertise of Lucas Spain, including AI, web development, agents, computer science, and cloud infrastructure. Experience with LangChain, LangGraph, FastAPI, Python, and more. Based in Iowa, Quad Cities, Maquoketa, and Moline."
	/>
	<meta
		name="keywords"
		content="Skills, Lucas Spain, AI, web development, agents, computer science, LangChain, LangGraph, FastAPI, Python, SvelteKit, TypeScript, Maquoketa, Iowa, Quad Cities, Moline, East Moline, Davenport, University of Iowa, John Deere, cloud infrastructure"
	/>
	<meta name="robots" content="index, follow" />
</svelte:head>

<section id="skills" class="page-section bg-base-200 py-20">
	<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
		<!-- Removed px-4 for mobile edge-to-edge -->
		<!-- Replaced container with manual max-width and padding -->
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
			<div class="categories col-span-1">
				<!-- Ensure full span on mobile -->
				<div class="bg-base-100 rounded-lg shadow-md p-6 w-full" use:animateOnScroll>
					<!-- Added w-full -->
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
					<div class="mt-8 rounded-lg">
						<h4 class="font-semibold mb-2">Skill Summary</h4>
						<p class="text-sm opacity-80">
							Specialized in AI technologies with strong full-stack development capabilities.
							Experienced in building end-to-end solutions from infrastructure to user interfaces.
						</p>
					</div>
				</div>
			</div>

			<!-- Right column: Skills visualization -->
			<div class="skills-visualization col-span-1 lg:col-span-2">
				<!-- Explicit spans for mobile and large -->
				{#key activeCategory}
					{#if visible}
						<div
							class="bg-base-100 rounded-lg shadow-md p-6"
							out:fade={{ duration: 150 }}
							in:fade={{ duration: 300, delay: 150 }}
						>
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

							<!-- Skill radar chart -->
							<div class="mt-16 flex justify-center" use:animateOnScroll>
								<div class="skill-radar w-80 h-80 relative">
									<!-- Radar background grid (softer lines) -->
									<div class="absolute inset-0 rounded-full border border-base-content/10"></div>
									<div
										class="absolute inset-[12.5%] rounded-full border border-base-content/10"
									></div>
									<div
										class="absolute inset-[25%] rounded-full border border-base-content/10"
									></div>
									<div
										class="absolute inset-[37.5%] rounded-full border border-base-content/10"
									></div>

									<!-- Axis lines -->
									{#each activeCategory.skills.slice(0, 5) as _, i}
										{@const angle = i * ((2 * Math.PI) / 5) - Math.PI / 2}
										<div
											class="absolute top-1/2 left-1/2 w-[49%] h-px bg-base-content/10 origin-left"
											style="transform: rotate({(angle * 180) / Math.PI}deg);"
										></div>
									{/each}

									<!-- Radar area SVG -->
									<svg class="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 64 64">
										<!-- Skill polygon shape -->
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
											fill="rgba(0, 180, 216, 0.3)"
											stroke="#00B4D8"
											stroke-width="1"
											stroke-linejoin="round"
										/>
									</svg>

									<!-- Skill labels -->
									<!-- Skill labels as SVG text, wrapping around the radar circle for responsiveness -->
									<svg
										class="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
										viewBox="-10 -10 120 120"
									>
										<defs>
											{#each activeCategory.skills.slice(0, 5) as skill, i}
												{@const arcRadius = 64}
												{@const arcLength = (2 * Math.PI) / 4.2}
												{@const startAngle = i * ((2 * Math.PI) / 5) - Math.PI / 2 - arcLength / 2}
												{@const endAngle = startAngle + arcLength}
												{@const x1 = 50 + arcRadius * Math.cos(startAngle)}
												{@const y1 = 50 + arcRadius * Math.sin(startAngle)}
												{@const x2 = 50 + arcRadius * Math.cos(endAngle)}
												{@const y2 = 50 + arcRadius * Math.sin(endAngle)}
												<path
													id={'arc-label-' + i}
													d={'M ' +
														x1.toFixed(3) +
														' ' +
														y1.toFixed(3) +
														' A ' +
														arcRadius +
														' ' +
														arcRadius +
														' 0 0 1 ' +
														x2.toFixed(3) +
														' ' +
														y2.toFixed(3)}
													fill="none"
												/>
											{/each}
										</defs>
										{#each activeCategory.skills.slice(0, 5) as skill, i}
											<text
												font-size="4"
												fill="var(--tw-prose-body, #e5e7eb)"
												style="font-family: inherit; font-weight: 600; letter-spacing: 0.5px; paint-order: stroke; stroke: #1e293b; stroke-width: 0.7; filter: drop-shadow(0 1px 2px #0004);"
											>
												<textPath
													href={'#arc-label-' + i}
													startOffset="50%"
													text-anchor="middle"
													dominant-baseline="middle"
												>
													{skill.name}
												</textPath>
											</text>
										{/each}
									</svg>
								</div>
							</div>
						</div>
					{/if}
				{/key}
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
			transform: scale(0.95);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
