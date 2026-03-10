/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // indigo-500
          600: '#4f46e5', // indigo-600
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          500: '#ec4899', // pink-500
          600: '#db2777', // pink-600
        },
        accent: {
          500: '#a855f7', // purple-500
          600: '#9333ea', // purple-600
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #4f46e5, #a855f7, #ec4899)',
        'gradient-primary-hover': 'linear-gradient(to right, #4338ca, #9333ea, #db2777)',
      },
    },
  },
  plugins: [],
}