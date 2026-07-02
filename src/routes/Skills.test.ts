import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Skills from './Skills.svelte';

describe('Skills', () => {
	it('shows the AI & Machine Learning category by default', () => {
		render(Skills);

		expect(screen.getByRole('heading', { name: 'AI & Machine Learning' })).toBeInTheDocument();
		expect(screen.getByText('LangGraph')).toBeInTheDocument();
	});

	it('switches categories when one is selected', async () => {
		const user = userEvent.setup();
		render(Skills);

		await user.click(screen.getByRole('button', { name: /Frontend Development/ }));

		expect(screen.getByRole('heading', { name: 'Frontend Development' })).toBeInTheDocument();
		expect(screen.getByText('SvelteKit')).toBeInTheDocument();
		expect(screen.queryByText('LangGraph')).not.toBeInTheDocument();
	});
});
