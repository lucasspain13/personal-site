import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test.describe('page shell', () => {
	test('has the expected title and meta description', async ({ page }) => {
		await expect(page).toHaveTitle('Lucas Spain | Software Engineer');
		await expect(page.locator('meta[name="description"]')).toHaveAttribute(
			'content',
			/Lucas Spain is a software engineer in the Quad Cities/
		);
	});

	test('renders every section', async ({ page }) => {
		for (const id of [
			'hero',
			'about',
			'highlights',
			'skills',
			'projects',
			'experience',
			'contact'
		]) {
			await expect(page.locator(`section#${id}`)).toBeAttached();
		}
	});

	test('header links target the section anchors', async ({ page }) => {
		const nav = page.locator('header nav');
		for (const name of ['About', 'Skills', 'Projects', 'Experience', 'Contact']) {
			await expect(nav.getByRole('link', { name, exact: true })).toHaveAttribute(
				'href',
				`#${name.toLowerCase()}`
			);
		}
	});
});

test.describe('hero', () => {
	test('introduces Lucas Spain', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lucas Spain');
		await expect(page.locator('#hero h2')).toHaveText(
			'Software engineer specializing in generative AI'
		);
	});

	test('does not link a resume download or mention job seeking', async ({ page }) => {
		await expect(page.locator('a[href*="Resume"], a[download]')).toHaveCount(0);
		await expect(page.getByText(/open to new opportunities/i)).toHaveCount(0);
	});
});

test.describe('theme toggle', () => {
	test('switches the theme and persists it across reloads', async ({ page }) => {
		const html = page.locator('html');
		await expect(html).toHaveAttribute('data-theme', 'light');

		await page.getByRole('button', { name: 'Toggle theme' }).click();
		await expect(html).toHaveAttribute('data-theme', 'dark');

		await page.reload();
		await expect(html).toHaveAttribute('data-theme', 'dark');
	});
});

test.describe('projects', () => {
	test('filters projects by category', async ({ page }) => {
		await page.getByTestId('filter-AI').click();

		await expect(
			page.getByRole('heading', { name: 'Gatsby: Local Voice Assistant' })
		).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Dealer Assistant' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Pride in Motion' })).toHaveCount(0);
	});

	test('hides the work section when nothing matches', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'From My Day Job' })).toBeAttached();

		await page.getByTestId('filter-Other').click();
		await expect(page.getByRole('heading', { name: 'From My Day Job' })).toHaveCount(0);
	});
});

test.describe('contact form', () => {
	test('enables submit only once every field is valid', async ({ page }) => {
		const form = page.locator('#contact form');
		const submit = form.getByRole('button', { name: /send message/i });
		await expect(submit).toBeDisabled();

		await form.getByLabel(/^Name/).fill('Ada Lovelace');
		await form.getByLabel(/^Email/).fill('ada@example.com');
		await form.getByLabel(/^Subject/).fill('Hello');
		await form.getByLabel(/^Message/).fill('This message is long enough.');
		await expect(submit).toBeEnabled();
	});

	test('flags an invalid email address', async ({ page }) => {
		const form = page.locator('#contact form');
		await form.getByLabel(/^Email/).fill('not-an-email');
		await expect(form.getByText('Please enter a valid email address')).toBeVisible();
		await expect(form.getByRole('button', { name: /send message/i })).toBeDisabled();
	});
});

test.describe('scroll to top', () => {
	test('appears after scrolling and returns to the top', async ({ page }) => {
		const button = page.getByRole('button', { name: 'Scroll to top' });
		await expect(button).toHaveCount(0);

		await page.evaluate(() => window.scrollTo(0, 2000));
		await button.click();

		await expect.poll(async () => page.evaluate(() => window.scrollY), { timeout: 5000 }).toBe(0);
	});
});

test.describe('mobile navigation', () => {
	test.use({ viewport: { width: 390, height: 844 } });

	test('opens the menu and navigates to a section', async ({ page }) => {
		const toggle = page.getByRole('button', { name: 'Toggle navigation menu' });
		// Blur after the click: iOS Safari does not focus buttons on tap, so the
		// menu must not depend on :focus-within to become visible.
		await toggle.click();
		await toggle.blur();
		await expect(toggle).toHaveAttribute('aria-expanded', 'true');

		const menu = page.locator('header').getByRole('list');
		await expect(menu).toBeVisible();
		await menu.getByRole('link', { name: 'About', exact: true }).click();
		await expect(toggle).toHaveAttribute('aria-expanded', 'false');
		await expect
			.poll(async () => page.evaluate(() => window.scrollY), { timeout: 5000 })
			.toBeGreaterThan(0);
	});
});
