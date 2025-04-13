<script lang="ts">
	export let title = 'Portfolio | Software Engineer';
	export let description =
		'Software Engineer specializing in web development, application development, machine learning operations, and infrastructure operations.';
	export let keywords =
		'software engineer, web development, full stack, AI, machine learning, operations, portfolio';
	export let author = 'Lucas Spain';
	export let ogImage = '/images/portrait.png';
	export let ogUrl = 'https://lucas-spain.com';
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content={author} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={ogUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://lucas-spain.com" />
</svelte:head>
