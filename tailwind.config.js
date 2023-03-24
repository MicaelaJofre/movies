/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'red': '#FF0000'
      },
      gridTemplateColumns: {
        'movies': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
      animation: {
        scroll: 'scroll 80s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-180px * 16))' },
        },
      },
    },
  },
  plugins: [],
}