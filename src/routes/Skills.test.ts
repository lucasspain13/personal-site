import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Skills from './Skills.svelte';

const categories = [
	'AI & Machine Learning',
	'Frontend Development',
	'Backend Development',
	'DevOps & Cloud',
	'Tools & Practices'
];

describe('Skills', () => {
	it('shows every skill category at once', () => {
		render(Skills);

		for (const category of categories) {
			expect(screen.getByRole('heading', { name: category })).toBeInTheDocument();
		}
	});

	it('lists skills inside their group', () => {
		render(Skills);

		expect(screen.getByText(/LangGraph/)).toBeInTheDocument();
		expect(screen.getByText(/SvelteKit/)).toBeInTheDocument();
		expect(screen.getByText(/Terraform/)).toBeInTheDocument();
		expect(screen.getByText(/semantic-release/)).toBeInTheDocument();
	});
});
