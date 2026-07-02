import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import ThemeToggle from './ThemeToggle.svelte';

describe('ThemeToggle', () => {
	beforeEach(() => {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.clear();
	});

	it('renders a labelled toggle button', () => {
		render(ThemeToggle);
		expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument();
	});

	it('switches to dark and persists the choice', async () => {
		const user = userEvent.setup();
		render(ThemeToggle);

		await user.click(screen.getByRole('button', { name: 'Toggle theme' }));

		expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
		expect(localStorage.getItem('theme')).toBe('dark');
	});

	it('switches back to light on a second click', async () => {
		const user = userEvent.setup();
		render(ThemeToggle);

		const button = screen.getByRole('button', { name: 'Toggle theme' });
		await user.click(button);
		await user.click(button);

		expect(document.documentElement.getAttribute('data-theme')).toBe('light');
		expect(localStorage.getItem('theme')).toBe('light');
	});
});
