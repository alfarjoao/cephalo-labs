/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        black: '#0A0A0A',
        white: '#FFFFFF',
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E8E8E8',
          300: '#D0D0D0',
          400: '#A0A0A0',
          500: '#707070',
          600: '#505050',
          700: '#303030',
          800: '#1A1A1A',
          900: '#0F0F0F',
        },
      },
      letterSpacing: {
        widest: '0.2em',
        wider: '0.12em',
      },
    },
  },
  plugins: [],
}
