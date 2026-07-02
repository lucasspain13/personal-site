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

/** Adds `animationClass` to `node` when it scrolls into view. */
export function animateOnScroll(
	node: HTMLElement,
	params: AnimateParams = {}
): ActionReturn<AnimateParams> {
	let observer: IntersectionObserver;

	function observe(currentParams: AnimateParams) {
		const {
			threshold = 0.1,
			root = null,
			rootMargin = '0px',
			animationClass = 'visible',
			once = true
		} = currentParams;

		observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						node.classList.add(animationClass);
						if (once) observer.unobserve(node);
					} else if (!once) {
						node.classList.remove(animationClass);
					}
				}
			},
			{ threshold, root, rootMargin }
		);
		observer.observe(node);
	}

	node.classList.add('animate-on-scroll');
	observe(params);

	return {
		update(newParams: AnimateParams = {}) {
			observer.disconnect();
			observe(newParams);
		},
		destroy() {
			observer.disconnect();
		}
	};
}

/** Staggers `animationClass` across children matching `selector` when `node` scrolls into view. */
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

	const children = Array.from(node.querySelectorAll(selector));
	children.forEach((child, index) => {
		child.classList.add('animate-on-scroll');
		if (child instanceof HTMLElement) {
			child.style.transitionDelay = `${index * staggerTime}ms`;
		}
	});

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					children.forEach((child, index) => {
						setTimeout(() => child.classList.add(animationClass), index * staggerTime);
					});
					if (once) observer.unobserve(node);
				} else if (!once) {
					children.forEach((child) => child.classList.remove(animationClass));
				}
			}
		},
		{ threshold, root, rootMargin }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
