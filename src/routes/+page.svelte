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

	const seoTitle =
		'Lucas Spain | AI, Web Development & Software Engineer in Iowa, Quad Cities, Maquoketa';
	const seoDescription =
		'Portfolio of Lucas Spain, a software engineer and AI specialist based in Iowa and the Quad Cities, with expertise in web development, AI, agents, LangChain, prompt engineering, and computer science. Experience in Davenport, Maquoketa, Iowa City, UIowa, University of Iowa, Moline, and East Moline. Open to recruiter inquiries.';
	const seoKeywords =
		'Lucas Spain, software engineer, AI engineer, prompt engineer, Langchain, LangGraph, web development, AI, agents, computer science, Maquoketa, Iowa, Iowa City, UIowa, University of Iowa, Quad Cities, Davenport, Moline, East Moline, recruiter, portfolio, full stack developer, generative AI, RAG, cloud infrastructure, John Deere';

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
	<meta name="author" content="Lucas Spain" />
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content="#162440" />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://www.lucas-spain.com/" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://www.lucas-spain.com/" />
	<meta property="og:title" content={seoTitle} />
	<meta property="og:description" content={seoDescription} />
	<meta property="og:image" content="/images/portrait.png" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seoTitle} />
	<meta name="twitter:description" content={seoDescription} />
	<meta name="twitter:image" content="/images/portrait.png" />

	<!-- Structured Data for SEO -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Lucas Spain",
			"url": "https://www.lucas-spain.com",
			"jobTitle": "Software Engineer, AI Engineer, Prompt Engineer, Web Developer",
			"worksFor": {
				"@type": "Organization",
				"name": "John Deere"
			},
			"alumniOf": {
				"@type": "CollegeOrUniversity",
				"name": "University of Iowa"
			},
			"homeLocation": {
				"@type": "Place",
				"name": "Maquoketa, Iowa"
			},
			"address": {
				"@type": "PostalAddress",
				"addressLocality": "Davenport",
				"addressRegion": "IA",
				"addressCountry": "USA"
			},
			"description": "Software Engineer and AI specialist based in Iowa and the Quad Cities, with expertise in web development, AI, agents, LangChain, prompt engineering, and computer science. Experience in Davenport, Maquoketa, Iowa City, UIowa, University of Iowa, Moline, and East Moline.",
			"sameAs": [
				"https://github.com/lucasspain13",
				"https://linkedin.com/in/lucas-spain-24189715a"
			],
			"knowsAbout": [
				"Web Development",
				"AI",
				"Agents",
				"LangChain",
				"LangGraph",
				"Prompt Engineering",
				"Computer Science",
				"Maquoketa",
				"Iowa",
				"Iowa City",
				"UIowa",
				"University of Iowa",
				"Quad Cities",
				"Davenport",
				"Moline",
				"East Moline",
				"Full Stack Development",
				"RAG",
				"Cloud Infrastructure",
				"Generative AI"
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
