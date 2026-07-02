<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animate';
	import SectionHead from '$lib/components/SectionHead.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// Set after mount so it works with prerendering (no `window` at build time).
	let nextUrl = 'https://www.lucas-spain.com/?success=true';

	let name = '';
	let email = '';
	let subject = '';
	let message = '';
	let submitSuccess = false;

	$: isNameValid = name.length > 0;
	$: isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	$: isSubjectValid = subject.length > 0;
	$: isMessageValid = message.length > 10;
	$: isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

	const contactInfo = [
		{ type: 'Email', value: 'lnsjds@gmail.com', link: 'mailto:lnsjds@gmail.com' },
		{ type: 'Phone', value: '(563) 639-4482', link: 'tel:5636394482' },
		{
			type: 'LinkedIn',
			value: 'lucas-spain',
			link: 'https://www.linkedin.com/in/lucas-spain-24189715a'
		},
		{
			type: 'Location',
			value: 'Bettendorf, IA 52722',
			link: 'https://maps.google.com/?q=Bettendorf,+IA,+52722'
		}
	];

	onMount(() => {
		nextUrl = `${window.location.origin}/?success=true`;

		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get('success') === 'true') {
			submitSuccess = true;
		}
	});
</script>

<section id="contact" class="border-t border-base-300 bg-base-200 py-20 md:py-28">
	<div class="wrap">
		<div use:animateOnScroll>
			<SectionHead number="06" title="Get in touch" />
		</div>

		<div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
			<div class="contact-form lg:col-span-7" use:animateOnScroll>
				<form action="https://formsubmit.co/lnsjds@gmail.com" method="POST" class="space-y-8">
					<input type="hidden" name="_subject" value="New message from your website" />
					<input type="hidden" name="_template" value="table" />
					<input type="hidden" name="_next" value={nextUrl} />
					<input type="hidden" name="_captcha" value="true" />
					<input type="text" name="_honey" style="display:none" />

					<div class="grid gap-8 sm:grid-cols-2">
						<div>
							<label class="meta block pb-2" for="name">
								Name <span class="text-primary" aria-hidden="true">*</span>
							</label>
							<input
								type="text"
								id="name"
								name="name"
								bind:value={name}
								class="field {!isNameValid && name !== '' ? 'field-error' : ''}"
								placeholder="Your name"
								required
								aria-required="true"
								aria-invalid={!isNameValid && name !== ''}
							/>
							{#if !isNameValid && name !== ''}
								<p class="meta mt-2 text-error">Name is required</p>
							{/if}
						</div>

						<div>
							<label class="meta block pb-2" for="email">
								Email <span class="text-primary" aria-hidden="true">*</span>
							</label>
							<input
								type="email"
								id="email"
								name="email"
								bind:value={email}
								class="field {!isEmailValid && email !== '' ? 'field-error' : ''}"
								placeholder="you@example.com"
								required
								aria-required="true"
								aria-invalid={!isEmailValid && email !== ''}
							/>
							{#if !isEmailValid && email !== ''}
								<p class="meta mt-2 text-error">Please enter a valid email address</p>
							{/if}
						</div>
					</div>

					<div>
						<label class="meta block pb-2" for="subject">
							Subject <span class="text-primary" aria-hidden="true">*</span>
						</label>
						<input
							type="text"
							id="subject"
							name="subject"
							bind:value={subject}
							class="field {!isSubjectValid && subject !== '' ? 'field-error' : ''}"
							placeholder="What's this about?"
							required
							aria-required="true"
							aria-invalid={!isSubjectValid && subject !== ''}
						/>
						{#if !isSubjectValid && subject !== ''}
							<p class="meta mt-2 text-error">Subject is required</p>
						{/if}
					</div>

					<div>
						<label class="meta block pb-2" for="message">
							Message <span class="text-primary" aria-hidden="true">*</span>
						</label>
						<textarea
							id="message"
							name="message"
							bind:value={message}
							rows="5"
							class="field resize-y {!isMessageValid && message !== '' ? 'field-error' : ''}"
							placeholder="Your message"
							required
							aria-required="true"
							aria-invalid={!isMessageValid && message !== ''}
						></textarea>
						{#if !isMessageValid && message !== ''}
							<p class="meta mt-2 text-error">Message must be at least 10 characters</p>
						{/if}
					</div>

					<button
						type="submit"
						class="meta border border-base-content bg-base-content px-8 py-3 text-base-100 transition-colors hover:bg-primary hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
						disabled={!isFormValid}
						aria-live="polite"
					>
						Send message →
					</button>

					{#if submitSuccess}
						<p class="meta border border-success px-4 py-3 text-success" transition:fade>
							✓ Your message has been sent successfully!
						</p>
					{/if}
				</form>
			</div>

			<div class="lg:col-span-5" use:animateOnScroll>
				<h3 class="meta mb-2 border-t border-base-content pt-4">Direct channels</h3>
				<ul>
					{#each contactInfo as info}
						<li class="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-base-300 py-3">
							<span class="meta pt-0.5 opacity-60">{info.type}</span>
							<a href={info.link} target="_blank" rel="noopener noreferrer" class="lk text-sm">
								{info.value}
							</a>
						</li>
					{/each}
				</ul>

				<h3 class="meta mb-2 mt-12 border-t border-base-content pt-4">Education</h3>
				<div class="py-3">
					<p class="font-display text-xl font-medium">The University of Iowa</p>
					<p class="mt-1 text-sm opacity-75">Master of Computer Science</p>
					<p class="meta mt-1 opacity-60">Graduated May 2022</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	.field {
		@apply w-full border-0 border-b border-base-content/40 bg-transparent px-0 py-2 text-base outline-none transition-colors;
	}

	.field:focus {
		@apply border-primary;
	}

	.field::placeholder {
		@apply opacity-40;
	}

	.field-error {
		@apply border-error;
	}
</style>
