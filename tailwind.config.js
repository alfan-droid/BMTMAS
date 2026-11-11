/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Amiri"', 'Georgia', 'serif'],
      },
      colors: {
        bsi: {
          teal: '#00A39D',
          'teal-dark': '#008580',
          'teal-deep': '#004D4A',
          'teal-deeper': '#003533',
          'teal-light': '#E6F6F5',
          gold: '#F59E0B',
          'gold-hover': '#D97706',
          'gold-light': '#FEF3C7',
        },
        emerald: {
          50: '#F0FDF9',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#00A39D',
          700: '#008580',
          800: '#065F46',
          900: '#004D4A',
          950: '#003533',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(15, 23, 42, 0.06), 0 1px 3px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 12px 28px -6px rgba(0, 77, 74, 0.12), 0 4px 10px -3px rgba(15, 23, 42, 0.05)',
        'dock': '0 16px 36px -8px rgba(0, 53, 51, 0.14), 0 4px 12px -2px rgba(15, 23, 42, 0.06)',
      },
      letterSpacing: {
        tighter: '-0.035em',
        tight: '-0.02em',
      },
    },
  },
  plugins: [],
}
