import type { ActionReturn } from 'svelte/action';

interface AnimateParams {
	threshold?: number;
	root?: Element | null;
	rootMargin?: string;
	animationClass?: string;
	once?: boolean;
}

interface StaggerParams extends AnimateParams {
	selector?: string;
	staggerTime?: number;
}

/**
 * Svelte action for animating elements when they enter the viewport
 */
export function animateOnScroll(node: HTMLElement, params: AnimateParams = {}): ActionReturn {
	const {
		threshold = 0.1,
		root = null,
		rootMargin = '0px',
		animationClass = 'visible',
		once = true
	} = params;

	// Create the observer
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				// Add class when element enters viewport
				if (entry.isIntersecting) {
					node.classList.add(animationClass);

					// If once is true, unobserve after animation
					if (once) {
						observer.unobserve(node);
					}
				} else if (!once) {
					// Remove class when element leaves viewport (if not once)
					node.classList.remove(animationClass);
				}
			});
		},
		{
			threshold,
			root,
			rootMargin
		}
	);

	// Add base animation class
	node.classList.add('animate-on-scroll');

	// Start observing
	observer.observe(node);

	return {
		// Clean up when the element is removed
		destroy() {
			if (observer) {
				observer.disconnect();
			}
		},

		// Handle updates to parameters
		update(newParams: AnimateParams = {}) {
			const {
				threshold = 0.1,
				root = null,
				rootMargin = '0px',
				animationClass = 'visible',
				once = true
			} = newParams;

			observer.disconnect();

			const newObserver = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							node.classList.add(animationClass);

							if (once) {
								newObserver.unobserve(node);
							}
						} else if (!once) {
							node.classList.remove(animationClass);
						}
					});
				},
				{
					threshold,
					root,
					rootMargin
				}
			);

			newObserver.observe(node);
		}
	};
}

/**
 * Svelte action for staggered animations of child elements
 */
export function staggerChildren(node: HTMLElement, params: StaggerParams = {}): ActionReturn {
	const {
		selector = '*',
		staggerTime = 100,
		threshold = 0.1,
		root = null,
		rootMargin = '0px',
		animationClass = 'visible',
		once = true
	} = params;

	// Get all children matching the selector
	const children = Array.from(node.querySelectorAll(selector));

	// Add base animation class to all children
	children.forEach((child, index) => {
		child.classList.add('animate-on-scroll');
		// Add custom delay based on index
		if (child instanceof HTMLElement) {
			child.style.transitionDelay = `${index * staggerTime}ms`;
		}
	});

	// Create the observer
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Stagger the animation of each child
					children.forEach((child, index) => {
						setTimeout(() => {
							child.classList.add(animationClass);
						}, index * staggerTime);
					});

					// If once is true, unobserve after animation
					if (once) {
						observer.unobserve(node);
					}
				} else if (!once) {
					// Remove class when element leaves viewport (if not once)
					children.forEach((child) => {
						child.classList.remove(animationClass);
					});
				}
			});
		},
		{
			threshold,
			root,
			rootMargin
		}
	);

	// Start observing
	observer.observe(node);

	return {
		// Clean up when the element is removed
		destroy() {
			if (observer) {
				observer.disconnect();
			}
		}
	};
}
