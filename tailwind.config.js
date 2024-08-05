/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        col2: '310px',
        col3: '540px',
        lg: '960px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
