/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'DM Sans', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          50:  '#FAFAFA',
          100: '#F5F5F5',
          200: '#E8E8E8',
          300: '#D0D0D0',
          400: '#A0A0A0',
          500: '#707070',
          600: '#505050',
          700: '#303030',
          800: '#1A1A1A',
          900: '#0F0F0F',
          950: '#0A0A0A',
        },
        purple: {
          DEFAULT: '#C084FC',
          soft: '#A78BFA',
          deep: '#7C3AED',
        },
      },
      letterSpacing: {
        widest: '0.2em',
        wider: '0.12em',
        tightest: '-0.04em',
      },
      animation: {
        'marquee': 'marquee-scroll 40s linear infinite',
        'drift': 'drift 18s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3.2s ease-in-out infinite',
      },
      keyframes: {
        'marquee-scroll': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%':      { transform: 'translate(12px, -8px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 0.4 },
          '50%':      { opacity: 0.9 },
        },
      },
    },
  },
  plugins: [],
}
