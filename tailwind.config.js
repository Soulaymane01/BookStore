/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        'book': '3/4',
      },
      fontFamily: {
        'noto': ['Noto Sans', 'sans-serif'],
        'noto-arabic': ['Noto Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};