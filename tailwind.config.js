/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#102A43',
          900: '#0B192C',
          950: '#060D17',
        },
        slate: {
          850: '#151f32',
          950: '#070b13',
        },
        accent: {
          blue: '#2563EB',
          teal: '#0D9488',
          cyan: '#06B6D4',
          amber: '#F59E0B',
          emerald: '#10B981',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'soft-sm': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
        'soft-lg': '0 10px 30px -4px rgba(15, 23, 42, 0.1)',
        'glow-blue': '0 0 25px -5px rgba(37, 99, 235, 0.25)',
        'glow-teal': '0 0 25px -5px rgba(13, 148, 136, 0.25)',
      }
    },
  },
  plugins: [],
}

