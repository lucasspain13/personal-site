/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			},
			colors: {
				primary: {
					blue: '#0077B6',
					yellow: '#FFD166',
					light: '#EDF2F7',
					dark: '#1A202C'
				},
				accent: {
					blue: {
						light: '#90E0EF',
						DEFAULT: '#00B4D8',
						dark: '#0077B6'
					},
					yellow: {
						light: '#FFF7AE',
						DEFAULT: '#FFD166',
						dark: '#EEB902'
					}
				},
				neutral: {
					50: '#F7FAFC',
					100: '#EDF2F7',
					200: '#E2E8F0',
					300: '#CBD5E0',
					400: '#A0AEC0',
					500: '#718096',
					600: '#4A5568',
					700: '#2D3748',
					800: '#1A202C',
					900: '#171923'
				}
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.5s ease-in-out',
				'slide-down': 'slideDown 0.5s ease-in-out',
				'slide-left': 'slideLeft 0.5s ease-in-out',
				'slide-right': 'slideRight 0.5s ease-in-out',
				'bounce-light': 'bounce 1.5s infinite ease-in-out',
				'pulse-slow': 'pulse 3s infinite cubic-bezier(0.4, 0, 0.6, 1)',
				'spin-slow': 'spin 3s linear infinite',
				typing: 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				slideDown: {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				slideLeft: {
					'0%': { transform: 'translateX(20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				slideRight: {
					'0%': { transform: 'translateX(-20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				typing: {
					from: { width: '0' },
					to: { width: '100%' }
				},
				'blink-caret': {
					'from, to': { borderColor: 'transparent' },
					'50%': { borderColor: 'currentColor' }
				}
			},
			transitionProperty: {
				height: 'height',
				spacing: 'margin, padding',
				width: 'width',
				position: 'top, right, bottom, left'
			},
			transitionTimingFunction: {
				bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
			}
		}
	},
	plugins: [require('daisyui')],
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
			},
			'dark',
			'nord'
		],
		darkTheme: 'dark'
	}
};
