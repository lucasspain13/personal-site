import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { animateOnScroll, staggerChildren } from './animate';

class MockIntersectionObserver {
	static instances: MockIntersectionObserver[] = [];

	callback: IntersectionObserverCallback;
	options: IntersectionObserverInit | undefined;
	observed = new Set<Element>();
	disconnected = false;

	constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
		this.callback = callback;
		this.options = options;
		MockIntersectionObserver.instances.push(this);
	}

	observe(element: Element) {
		this.observed.add(element);
	}

	unobserve(element: Element) {
		this.observed.delete(element);
	}

	disconnect() {
		this.disconnected = true;
		this.observed.clear();
	}

	intersect(element: Element, isIntersecting: boolean) {
		this.callback(
			[{ target: element, isIntersecting } as IntersectionObserverEntry],
			this as unknown as IntersectionObserver
		);
	}

	static latest() {
		return MockIntersectionObserver.instances.at(-1)!;
	}
}

beforeEach(() => {
	MockIntersectionObserver.instances = [];
	vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
	vi.unstubAllGlobals();
	vi.useRealTimers();
});

describe('animateOnScroll', () => {
	it('adds the base class and starts observing the node', () => {
		const node = document.createElement('div');
		animateOnScroll(node);

		expect(node.classList.contains('animate-on-scroll')).toBe(true);
		expect(MockIntersectionObserver.latest().observed.has(node)).toBe(true);
	});

	it('adds the animation class when the node enters the viewport', () => {
		const node = document.createElement('div');
		animateOnScroll(node);

		MockIntersectionObserver.latest().intersect(node, true);
		expect(node.classList.contains('visible')).toBe(true);
	});

	it('stops observing after the first intersection by default', () => {
		const node = document.createElement('div');
		animateOnScroll(node);

		const observer = MockIntersectionObserver.latest();
		observer.intersect(node, true);
		expect(observer.observed.has(node)).toBe(false);
	});

	it('removes the animation class on exit when once is false', () => {
		const node = document.createElement('div');
		animateOnScroll(node, { once: false });

		const observer = MockIntersectionObserver.latest();
		observer.intersect(node, true);
		expect(node.classList.contains('visible')).toBe(true);

		observer.intersect(node, false);
		expect(node.classList.contains('visible')).toBe(false);
	});

	it('respects a custom animation class', () => {
		const node = document.createElement('div');
		animateOnScroll(node, { animationClass: 'fancy' });

		MockIntersectionObserver.latest().intersect(node, true);
		expect(node.classList.contains('fancy')).toBe(true);
	});

	it('replaces the observer on update and disconnects the old one', () => {
		const node = document.createElement('div');
		const action = animateOnScroll(node);
		const first = MockIntersectionObserver.latest();

		action.update?.({ animationClass: 'updated' });
		expect(first.disconnected).toBe(true);

		const second = MockIntersectionObserver.latest();
		expect(second).not.toBe(first);
		second.intersect(node, true);
		expect(node.classList.contains('updated')).toBe(true);
	});

	it('disconnects on destroy', () => {
		const node = document.createElement('div');
		const action = animateOnScroll(node);

		action.destroy?.();
		expect(MockIntersectionObserver.latest().disconnected).toBe(true);
	});
});

describe('staggerChildren', () => {
	function buildList(count: number) {
		const node = document.createElement('ul');
		for (let i = 0; i < count; i++) {
			const child = document.createElement('li');
			child.className = 'item';
			node.append(child);
		}
		return { node, children: Array.from(node.children) as HTMLElement[] };
	}

	it('prepares matching children with the base class and staggered delays', () => {
		const { node, children } = buildList(3);
		staggerChildren(node, { selector: '.item', staggerTime: 50 });

		children.forEach((child, index) => {
			expect(child.classList.contains('animate-on-scroll')).toBe(true);
			expect(child.style.transitionDelay).toBe(`${index * 50}ms`);
		});
	});

	it('staggers the animation class across children on intersection', () => {
		vi.useFakeTimers();
		const { node, children } = buildList(3);
		staggerChildren(node, { selector: '.item', staggerTime: 100 });

		MockIntersectionObserver.latest().intersect(node, true);

		vi.advanceTimersByTime(0);
		expect(children[0].classList.contains('visible')).toBe(true);
		expect(children[1].classList.contains('visible')).toBe(false);

		vi.advanceTimersByTime(100);
		expect(children[1].classList.contains('visible')).toBe(true);
		expect(children[2].classList.contains('visible')).toBe(false);

		vi.advanceTimersByTime(100);
		expect(children[2].classList.contains('visible')).toBe(true);
	});

	it('removes the animation class from children on exit when once is false', () => {
		vi.useFakeTimers();
		const { node, children } = buildList(2);
		staggerChildren(node, { selector: '.item', staggerTime: 10, once: false });

		const observer = MockIntersectionObserver.latest();
		observer.intersect(node, true);
		vi.runAllTimers();
		expect(children.every((child) => child.classList.contains('visible'))).toBe(true);

		observer.intersect(node, false);
		expect(children.some((child) => child.classList.contains('visible'))).toBe(false);
	});

	it('disconnects on destroy', () => {
		const { node } = buildList(1);
		const action = staggerChildren(node, { selector: '.item' });

		action.destroy?.();
		expect(MockIntersectionObserver.latest().disconnected).toBe(true);
	});
});
