/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Fraunces', 'serif'],
      },
      colors: {
        ember: {
          50: '#fff7ef',
          100: '#ffe7cf',
          200: '#ffd0a3',
          300: '#ffb36d',
          400: '#ff9136',
          500: '#ff7408',
          600: '#e35d00',
          700: '#bc4703',
          800: '#953808',
          900: '#792f0b',
        },
        soot: '#171310',
        paper: '#f6efe6',
      },
      boxShadow: {
        glow: '0 30px 120px rgba(255, 116, 8, 0.18)',
      },
      backgroundImage: {
        grain:
          'radial-gradient(circle at 1px 1px, rgba(23, 19, 16, 0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
}
