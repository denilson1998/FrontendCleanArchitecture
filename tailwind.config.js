/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'jichi-black' : '#050B1Eff',
        'jichi-grey' : '#61709D',
        'jichi-light-grey': '#98B0CCff',
        'jichi-blue': '#7E9CFFff',
        'jichi-green': '#1187A0',
        'jichi-red': '#D23A4Cff',
        'jichi-orange': '#EB820Aff',
        'jichi-main-blue': '#0F0742ff',
        'jichi-blue-secondary': '#1187A0ff',
        'jichi-black-secondary': '#090429ff',

        'jichi-primary-dark-blue': '#0F0742',
        'jichi-primary-light-blue': '#3ED9E4',
        'jichi-primary-green': '#2AD9C2',
        
        'jichi-text-black': '#090429',
        'jichi-text-blue': '#1187A0',
        'jichi-text-bright-blue': '#009DC5',
        'jichi-text-green': '#13847D',
        'jichi-text-red': '#D23A4C',

        'jichi-accent-grey-blue': '#6F6A8E',
        'jichi-accent-dark-blue': '#0B3069',
        'jichi-accent-blue': '#00C2DC',
        'jichi-accent-light-blue': '#99F8FF',
        'jichi-accent-light': '#C8F9FC',
        'jichi-accent-light-green': '#A9EDE4',


        'jichi-grayscale-dark-gray': '#61709D',
        'jichi-grayscale-gray': '#98B0CC',
        'jichi-grayscale-medium-gray': '#D4E3F3',
        'jichi-grayscale-light-gray': '#F1F7FD',
        'jichi-grayscale-white': '#FAFDFD',

        'jichi-status-complete': '#13847D',
        'jichi-status-in-progress': '#EB820A',
        'jichi-status-canceled': '#D23A4C'
      }
    },
  },
  plugins: [],
}

