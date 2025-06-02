/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      olors: {
        ut: {
          white: '#FFF',
          pink: '#FF48AB',
          black: '#1C1C1C',
          insertBlue: '#007CFF',
          green: '#7ECE40',
          warningRed: '#E33434',
          correctGreen: '#24B984',
        },
      },
    },
  },
  plugins: [],
};
