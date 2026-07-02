<script lang="ts">
	import About from './About.svelte';
	import Contact from './Contact.svelte';
	import Experience from './Experience.svelte';
	import Hero from './Hero.svelte';
	import Highlights from './Highlights.svelte';
	import Projects from './Projects.svelte';
	import Skills from './Skills.svelte';

	const seoTitle = 'Lucas Spain | Software Engineer';
	const seoDescription =
		'Lucas Spain is a software engineer in the Quad Cities building full-stack web applications, generative AI systems with LangGraph and RAG, and the cloud infrastructure behind them.';
	const seoKeywords =
		'Lucas Spain, software engineer, generative AI, LangChain, LangGraph, RAG, full stack developer, web development, cloud infrastructure, Iowa, Quad Cities';
</script>

<svelte:head>
	<title>{seoTitle}</title>
	<meta name="description" content={seoDescription} />
	<meta name="keywords" content={seoKeywords} />
	<meta name="author" content="Lucas Spain" />
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content="#F5F3EE" />

	<link rel="canonical" href="https://www.lucas-spain.com/" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://www.lucas-spain.com/" />
	<meta property="og:title" content={seoTitle} />
	<meta property="og:description" content={seoDescription} />
	<meta property="og:image" content="/images/portrait.png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seoTitle} />
	<meta name="twitter:description" content={seoDescription} />
	<meta name="twitter:image" content="/images/portrait.png" />

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Lucas Spain",
			"url": "https://www.lucas-spain.com",
			"jobTitle": "Software Engineer",
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
			"description": "Software engineer based in the Quad Cities, working across full-stack web development, generative AI, and cloud infrastructure.",
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
