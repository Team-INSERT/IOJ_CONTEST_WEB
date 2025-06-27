/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ut: {
          white: '#FFF',
          pink: '#FF48AB',
          black: '#1C1C1C',
          insertBlue: '#007CFF',
          green: '#7ECE40',
          warningRed: '#E33434',
          correctGreen: '#24B984',
        },
        gray: {
          100: '#F2F2F2',
          200: '#D9D9D9',
          300: '#CCCCCC',
          400: '#B3B3B3',
          500: '#999999',
          600: '#808080',
          700: '#666666',
          800: '#4D4D4D',
          900: '#333333',
        },
        blue: {
          light: '#E6F2FF',
          lightHover: '#D9EBFF',
          lightActive: '#B0D6FF',
          normal: '#007CFF',
          normalHover: '#0070E6',
          normalActive: '#0063CC',
          dark: '#005DBF',
          darkHover: '#004A99',
          darkActive: '#003873',
          darker: '#002B59',
        },
        ct: {
          blue: '#6B71FF',
          pink: '#FF6AC3',
          red: '#FF6B6B',
          purple: '#C449EE',
          neon: '#65EE83',
          orange: '#FF984D',
          skyblue: '#5CE2FF',
        },
      },
      fontFamily: {
        pBold: ["'Pretendard-Bold'", 'sans-serif'],
        pSemibold: ["'Pretendard-SemiBold'", 'sans-serif'],
        pRegular: ["'Pretendard-Regular'", 'sans-serif'],
        nGothic: ["'NEXON-Football-Gothic'", 'sans-serif'],
      },
      fontSize: {
        bt3: ['73px'],
        bt2: ['59px'],
        bt1: ['47px'],
        title: ['38px'],
        st: ['30px'],
        bt: ['24px'],
        text: ['19px'],
        stext: ['15px'],
        caption: ['12px'],
        Nbt3: ['72px'],
        Nbt2: ['58px'],
        Nbt1: ['46px'],
        Nbt: ['24px'],
        Nt: ['37px'],
        Nst: ['37px'],
        Nbtext: ['37px'],
        Ntext: ['19px'],
        Nstext: ['15px'],
        Ncaption: ['12px'],
      },
      boxShadow: {
        defaultShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.border-r-8-transparent': {
          borderRight: '8px solid transparent',
        },
      });
    },
  ],
  mode: 'jit',
};
