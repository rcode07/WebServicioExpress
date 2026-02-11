/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0047AB',
        secondary: '#FFD700',
        'deep-blue': '#003366',
        'background-light': '#F8FAFC',
        'background-dark': '#0F172A',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        logo: ['Orbitron', 'sans-serif'],
        public: ['Public Sans', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}