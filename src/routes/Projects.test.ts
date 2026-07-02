import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Projects from './Projects.svelte';

describe('Projects', () => {
	it('shows every project under the default All filter', () => {
		render(Projects);

		expect(screen.getByRole('heading', { name: /Pride in Motion/ })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /Joe, the AI Avatar/ })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /Scarf Pattern Generator/ })).toBeInTheDocument();
	});

	it('renders a filter tab per category plus All', () => {
		render(Projects);

		for (const category of ['All', 'Web Development', 'AI', 'Other', 'Security', 'DevOps']) {
			expect(screen.getByTestId(`filter-${category}`)).toBeInTheDocument();
		}
	});

	it('filters both personal and work projects by category', async () => {
		const user = userEvent.setup();
		render(Projects);

		await user.click(screen.getByTestId('filter-AI'));

		expect(screen.getByRole('heading', { name: /Gatsby: Local Voice Assistant/ })).toBeVisible();
		expect(screen.getByRole('heading', { name: /Dealer Assistant/ })).toBeVisible();
		expect(screen.queryByRole('heading', { name: /Pride in Motion/ })).not.toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: /CSRF Protection/ })).not.toBeInTheDocument();
	});

	it('hides the work section when no work project matches the filter', async () => {
		const user = userEvent.setup();
		render(Projects);
		expect(screen.getByRole('heading', { name: 'From My Day Job' })).toBeInTheDocument();

		await user.click(screen.getByTestId('filter-Other'));

		expect(screen.queryByRole('heading', { name: 'From My Day Job' })).not.toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /Scarf Pattern Generator/ })).toBeInTheDocument();
	});

	it('only links repositories that are public', () => {
		render(Projects);

		const codeLinks = screen.getAllByRole('link', { name: /view code/i });
		for (const link of codeLinks) {
			expect(link.getAttribute('href')).toMatch(/^https:\/\/github\.com\/lucasspain13\//);
		}
		// Private repos (e.g. Gatsby) must not expose a code link.
		expect(codeLinks.map((link) => link.getAttribute('href'))).not.toContain(
			'https://github.com/lucasspain13/gatsby'
		);
	});
});
