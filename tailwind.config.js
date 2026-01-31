module.exports = {
  darkMode: 'class',
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}", "./_docs/**/*.md"],
  theme: {
    extend: {
      colors: {
        vite: {
          50: '#f3f4ff',
          100: '#e6e8ff',
          200: '#cfd5ff',
          300: '#b8c2ff',
          400: '#a1afff',
          500: '#8a9cff',
          600: '#646cff',
          700: '#4d4fbf',
          800: '#33317f',
          900: '#1a1840'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
}
