<script lang="ts">
	import portrait from '$lib/images/portrait.png';

	const socialLinks = [
		{ name: 'GitHub', url: 'https://github.com/lucasspain13' },
		{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/lucas-spain-24189715a' },
		{ name: 'Email', url: 'mailto:lnsjds@gmail.com' }
	];
</script>

<section id="hero" class="relative border-b border-base-300">
	<span class="reg-mark left-4 top-3" aria-hidden="true">+</span>
	<span class="reg-mark right-4 top-3" aria-hidden="true">+</span>

	<div class="wrap grid items-end gap-12 pb-16 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-16 lg:pb-24">
		<div class="lg:col-span-7">
			<p class="meta mb-6">
				<span class="text-primary" aria-hidden="true">●</span>
				Open to new opportunities · Bettendorf, Iowa
			</p>

			<h1 class="wonk font-display text-[clamp(3.75rem,11vw,8.5rem)] font-medium leading-[0.92]">
				Lucas Spain
			</h1>

			<h2 class="meta mt-5 text-primary">Software &amp; AI Engineer</h2>

			<p class="mt-8 max-w-xl text-lg leading-relaxed opacity-90">
				I build web applications and AI agent systems: retrieval pipelines, LangGraph graphs, and
				the interfaces in front of them. Four years shipping at John Deere, from the React frontend
				down to the AWS bill.
			</p>

			<nav class="mt-10 flex flex-wrap gap-x-8 gap-y-3" aria-label="Quick links">
				<a href="#projects" class="meta lk">↓ Project index</a>
				<a href="#contact" class="meta lk">→ Get in touch</a>
				<a href="/Lucas_Spain_Resume.pdf" download="Lucas_Spain_Resume.pdf" class="meta lk">
					⤓ Résumé (PDF)
				</a>
			</nav>

			<p class="meta mt-6 opacity-60">
				{#each socialLinks as link, i}
					{#if i > 0}<span aria-hidden="true">&nbsp;/&nbsp;</span>{/if}
					<a href={link.url} target="_blank" rel="noopener noreferrer" class="lk">{link.name}</a>
				{/each}
			</p>
		</div>

		<figure class="max-w-sm lg:col-span-5 lg:justify-self-end">
			<img
				src={portrait}
				alt="Portrait of Lucas Spain"
				width="1000"
				fetchpriority="high"
				class="plate aspect-[4/5] w-full object-cover"
			/>
			<figcaption class="meta mt-3 opacity-60">fig. 01 — the author, mid-deploy</figcaption>
		</figure>
	</div>
</section>

<style lang="postcss">
	.reg-mark {
		@apply absolute select-none font-mono text-xs text-primary opacity-70;
	}

	.plate {
		border: 1px solid theme('colors.base-content' / 100%);
		box-shadow: 10px 10px 0 0 theme('colors.base-content' / 12%);
	}

	/* Fraunces ships SOFT and WONK variable axes; lean into them on hover. */
	.wonk {
		font-variation-settings:
			'SOFT' 0,
			'WONK' 0;
		transition: font-variation-settings 0.5s ease;
	}

	.wonk:hover {
		font-variation-settings:
			'SOFT' 60,
			'WONK' 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.wonk {
			transition: none;
		}
	}
</style>
