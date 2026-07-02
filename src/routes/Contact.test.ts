import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Contact from './Contact.svelte';

const validEntries = {
	Name: 'Ada Lovelace',
	Email: 'ada@example.com',
	Subject: 'Hello',
	Message: 'This message is long enough.'
};

async function fillForm(overrides: Partial<typeof validEntries> = {}) {
	const user = userEvent.setup();
	const entries = { ...validEntries, ...overrides };
	for (const [label, value] of Object.entries(entries)) {
		if (value) await user.type(screen.getByLabelText(new RegExp(`^${label}`)), value);
	}
	return user;
}

describe('Contact', () => {
	it('disables the submit button until the form is valid', async () => {
		render(Contact);

		const submit = screen.getByRole('button', { name: /send message/i });
		expect(submit).toBeDisabled();

		await fillForm();
		expect(submit).toBeEnabled();
	});

	it('flags an invalid email address', async () => {
		render(Contact);

		await fillForm({ Email: 'not-an-email' });

		expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled();
	});

	it('requires a message of at least 10 characters', async () => {
		render(Contact);

		await fillForm({ Message: 'too short' });

		expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled();
	});

	it('posts to FormSubmit with the anti-spam fields in place', () => {
		const { container } = render(Contact);

		const form = container.querySelector('form');
		expect(form).toHaveAttribute('action', 'https://formsubmit.co/lnsjds@gmail.com');
		expect(form).toHaveAttribute('method', 'POST');
		expect(container.querySelector('input[name="_captcha"]')).toHaveValue('true');
		expect(container.querySelector('input[name="_honey"]')).toBeInTheDocument();
	});

	it('lists the direct contact channels', () => {
		render(Contact);

		expect(screen.getByRole('link', { name: 'lnsjds@gmail.com' })).toHaveAttribute(
			'href',
			'mailto:lnsjds@gmail.com'
		);
		expect(screen.getByRole('link', { name: '(563) 639-4482' })).toHaveAttribute(
			'href',
			'tel:5636394482'
		);
	});
});
