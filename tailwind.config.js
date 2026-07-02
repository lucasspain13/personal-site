import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#0077B6',
					secondary: '#FFD166',
					accent: '#00B4D8',
					neutral: '#EDF2F7',
					'base-100': '#FFFFFF',
					info: '#90E0EF',
					success: '#36D399',
					warning: '#EEB902',
					error: '#F87272'
				},
				dark: {
					primary: '#90E0EF',
					secondary: '#FFD166',
					accent: '#00B4D8',
					neutral: '#1A202C',
					'base-100': '#2D3748',
					info: '#0077B6',
					success: '#36D399',
					warning: '#EEB902',
					error: '#F87272'
				}
			}
		],
		darkTheme: 'dark'
	}
};
