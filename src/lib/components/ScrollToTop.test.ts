import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ScrollToTop from './ScrollToTop.svelte';

function setScrollY(value: number) {
	Object.defineProperty(window, 'scrollY', { value, writable: true, configurable: true });
	Object.defineProperty(window, 'pageYOffset', { value, writable: true, configurable: true });
	window.dispatchEvent(new Event('scroll'));
}

describe('ScrollToTop', () => {
	beforeEach(() => {
		setScrollY(0);
	});

	it('is hidden near the top of the page', () => {
		render(ScrollToTop);
		expect(screen.queryByRole('button', { name: 'Scroll to top' })).not.toBeInTheDocument();
	});

	it('appears after scrolling down and scrolls back up on click', async () => {
		const scrollTo = vi.fn();
		vi.stubGlobal('scrollTo', scrollTo);

		render(ScrollToTop);
		setScrollY(500);

		const button = await waitFor(() => screen.getByRole('button', { name: 'Scroll to top' }));

		const user = userEvent.setup();
		await user.click(button);
		expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

		vi.unstubAllGlobals();
	});
});
