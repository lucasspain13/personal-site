<script lang="ts">
	import { animateOnScroll, staggerChildren } from '$lib/actions/animate';
	import SectionHead from '$lib/components/SectionHead.svelte';

	const skillCategories = [
		{
			name: 'AI & Machine Learning',
			description: 'Building AI-powered applications, agents, and retrieval systems.',
			skills: [
				'LangChain',
				'LangGraph',
				'LangServe',
				'LangSmith',
				'OpenAI API',
				'Anthropic Claude',
				'RAG systems',
				'embeddings',
				'vector search',
				'Qdrant',
				'OpenSearch',
				'semantic search',
				'document retrieval',
				'cross-encoders',
				're-ranking',
				'AI agents',
				'agentic frameworks',
				'MCP',
				'FastMCP',
				'A2A',
				'tool calling',
				'structured outputs',
				'prompt engineering',
				'streaming responses',
				'Whisper',
				'speech-to-text',
				'Ollama',
				'local LLMs',
				'Hugging Face'
			]
		},
		{
			name: 'Frontend Development',
			description: 'Responsive, accessible, and interactive user interfaces.',
			skills: [
				'JavaScript',
				'TypeScript',
				'React',
				'Svelte',
				'SvelteKit',
				'Redux',
				'HTML5',
				'CSS3',
				'TailwindCSS',
				'Mantine',
				'daisyUI',
				'Vite',
				'responsive design',
				'web accessibility',
				'single-page apps',
				'server-side rendering',
				'progressive web apps',
				'REST integration',
				'WebSockets',
				'Vitest',
				'Playwright'
			]
		},
		{
			name: 'Backend Development',
			description: 'Server-side applications, APIs, and data layers.',
			skills: [
				'Python',
				'FastAPI',
				'Pydantic',
				'Java',
				'Spring',
				'Spring Boot',
				'Node.js',
				'Express',
				'RESTful APIs',
				'API design',
				'API gateways',
				'microservices',
				'PostgreSQL',
				'SQL',
				'Supabase',
				'message queues',
				'WebSockets',
				'authentication',
				'Rust',
				'C',
				'Haskell'
			]
		},
		{
			name: 'DevOps & Cloud',
			description: 'Infrastructure, deployment pipelines, and reliability on AWS.',
			skills: [
				'AWS',
				'AWS Lambda',
				'Amazon S3',
				'CloudFront',
				'Route 53',
				'IAM',
				'CloudWatch',
				'Secrets Manager',
				'Amazon SES',
				'Docker',
				'Terraform',
				'infrastructure as code',
				'GitHub Actions',
				'CI/CD',
				'self-hosted runners',
				'serverless',
				'webhooks',
				'Linux',
				'Bash',
				'Nginx',
				'site reliability (SRE)',
				'monitoring & logging'
			]
		},
		{
			name: 'Tools & Practices',
			description: 'How I build, ship, and collaborate day to day.',
			skills: [
				'Git',
				'GitHub',
				'GitHub API',
				'VS Code',
				'npm',
				'pnpm',
				'Agile / Scrum',
				'code review',
				'conventional commits',
				'semantic-release',
				'unit testing',
				'integration testing',
				'test-driven development',
				'secure coding',
				'debugging',
				'Jira'
			]
		}
	];
</script>

<section id="skills" class="py-20 md:py-28">
	<div class="wrap">
		<div use:animateOnScroll>
			<SectionHead number="03" title="Skills &amp; tools" />
		</div>

		<ul use:staggerChildren={{ selector: '.skill-group', staggerTime: 80 }}>
			{#each skillCategories as category}
				<li class="skill-group grid gap-3 border-b border-base-300 py-8 lg:grid-cols-12 lg:gap-8">
					<div class="lg:col-span-4">
						<h3 class="font-display text-2xl font-medium">{category.name}</h3>
						<p class="mt-2 text-sm opacity-60">{category.description}</p>
					</div>
					<p class="font-mono text-sm leading-loose lg:col-span-8">
						{category.skills.join(' · ')}
					</p>
				</li>
			{/each}
		</ul>
	</div>
</section>
