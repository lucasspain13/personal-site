import { render, screen, within } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Header from './Header.svelte';

const sections = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

describe('Header', () => {
	it('links the brand to the hero section', () => {
		render(Header);
		// The brand renders "Lucas&nbsp;Spain"; \s matches the non-breaking space.
		expect(screen.getByRole('link', { name: /Lucas\sSpain/ })).toHaveAttribute('href', '#hero');
	});

	it('renders a nav link for every section', () => {
		render(Header);
		for (const section of sections) {
			expect(screen.getByRole('link', { name: section })).toHaveAttribute(
				'href',
				`#${section.toLowerCase()}`
			);
		}
	});

	it('opens and closes the mobile menu', async () => {
		const user = userEvent.setup();
		render(Header);

		const toggle = screen.getByRole('button', { name: 'Toggle navigation menu' });
		expect(toggle).toHaveAttribute('aria-expanded', 'false');
		expect(screen.queryByRole('list')).not.toBeInTheDocument();

		await user.click(toggle);
		expect(toggle).toHaveAttribute('aria-expanded', 'true');
		const menu = screen.getByRole('list');
		for (const section of sections) {
			expect(within(menu).getByRole('link', { name: section })).toBeInTheDocument();
		}

		await user.click(within(menu).getByRole('link', { name: 'About' }));
		expect(screen.queryByRole('list')).not.toBeInTheDocument();
	});

	it('closes the mobile menu when clicking outside it', async () => {
		const user = userEvent.setup();
		render(Header);

		await user.click(screen.getByRole('button', { name: 'Toggle navigation menu' }));
		expect(screen.getByRole('list')).toBeInTheDocument();

		await user.click(document.body);
		expect(screen.queryByRole('list')).not.toBeInTheDocument();
	});
});
