<script lang="ts">
	import portrait from '$lib/images/portrait.png';
	import { onMount } from 'svelte';

	// Particle animation
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let particles: Particle[] = [];
	let animationFrame: number;

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

	class Particle {
		x: number;
		y: number;
		size: number;
		speedX: number;
		speedY: number;

		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
			this.size = Math.random() * 2 + 1;
			this.speedX = Math.random() * 0.6 - 0.3;
			this.speedY = Math.random() * 0.6 - 0.3;
		}

		update() {
			this.x += this.speedX;
			this.y += this.speedY;
			if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
			if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
		}

		draw() {
			if (!ctx) return;
			ctx.fillStyle = 'rgba(0, 180, 216, 0.5)';
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	function sizeCanvas() {
		if (!canvas) return;
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
	}

	function initParticles() {
		if (!canvas) return;
		sizeCanvas();
		particles = [];
		const count = window.innerWidth < 768 ? 30 : 70;
		for (let i = 0; i < count; i++) {
			particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
		}
		animate();
	}

	function animate() {
		if (!ctx || !canvas) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (let i = 0; i < particles.length; i++) {
			particles[i].update();
			particles[i].draw();
			for (let j = i + 1; j < particles.length; j++) {
				const dx = particles[i].x - particles[j].x;
				const dy = particles[i].y - particles[j].y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				if (distance < 120) {
					ctx.beginPath();
					ctx.strokeStyle = `rgba(0, 180, 216, ${0.18 - distance / 700})`;
					ctx.lineWidth = 0.5;
					ctx.moveTo(particles[i].x, particles[i].y);
					ctx.lineTo(particles[j].x, particles[j].y);
					ctx.stroke();
				}
			}
		}
		animationFrame = requestAnimationFrame(animate);
	}

	function handleResize() {
		sizeCanvas();
	}

	onMount(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (canvas && !reduceMotion) {
			ctx = canvas.getContext('2d');
			initParticles();
			window.addEventListener('resize', handleResize);
		}

		return () => {
			window.removeEventListener('resize', handleResize);
			if (animationFrame) cancelAnimationFrame(animationFrame);
		};
	});
</script>

<section
	id="hero"
	class="relative flex min-h-screen items-center justify-center overflow-hidden pb-24 lg:pb-0"
>
	<!-- Background -->
	<div class="absolute inset-0 isolate overflow-hidden">
		<canvas bind:this={canvas} class="absolute inset-0 h-full w-full opacity-50"></canvas>
		<div class="hero-bg absolute inset-0"></div>
		<div class="absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl"></div>
		<div class="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"></div>
	</div>

	<div class="container relative z-10 mx-auto px-4">
		<div
			class="flex flex-col items-center justify-center gap-10 text-center lg:flex-row-reverse lg:gap-16 lg:text-left"
		>
			<!-- Portrait -->
			<div class="relative flex w-full max-w-xs justify-center sm:max-w-sm lg:w-1/2 lg:justify-end">
				<div class="absolute inset-x-0 bottom-0 top-1/4 rounded-2xl bg-secondary/40"></div>
				<img
					src={portrait}
					class="relative z-10 h-auto max-w-full rounded-xl drop-shadow-2xl"
					alt="Portrait of Lucas Spain"
					style="max-height: 70vh;"
					width="1000"
					fetchpriority="high"
				/>
			</div>

			<!-- Text -->
			<div class="flex w-full max-w-2xl flex-col items-center lg:w-1/2 lg:items-start">
				<p class="reveal mb-2 font-medium text-accent" style="--d: 0ms">Hello, I'm</p>
				<h1 class="reveal text-4xl font-bold text-primary md:text-6xl" style="--d: 80ms">
					Lucas Spain
				</h1>
				<h2
					class="reveal mb-6 mt-2 text-2xl font-semibold opacity-90 md:text-3xl"
					style="--d: 160ms"
				>
					Software &amp; AI Engineer
				</h2>
				<p class="reveal mb-8 max-w-xl text-lg opacity-80" style="--d: 240ms">
					I build <span class="font-semibold text-accent">web applications</span> and
					<span class="font-semibold text-accent">AI agentic applications</span>, from full-stack
					products to custom agent frameworks.
				</p>

				<div
					class="reveal mb-8 flex flex-wrap justify-center gap-4 lg:justify-start"
					style="--d: 320ms"
				>
					<a href="#projects" class="btn btn-primary">View Projects</a>
					<a href="#contact" class="btn btn-outline">Get in Touch</a>
					<a href="/Lucas_Spain_Resume.pdf" download="Lucas_Spain_Resume.pdf" class="btn btn-outline">
						Résumé
					</a>
				</div>

				<div class="reveal flex justify-center gap-1 lg:justify-start" style="--d: 400ms">
					{#each socialLinks as link}
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-circle btn-ghost hover:text-primary"
							aria-label={link.name}
						>
							{@html link.icon}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<a
		href="#about"
		class="absolute inset-x-0 bottom-6 z-20 mx-auto flex animate-bounce justify-center text-primary opacity-80 transition-opacity hover:opacity-100"
		aria-label="Scroll to about section"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="h-8 w-8"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
		</svg>
	</a>
</section>

<style lang="postcss">
	.hero-bg {
		background: linear-gradient(135deg, #162440 0%, #1e2c48 100%);
		z-index: -1;
	}

	:global([data-theme='light']) .hero-bg {
		background: linear-gradient(135deg, #f0f4fa 0%, #e2e8f0 100%);
	}

	.reveal {
		animation: reveal 0.6s ease-out both;
		animation-delay: var(--d, 0ms);
	}

	@keyframes reveal {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-bounce {
			animation: none;
		}
		.reveal {
			animation: none;
		}
	}
</style>
