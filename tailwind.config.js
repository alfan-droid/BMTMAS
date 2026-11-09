/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Amiri"', 'Georgia', 'serif'],
      },
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F9F4E8',
          200: '#F1E6CE',
        },
        sharia: {
          50: '#ecfdf5',
          100: '#d1fae5',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        }
      },
      boxShadow: {
        'layered': '0 1px 2px rgba(6, 78, 59, 0.04), 0 8px 24px -4px rgba(6, 78, 59, 0.07), 0 20px 40px -12px rgba(217, 119, 6, 0.08)',
        'layered-hover': '0 4px 8px rgba(6, 78, 59, 0.06), 0 16px 36px -6px rgba(6, 78, 59, 0.12), 0 28px 52px -12px rgba(217, 119, 6, 0.16)',
        'gold': '0 10px 30px -5px rgba(245, 158, 11, 0.18), 0 4px 12px -2px rgba(217, 119, 6, 0.09)',
        'emerald-deep': '0 20px 45px -10px rgba(2, 44, 34, 0.35), 0 8px 18px -6px rgba(4, 120, 87, 0.2)',
      }
    },
  },
  plugins: [],
}
