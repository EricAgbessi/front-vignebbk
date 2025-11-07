/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',   
  content: [
    // ... vos chemins habituels
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'cavas': ['var(--font-cavas)', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

