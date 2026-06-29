<script lang="ts">
	import About from './About.svelte';
	import Contact from './Contact.svelte';
	import Experience from './Experience.svelte';
	import Hero from './Hero.svelte';
	import Highlights from './Highlights.svelte';
	import Projects from './Projects.svelte';
	import Skills from './Skills.svelte';

	const seoTitle = 'Lucas Spain | Software & AI Engineer';
	const seoDescription =
		'Lucas Spain is a software and AI engineer in the Quad Cities, building AI applications with LangGraph, LangChain, and RAG, plus full-stack and cloud work. Open to new opportunities.';
	const seoKeywords =
		'Lucas Spain, software engineer, AI engineer, LangChain, LangGraph, RAG, full stack developer, web development, cloud infrastructure, Iowa, Quad Cities';
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
			"jobTitle": "Software & AI Engineer",
			"worksFor": {
				"@type": "Organization",
				"name": "John Deere"
			},
			"alumniOf": {
				"@type": "CollegeOrUniversity",
				"name": "University of Iowa"
			},
			"address": {
				"@type": "PostalAddress",
				"addressLocality": "Bettendorf",
				"addressRegion": "IA",
				"addressCountry": "USA"
			},
			"description": "Software and AI engineer based in the Quad Cities, building AI applications with LangGraph, LangChain, and RAG, alongside full-stack and cloud infrastructure work.",
			"sameAs": [
				"https://github.com/lucasspain13",
				"https://linkedin.com/in/lucas-spain-24189715a"
			],
			"knowsAbout": [
				"Software Engineering",
				"Artificial Intelligence",
				"LangChain",
				"LangGraph",
				"Retrieval-Augmented Generation",
				"Full Stack Development",
				"Cloud Infrastructure",
				"DevOps"
			]
		}
	</script>
</svelte:head>

<Hero />
<About />
<Highlights />
<Skills />
<Projects />
<Experience />
<Contact />
