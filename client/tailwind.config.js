// tailwind.config.js
import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
	theme: {
		extend: {
			colors: {

			},
		}
	},
	plugins: [animate],
}