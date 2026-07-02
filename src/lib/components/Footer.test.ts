import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Footer from './Footer.svelte';

describe('Footer', () => {
	it('shows the current year in the copyright line', () => {
		render(Footer);
		expect(screen.getByText(`© ${new Date().getFullYear()} Lucas Spain`)).toBeInTheDocument();
	});

	it('links to GitHub, LinkedIn, and email', () => {
		render(Footer);

		expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
			'href',
			'https://github.com/lucasspain13'
		);
		expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
			'href',
			'https://www.linkedin.com/in/lucas-spain-24189715a'
		);
		expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
			'href',
			'mailto:lnsjds@gmail.com'
		);
	});
});
