import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				display: ['"Fraunces Variable"', 'Georgia', 'serif'],
				mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
			}
		}
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#BC3F1B',
					'primary-content': '#F5F3EE',
					secondary: '#1C1914',
					'secondary-content': '#F5F3EE',
					accent: '#BC3F1B',
					'accent-content': '#F5F3EE',
					neutral: '#1C1914',
					'neutral-content': '#F5F3EE',
					'base-100': '#F5F3EE',
					'base-200': '#ECE9E1',
					'base-300': '#D6D2C6',
					'base-content': '#1C1914',
					info: '#3C5A78',
					success: '#3E6B4A',
					warning: '#A66B1F',
					error: '#A93226'
				},
				dark: {
					primary: '#E2603A',
					'primary-content': '#161411',
					secondary: '#EBE7DD',
					'secondary-content': '#161411',
					accent: '#E2603A',
					'accent-content': '#161411',
					neutral: '#EBE7DD',
					'neutral-content': '#161411',
					'base-100': '#161411',
					'base-200': '#1E1B17',
					'base-300': '#3A362E',
					'base-content': '#EBE7DD',
					info: '#7FA3C4',
					success: '#7FAE8C',
					warning: '#CE9A50',
					error: '#D3705F'
				}
			}
		],
		darkTheme: 'dark',
		logs: false
	}
};
