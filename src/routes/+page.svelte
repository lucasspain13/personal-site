<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	// Import all section components
	import About from './About.svelte';
	import Contact from './Contact.svelte';
	import Experience from './Experience.svelte';
	import Hero from './Hero.svelte';
	import Highlights from './Highlights.svelte';
	import Projects from './Projects.svelte';
	import Skills from './Skills.svelte';

	const seoTitle = 'Lucas Spain | Software Engineer & AI Specialist';
	const seoDescription =
		'Portfolio of Lucas Spain, a software engineer specializing in AI solutions, full-stack development, and infrastructure operations.';
	const seoKeywords =
		'software engineer, AI, LangChain, LangGraph, full stack developer, portfolio, Lucas Spain';

	let visible = false;

	onMount(() => {
		visible = true;

		// Initialize scroll animations
		const animateOnScroll = () => {
			const elements = document.querySelectorAll('.animate-on-scroll');

			elements.forEach((element) => {
				const elementTop = element.getBoundingClientRect().top;
				const elementBottom = element.getBoundingClientRect().bottom;

				// Check if element is in viewport
				if (elementTop < window.innerHeight && elementBottom > 0) {
					element.classList.add('visible');
				}
			});
		};

		// Run on initial load
		animateOnScroll();

		// Add scroll event listener
		window.addEventListener('scroll', animateOnScroll);

		// Clean up event listener
		return () => {
			window.removeEventListener('scroll', animateOnScroll);
		};
	});
</script>

<svelte:head>
	<title>{seoTitle}</title>
	<meta name="description" content={seoDescription} />
	<meta name="keywords" content={seoKeywords} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={seoTitle} />
	<meta property="og:description" content={seoDescription} />
	<meta property="og:image" content="/images/portrait.png" />

	<!-- Structured Data for SEO -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Lucas Spain",
			"url": "https://lucasspain.com",
			"jobTitle": "Software Engineer",
			"worksFor": {
				"@type": "Organization",
				"name": "John Deere"
			},
			"description": "Software Engineer specializing in AI solutions, full-stack development, and infrastructure operations.",
			"sameAs": ["https://github.com/lucasspain13", "https://linkedin.com/in/yourusername"],
			"knowsAbout": [
				"LangChain",
				"LangGraph",
				"Vector Databases",
				"RAG Systems",
				"OpenAI API",
				"Generative AI",
				"Full Stack Development",
				"Cloud Infrastructure"
			]
		}
	</script>
</svelte:head>

<!-- Main content -->
{#if visible}
	<div in:fade={{ duration: 300 }}>
		<!-- Hero Section -->
		<Hero />

		<!-- About Section -->
		<About />

		<!-- Highlights Section -->
		<Highlights />

		<!-- Skills Section -->
		<Skills />

		<!-- Projects Section -->
		<Projects />

		<!-- Experience Section -->
		<Experience />

		<!-- Contact Section -->
		<Contact />
	</div>
{/if}
