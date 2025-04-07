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
			url: 'https://github.com/yourusername',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
		},
		{
			name: 'LinkedIn',
			url: 'https://linkedin.com/in/yourusername',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`
		},
		{
			name: 'Twitter',
			url: 'https://twitter.com/yourusername',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>`
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

		// Create particles
		for (let i = 0; i < 100; i++) {
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

<section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<!-- Particle background -->
	<canvas bind:this={canvas} class="absolute top-0 left-0 w-full h-full -z-10 opacity-50"></canvas>

	<!-- Angled background banner -->
	<div class="banner bg-base-300 absolute"></div>

	<div class="container mx-auto px-4 z-10">
		<div class="hero-content flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-center">
			<!-- Portrait image -->
			<div class="portrait-container" use:animateOnScroll={{ threshold: 0.1, once: true }}>
				<img
					src={portrait}
					class="max-w-sm rounded-lg shadow-2xl mask mask-hexagon-2 bg-base-100 border-4 border-primary animate-pulse-slow"
					alt="Portrait"
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
			<div class="text-content max-w-2xl">
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
						From operations to full-stack development to AI solutions, I build innovative
						applications with a focus on <span class="text-accent-blue font-semibold"
							>LangChain</span
						>,
						<span class="text-accent-blue font-semibold">LangGraph</span>, and
						<span class="text-accent-yellow font-semibold">multi-agent systems</span>.
					</p>
				{/if}

				<!-- Call to action buttons -->
				{#if showButtons}
					<div
						class="flex flex-wrap gap-4 mb-8"
						in:slide={{ axis: 'x', delay: 400, duration: 500 }}
					>
						<a href="#projects" class="btn btn-primary">View Projects</a>
						<a href="#contact" class="btn btn-outline">Contact Me</a>
						<a href="/resume.pdf" class="btn btn-ghost">
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
						</a>
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
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
		<a href="#about" class="text-primary opacity-80 hover:opacity-100 transition-opacity">
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
	</div>
</section>

<style>
	.banner {
		top: 20%;
		left: 0;
		width: 100%;
		height: 60%;
		z-index: -1;
		transform: skewY(-6deg);
	}

	.portrait-container {
		position: relative;
		z-index: 10;
	}

	.typing-container {
		overflow: hidden;
	}

	.typing-container h1 {
		display: inline-block;
	}

	.social-links {
		display: flex;
		gap: 1rem;
	}

	/* Typing effect animation */
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
		0% {
			transform: scale(1);
			opacity: 0.7;
		}
		50% {
			transform: scale(1.05);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 0.7;
		}
	}

	.animate-pulse-slow {
		animation: pulse-slow 3s infinite;
	}
</style>
