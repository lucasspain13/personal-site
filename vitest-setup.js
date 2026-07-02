import '@testing-library/jest-dom/vitest';

// jsdom does not implement IntersectionObserver; the scroll-reveal actions need it.
if (!window.IntersectionObserver) {
	window.IntersectionObserver = class {
		observe() {}
		unobserve() {}
		disconnect() {}
		takeRecords() {
			return [];
		}
	};
}

// jsdom does not implement matchMedia; components use it for reduced-motion
// and color-scheme checks.
if (!window.matchMedia) {
	window.matchMedia = (query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false
	});
}
