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
			value: 'lnsjds@gmail.com',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>`,
			link: 'mailto:lnsjds@gmail.com'
		},
		{
			type: 'Phone',
			value: '(563) 639-4482',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>`,
			link: 'tel:5636394482'
		},
		{
			type: 'LinkedIn',
			value: 'https://www.linkedin.com/in/lucas-spain-24189715a',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
			link: 'https://www.linkedin.com/in/lucas-spain-24189715a'
		},
		{
			type: 'Location',
			value: 'Davenport, IA, 52803',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>`,
			link: 'https://maps.google.com/?q=Davenport,+IA,+52803'
		}
	];

	// Form validation function
	function validateForm() {
		if (!isFormValid) {
			alert('Please fill out all required fields correctly.');
			return false;
		}
		return true;
	}

	// Handle form submission
	function handleSubmit(event: SubmitEvent) {
		if (!validateForm()) {
			event.preventDefault();
		}
	}

	let visible = false;

	onMount(() => {
		visible = true;

		// Check for success query parameter
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get('success') === 'true') {
			submitSuccess = true;
		}
	});
</script>

<svelte:head>
	<title>Contact | Lucas Spain - Software Engineer, AI, Web Development, Iowa</title>
	<meta
		name="description"
		content="Contact Lucas Spain, a software engineer and AI specialist based in Iowa, Quad Cities, and Maquoketa. Reach out for opportunities in web development, agents, and computer science. Alumni of University of Iowa."
	/>
	<meta
		name="keywords"
		content="Contact, Lucas Spain, software engineer, AI, web development, agents, Maquoketa, Iowa, Quad Cities, Moline, East Moline, Davenport, University of Iowa, computer science, John Deere, LangChain, LangGraph, prompt engineering"
	/>
	<meta name="robots" content="index, follow" />
</svelte:head>

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

					<form
						action="https://formsubmit.co/lnsjds@gmail.com"
						method="POST"
						class="space-y-6"
						on:submit={handleSubmit}
					>
						<!-- Hidden FormSubmit fields -->
						<input type="hidden" name="_subject" value="New message from your website" />
						<input type="hidden" name="_template" value="table" />
						<input
							type="hidden"
							name="_next"
							value="{window.location.origin}/contact?success=true"
						/>
						<input type="hidden" name="_captcha" value="true" />
						<input type="text" name="_honey" style="display:none" />
						<!-- Name input -->
						<div class="form-control w-full">
							<label class="label" for="name">
								<span class="label-text font-medium">Name</span>
								<span class="label-text-alt text-error">*</span>
							</label>
							<input
								type="text"
								id="name"
								name="name"
								bind:value={name}
								class="input input-bordered w-full focus:border-primary {!isNameValid && name !== ''
									? 'input-error'
									: ''}"
								placeholder="Your name"
								required
								aria-required="true"
								aria-invalid={!isNameValid && name !== ''}
							/>
							{#if !isNameValid && name !== ''}
								<label class="label" for="name">
									<span class="label-text-alt text-error">Name is required</span>
								</label>
							{/if}
						</div>

						<!-- Email input -->
						<div class="form-control w-full">
							<label class="label" for="email">
								<span class="label-text font-medium">Email</span>
								<span class="label-text-alt text-error">*</span>
							</label>
							<input
								type="email"
								id="email"
								name="email"
								bind:value={email}
								class="input input-bordered w-full focus:border-primary {!isEmailValid &&
								email !== ''
									? 'input-error'
									: ''}"
								placeholder="Your email address"
								required
								aria-required="true"
								aria-invalid={!isEmailValid && email !== ''}
							/>
							{#if !isEmailValid && email !== ''}
								<label class="label" for="email">
									<span class="label-text-alt text-error">Please enter a valid email address</span>
								</label>
							{/if}
						</div>

						<!-- Subject input -->
						<div class="form-control w-full">
							<label class="label" for="subject">
								<span class="label-text font-medium">Subject</span>
								<span class="label-text-alt text-error">*</span>
							</label>
							<input
								type="text"
								id="subject"
								name="subject"
								bind:value={subject}
								class="input input-bordered w-full focus:border-primary {!isSubjectValid &&
								subject !== ''
									? 'input-error'
									: ''}"
								placeholder="Subject of your message"
								required
								aria-required="true"
								aria-invalid={!isSubjectValid && subject !== ''}
							/>
							{#if !isSubjectValid && subject !== ''}
								<label class="label" for="subject">
									<span class="label-text-alt text-error">Subject is required</span>
								</label>
							{/if}
						</div>

						<!-- Message input -->
						<div class="form-control w-full">
							<label class="label" for="message">
								<span class="label-text font-medium">Message</span>
								<span class="label-text-alt text-error">*</span>
							</label>
							<textarea
								id="message"
								name="message"
								bind:value={message}
								class="textarea textarea-bordered h-32 w-full focus:border-primary {!isMessageValid &&
								message !== ''
									? 'textarea-error'
									: ''}"
								placeholder="Your message"
								required
								aria-required="true"
								aria-invalid={!isMessageValid && message !== ''}
							></textarea>
							{#if !isMessageValid && message !== ''}
								<label class="label" for="message">
									<span class="label-text-alt text-error"
										>Message must be at least 10 characters</span
									>
								</label>
							{/if}
						</div>

						<!-- Submit button -->
						<button
							type="submit"
							class="btn btn-primary w-full mt-6"
							disabled={!isFormValid}
							aria-live="polite"
						>
							Send Message
						</button>

						<!-- Success/Error messages -->
						{#if submitSuccess}
							<div class="alert alert-success mt-4" transition:fade>
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
							<div class="alert alert-error mt-4" transition:fade>
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
								<li
									class="flex flex-wrap sm:flex-nowrap items-center"
									in:fly={{ y: 10, duration: 300, delay: i * 100 }}
								>
									<div
										class="w-12 h-12 sm:w-12 sm:h-12 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content mr-4 shadow-md"
									>
										{@html info.icon}
									</div>
									<div class="min-w-0 w-full max-w-full">
										<h4 class="font-semibold">{info.type}</h4>
										<a
											href={info.link}
											target="_blank"
											rel="noopener noreferrer"
											class="text-primary hover:underline block max-w-full break-all text-xs sm:text-sm"
											title={info.value}
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
						<h3 class="text-xl font-bold mb-4">Education</h3>
						<div class="mb-4">
							<p class="font-semibold">The University of Iowa</p>
							<p>Master of Computer Science</p>
							<p>Graduated: May 2022</p>
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
		box-shadow: 0 0 0 2px rgba(var(--p), 0.2);
		outline: none;
	}

	.form-control {
		margin-bottom: 1rem;
	}
</style>
