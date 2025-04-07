<script lang="ts">
	import { animateOnScroll } from '$lib/actions/animate';
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';

	// Form state
	let name = '';
	let email = '';
	let subject = '';
	let message = '';
	let isSubmitting = false;
	let submitSuccess = false;
	let submitError = false;

	// Form validation
	$: isNameValid = name.length > 0;
	$: isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	$: isSubjectValid = subject.length > 0;
	$: isMessageValid = message.length > 10;
	$: isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

	// Contact information
	const contactInfo = [
		{
			type: 'Email',
			value: 'contact@yourname.com',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>`,
			link: 'mailto:contact@yourname.com'
		},
		{
			type: 'LinkedIn',
			value: 'linkedin.com/in/yourname',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
			link: 'https://linkedin.com/in/yourname'
		},
		{
			type: 'GitHub',
			value: 'github.com/yourname',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
			link: 'https://github.com/yourname'
		},
		{
			type: 'Location',
			value: 'San Francisco, CA',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>`,
			link: 'https://maps.google.com/?q=San+Francisco,+CA'
		}
	];

	// Handle form submission
	async function handleSubmit() {
		if (!isFormValid) return;

		isSubmitting = true;
		submitSuccess = false;
		submitError = false;

		try {
			// In a real implementation, you would send the form data to a server
			// For this template, we'll simulate a successful submission after a delay
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Reset form
			name = '';
			email = '';
			subject = '';
			message = '';

			submitSuccess = true;
		} catch (error) {
			submitError = true;
			console.error('Form submission error:', error);
		} finally {
			isSubmitting = false;
		}
	}

	let visible = false;

	onMount(() => {
		visible = true;
	});
</script>

<section id="contact" class="page-section bg-base-100 py-20">
	<div class="container mx-auto px-4">
		<!-- Section header -->
		<div class="text-center mb-16" use:animateOnScroll>
			<h2 class="section-title text-primary">Get In Touch</h2>
			<p class="section-subtitle">Let's discuss your project or opportunities</p>
		</div>

		<!-- Contact content -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
			<!-- Left column: Contact form -->
			<div class="contact-form" use:animateOnScroll>
				<div class="bg-base-200 rounded-lg shadow-md p-8">
					<h3 class="text-2xl font-bold mb-6">Send Me a Message</h3>

					<form on:submit|preventDefault={handleSubmit} class="space-y-6">
						<!-- Name input -->
						<div class="form-control w-full">
							<label class="label" for="name">
								<span class="label-text">Name</span>
							</label>
							<input
								type="text"
								id="name"
								bind:value={name}
								class="input input-bordered w-full {!isNameValid && name !== ''
									? 'input-error'
									: ''}"
								placeholder="Your name"
								required
							/>
							{#if !isNameValid && name !== ''}
								<label class="label">
									<span class="label-text-alt text-error">Name is required</span>
								</label>
							{/if}
						</div>

						<!-- Email input -->
						<div class="form-control w-full">
							<label class="label" for="email">
								<span class="label-text">Email</span>
							</label>
							<input
								type="email"
								id="email"
								bind:value={email}
								class="input input-bordered w-full {!isEmailValid && email !== ''
									? 'input-error'
									: ''}"
								placeholder="Your email address"
								required
							/>
							{#if !isEmailValid && email !== ''}
								<label class="label">
									<span class="label-text-alt text-error">Please enter a valid email address</span>
								</label>
							{/if}
						</div>

						<!-- Subject input -->
						<div class="form-control w-full">
							<label class="label" for="subject">
								<span class="label-text">Subject</span>
							</label>
							<input
								type="text"
								id="subject"
								bind:value={subject}
								class="input input-bordered w-full {!isSubjectValid && subject !== ''
									? 'input-error'
									: ''}"
								placeholder="Subject of your message"
								required
							/>
							{#if !isSubjectValid && subject !== ''}
								<label class="label">
									<span class="label-text-alt text-error">Subject is required</span>
								</label>
							{/if}
						</div>

						<!-- Message input -->
						<div class="form-control w-full">
							<label class="label" for="message">
								<span class="label-text">Message</span>
							</label>
							<textarea
								id="message"
								bind:value={message}
								class="textarea textarea-bordered h-32 w-full {!isMessageValid && message !== ''
									? 'textarea-error'
									: ''}"
								placeholder="Your message"
								required
							></textarea>
							{#if !isMessageValid && message !== ''}
								<label class="label">
									<span class="label-text-alt text-error"
										>Message must be at least 10 characters</span
									>
								</label>
							{/if}
						</div>

						<!-- Submit button -->
						<button
							type="submit"
							class="btn btn-primary w-full {isSubmitting ? 'loading' : ''}"
							disabled={!isFormValid || isSubmitting}
						>
							{#if isSubmitting}
								Sending...
							{:else}
								Send Message
							{/if}
						</button>

						<!-- Success/Error messages -->
						{#if submitSuccess}
							<div class="alert alert-success" transition:fade>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="stroke-current shrink-0 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/></svg
								>
								<span>Your message has been sent successfully!</span>
							</div>
						{/if}

						{#if submitError}
							<div class="alert alert-error" transition:fade>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="stroke-current shrink-0 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
									/></svg
								>
								<span>There was an error sending your message. Please try again.</span>
							</div>
						{/if}
					</form>
				</div>
			</div>

			<!-- Right column: Contact information and map -->
			<div class="contact-info">
				{#if visible}
					<div class="bg-base-200 rounded-lg shadow-md p-8 mb-8" in:fly={{ y: 20, duration: 500 }}>
						<h3 class="text-2xl font-bold mb-6">Contact Information</h3>

						<ul class="space-y-6">
							{#each contactInfo as info, i}
								<li class="flex items-center" in:fly={{ y: 10, duration: 300, delay: i * 100 }}>
									<div
										class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-content mr-4"
									>
										{@html info.icon}
									</div>
									<div>
										<h4 class="font-semibold">{info.type}</h4>
										<a
											href={info.link}
											target="_blank"
											rel="noopener noreferrer"
											class="text-primary hover:underline"
										>
											{info.value}
										</a>
									</div>
								</li>
							{/each}
						</ul>
					</div>

					<!-- Availability -->
					<div
						class="bg-base-200 rounded-lg shadow-md p-8"
						in:fly={{ y: 20, duration: 500, delay: 200 }}
					>
						<h3 class="text-xl font-bold mb-4">Availability</h3>
						<p class="mb-4">I'm currently available for:</p>
						<ul class="space-y-2">
							<li class="flex items-center">
								<span class="text-primary mr-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</span>
								<span>Full-time positions</span>
							</li>
							<li class="flex items-center">
								<span class="text-primary mr-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</span>
								<span>Contract work</span>
							</li>
							<li class="flex items-center">
								<span class="text-primary mr-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</span>
								<span>Consulting projects</span>
							</li>
							<li class="flex items-center">
								<span class="text-primary mr-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</span>
								<span>Speaking engagements</span>
							</li>
						</ul>

						<div class="mt-6">
							<p class="font-semibold">Response Time:</p>
							<p>I typically respond within 24 hours.</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.contact-form input:focus,
	.contact-form textarea:focus {
		border-color: var(--p);
	}
</style>
