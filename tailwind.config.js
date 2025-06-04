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
      fontSize: {
        bt3: [
          '73px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'Pretendard-Bold',
          },
        ],
        bt2: [
          '59px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'Pretendard-Bold',
          },
        ],
        bt1: [
          '47px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'Pretendard-Bold',
          },
        ],
        bt1: [
          '38px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'Pretendard-Bold',
          },
        ],
        st: [
          '30px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'Pretendard-Bold',
          },
        ],
        bt: [
          '24px',
          {
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
            fontFamily: 'Pretendard-SemiBold',
          },
        ],
        text: [
          '19px',
          {
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            fontFamily: 'Pretendard-Regular',
          },
        ],
        stext: [
          '15px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'Pretendard-Bold',
          },
        ],
        caption: [
          '12px',
          {
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            fontFamily: 'Pretendard-Regular',
          },
        ],
        Nbt3: [
          '72px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'NEXON-Football-Gothic',
          },
        ],
        Nbt2: [
          '58px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'NEXON-Football-Gothic',
          },
        ],
        Nbt1: [
          '46px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'NEXON-Football-Gothic',
          },
        ],
        Nbt: [
          '24px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'NEXON-Football-Gothic',
          },
        ],
        Nt: [
          '37px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'NEXON-Football-Gothic',
          },
        ],
        Nst: [
          '37px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'NEXON-Football-Gothic',
          },
        ],
        Nbtext: [
          '37px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'NEXON-Football-Gothic',
          },
        ],
        Ntext: [
          '19px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'NEXON-Football-Gothic',
          },
        ],
        Nstext: [
          '15px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'NEXON-Football-Gothic',
          },
        ],
        Ncaption: [
          '12px',
          {
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            fontFamily: 'NEXON-Football-Gothic',
          },
        ],
      },
      boxShadow: {
        defaultShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
