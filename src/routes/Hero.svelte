<script lang="ts">
	import { animateOnScroll, staggerChildren } from '$lib/actions/animate';
	import portrait from '$lib/images/portrait.png';
	import { onMount } from 'svelte';
	import { fade, fly, scale, slide } from 'svelte/transition';

	// Typing effect state
	let typingComplete = false;
	let showSubtitle = false;
	let showDescription = false;
	let showButtons = false;
	let showSocial = false;

	// Particle animation
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let particles: Particle[] = [];
	let animationFrame: number;

	// Social media links
	const socialLinks = [
		{
			name: 'GitHub',
			url: 'https://github.com/lucasspain13',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/lucas-spain-24189715a',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`
		},
		{
			name: 'Email',
			url: 'mailto:lnsjds@gmail.com',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>`
		}
	];

	// Particle class for background animation
	class Particle {
		x: number;
		y: number;
		size: number;
		speedX: number;
		speedY: number;
		color: string;

		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
			this.size = Math.random() * 3 + 1;
			this.speedX = Math.random() * 2 - 1;
			this.speedY = Math.random() * 2 - 1;
			this.color = `rgba(var(--p), ${Math.random() * 0.3 + 0.1})`;
		}

		update() {
			this.x += this.speedX;
			this.y += this.speedY;

			if (this.size > 0.2) this.size -= 0.01;
		}

		draw() {
			if (!ctx) return;
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	// Initialize particle animation
	function initParticles() {
		if (!canvas) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// Adjust particle count based on screen size
		let particleCount = 100;
		if (window.innerWidth < 768) {
			particleCount = 40;
		}

		// Create particles
		for (let i = 0; i < particleCount; i++) {
			const x = Math.random() * canvas.width;
			const y = Math.random() * canvas.height;
			particles.push(new Particle(x, y));
		}

		// Start animation loop
		animateParticles();
	}

	// Animate particles
	function animateParticles() {
		if (!ctx || !canvas) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Update and draw particles
		for (let i = 0; i < particles.length; i++) {
			particles[i].update();
			particles[i].draw();

			// Connect particles with lines if they're close enough
			for (let j = i; j < particles.length; j++) {
				const dx = particles[i].x - particles[j].x;
				const dy = particles[i].y - particles[j].y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < 100) {
					ctx.beginPath();
					ctx.strokeStyle = `rgba(var(--p), ${0.2 - distance / 500})`;
					ctx.lineWidth = 0.5;
					ctx.moveTo(particles[i].x, particles[i].y);
					ctx.lineTo(particles[j].x, particles[j].y);
					ctx.stroke();
				}
			}

			// Remove particles that are too small or out of bounds
			if (
				particles[i].size <= 0.2 ||
				particles[i].x < 0 ||
				particles[i].x > canvas.width ||
				particles[i].y < 0 ||
				particles[i].y > canvas.height
			) {
				particles.splice(i, 1);
				i--;

				// Add a new particle to replace the removed one
				const x = Math.random() * canvas.width;
				const y = Math.random() * canvas.height;
				particles.push(new Particle(x, y));
			}
		}

		animationFrame = requestAnimationFrame(animateParticles);
	}

	// Handle window resize
	function handleResize() {
		if (!canvas) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	// Sequence the animations
	function startAnimationSequence() {
		// Sequence the animations with delays
		setTimeout(() => {
			typingComplete = true;
		}, 1000);
		setTimeout(() => {
			showSubtitle = true;
		}, 2500);
		setTimeout(() => {
			showDescription = true;
		}, 3000);
		setTimeout(() => {
			showButtons = true;
		}, 3500);
		setTimeout(() => {
			showSocial = true;
		}, 4000);
	}

	onMount(() => {
		// Initialize canvas context
		if (canvas) {
			ctx = canvas.getContext('2d');
			initParticles();

			// Add resize event listener
			window.addEventListener('resize', handleResize);
		}

		// Start animation sequence
		startAnimationSequence();

		// Cleanup on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	});
</script>

<!-- DEBUG: Log when Hero component mounts -->
{#if false}
	{@html `<script>console.log('Hero button container debug');</script>`}
{/if}

<section
	id="hero"
	class="relative min-h-screen flex items-center justify-center overflow-hidden pb-24 lg:pb-0"
>
	<!-- Wrapper for background elements to ensure clipping -->
	<div class="absolute inset-0 overflow-hidden isolate">
		<!-- Particle background -->
		<canvas bind:this={canvas} class="absolute top-0 left-0 w-full h-full opacity-40"></canvas>

		<!-- Primary background with more distinct colors -->
		<div class="absolute inset-0 bg-gradient-to-br from-[#162440] to-[#1e2c48]"></div>

		<!-- Angled background banner with more vibrant colors -->
		<div
			class="banner w-full bg-gradient-to-r from-primary/40 via-accent-blue/30 to-primary/40 absolute"
		></div>

		<!-- Background decorative elements with more opacity -->
		<div class="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent-blue/20 blur-3xl"></div>
		<div class="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent-yellow/20 blur-3xl"></div>
		<div class="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/20 blur-3xl"></div>
	</div>

	<div class="container mx-auto px-4 relative z-10">
		<div
			class="hero-content flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-center justify-center"
		>
			<!-- Portrait image -->
			<div
				class="portrait-container relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0"
				use:animateOnScroll={{ threshold: 0.1, once: true }}
			>
				<!-- Portrait Background -->
				<div class="absolute bottom-0 left-0 right-0 top-1/4 bg-accent-yellow/70 rounded-xl"></div>

				<img
					src={portrait}
					class="max-w-full h-auto drop-shadow-2xl relative z-10"
					alt="Portrait of a software engineer and AI specialist from Iowa"
					style="max-height: 70vh;"
				/>

				<!-- Decorative elements -->
				<div
					class="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-accent-blue animate-bounce-light"
				></div>
				<div
					class="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-accent-yellow animate-pulse-slow"
				></div>
			</div>

			<!-- Text content -->
			<div class="text-content max-w-2xl text-center lg:text-left lg:w-1/2">
				<!-- Main heading with typing effect -->
				<div class="typing-container mb-2">
					<h1 class="text-4xl md:text-6xl font-bold text-primary">
						<span class="inline-block">Hello, I'm </span>
						<span class="inline-block text-accent-blue">Lucas Spain</span>
					</h1>
				</div>

				<!-- Subtitle -->
				{#if showSubtitle}
					<h2
						class="text-2xl md:text-3xl font-semibold mb-6 text-accent"
						in:slide={{ delay: 200, duration: 400 }}
					>
						Software Engineer
					</h2>
				{/if}

				<!-- Description -->
				{#if showDescription}
					<p class="text-lg mb-8 max-w-xl" in:fade={{ delay: 300, duration: 500 }}>
						I build innovative applications with <span class="text-accent-blue font-semibold"
							>LangGraph</span
						>,
						<span class="text-accent-blue font-semibold">FastAPI</span>, and
						<span class="text-accent-yellow font-semibold"
							>Retrieval-Augmented Generation (RAG)</span
						>.
					</p>
				{/if}

				<!-- Call to action buttons -->
				{#if showButtons}
					<div
						class="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start"
						in:slide={{ axis: 'x', delay: 400, duration: 500 }}
					>
						<a href="#projects" class="btn btn-primary">View Projects</a>
						<a href="#contact" class="btn btn-outline">Contact Me</a>
						<!-- TODO: Restore resume download when ready -->
						<!-- <a href="/resume.pdf" class="btn btn-ghost">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-5 h-5 mr-2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
								/>
							</svg>
							Resume
						</a> -->
					</div>
				{/if}

				<!-- Social links -->
				{#if showSocial}
					<div
						class="social-links"
						use:staggerChildren={{ selector: '.social-item', staggerTime: 100 }}
					>
						{#each socialLinks as link, i}
							<a
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								class="social-item btn btn-circle btn-ghost hover:text-primary transition-colors duration-300"
								aria-label={link.name}
							>
								{@html link.icon}
							</a>
						{/each}
					</div>
				{/if}
				<!-- Social links already above -->
			</div>
		</div>
	</div>
	<!-- Down chevron scroll indicator, absolutely positioned at bottom center -->
	<a
		href="#about"
		class="absolute left-1/2 -translate-x-1/2 bottom-4 lg:bottom-8 text-primary opacity-80 hover:opacity-100 transition-opacity animate-bounce z-20"
		aria-label="Scroll Down"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-8 h-8"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
		</svg>
	</a>
</section>

<style lang="postcss">
	.portrait-container {
		/* Add some perspective if desired */
		/* perspective: 1000px; */
	}

	.portrait-container img {
		/* Optional: Add a slight rotation or transform for more dynamic pop */
		/* transform: rotateY(-5deg) rotateX(2deg); */
		transition: transform 0.3s ease-out;
	}

	/* Hover effect example */
	/* .portrait-container:hover img {
		transform: scale(1.05) rotateY(0deg) rotateX(0deg);
	} */

	.banner {
		/* Adjust banner transform to ensure it looks good with the layout */
		bottom: 0;
		/* Removed left/right: -50% to prevent overflow */
		height: 400px; /* Example height */
		transform: skewY(-4deg); /* Maintain skew */
		transform-origin: bottom left;
		z-index: 5; /* Make sure it's behind text but potentially over lowest bg elements */
		transition:
			background 0.5s,
			filter 0.5s;
	}

	/* Light mode override for banner */
	:global([data-theme='light']) .banner {
		background: linear-gradient(
			to right,
			rgba(180, 210, 255, 0.25),
			rgba(255, 255, 255, 0.18),
			rgba(180, 210, 255, 0.25)
		) !important;
	}

	/* Main hero gradient background */
	:global([data-theme='light']) .absolute.bg-gradient-to-br {
		background: linear-gradient(135deg, #f0f4fa 0%, #e2e8f0 100%) !important;
		transition: background 0.5s;
	}

	/* Blurred circle backgrounds - light mode overrides */
	:global([data-theme='light']) .absolute.bg-accent-blue\/20 {
		background-color: rgba(100, 180, 255, 0.15) !important;
		transition:
			background 0.5s,
			filter 0.5s;
	}
	:global([data-theme='light']) .absolute.bg-accent-yellow\/20 {
		background-color: rgba(255, 230, 120, 0.13) !important;
		transition:
			background 0.5s,
			filter 0.5s;
	}
	:global([data-theme='light']) .absolute.bg-primary\/20 {
		background-color: rgba(120, 180, 255, 0.1) !important;
		transition:
			background 0.5s,
			filter 0.5s;
	}

	/* Add transition for all backgrounds for smooth fade */
	.absolute.bg-accent-blue\/20,
	.absolute.bg-accent-yellow\/20,
	.absolute.bg-primary\/20,
	.banner,
	.absolute.bg-gradient-to-br {
		transition:
			background 0.5s,
			filter 0.5s;
	}

	/* Adjust particle canvas z-index if needed */
	canvas {
		z-index: 1;
		opacity: 0.3; /* Adjusted opacity */
	}

	/* Ensure background elements are behind everything */
	.absolute.bg-accent-blue\/20,
	.absolute.bg-accent-yellow\/20,
	.absolute.bg-primary\/20 {
		z-index: 0;
	}

	/* Adjust hero content z-index to be above background elements */
	.hero-content {
		position: relative;
		z-index: 10; /* Above image and banner */
	}

	/* Typing cursor animation */
	@keyframes typing {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}

	@keyframes blink-caret {
		from,
		to {
			border-color: transparent;
		}
		50% {
			border-color: var(--p);
		}
	}

	/* Pulse animation for decorative elements */
	@keyframes pulse-slow {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.8;
		}
		50% {
			transform: scale(1.05);
			opacity: 1;
		}
	}

	.animate-bounce-light {
		animation: bounce-light 3s infinite ease-in-out;
	}

	@keyframes bounce-light {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}
</style>
