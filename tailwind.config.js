const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // important: true,
  darkMode: 'media',
  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontFamily: {
        sans: ['Lota Grotesque', ...defaultTheme.fontFamily.sans],
        serif: ['Sharp Grotesk', ...defaultTheme.fontFamily.serif],
      },
      width: {
        10: '2.5rem',
        134: '33.5rem',
      },
      height: {
        9.5: '2.375rem',
        10: '2.5rem',
        11.5: '2.875rem',
        14.5: '3.625rem',
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
      },
      colors: {
        primary: {
          50: '#DBFFF5',
          100: '#A3FFE6',
          200: '#7AFFD8',
          300: '#52FFCF',
          400: '#29FFC4',
          500: '#00FFB9',
          600: '#00D69B',
          700: '#00AD7E',
          800: '#008460',
          900: '#005C43',
        },
        secondary: {
          50: '#FFF2EF',
          100: '#FFE5DE',
          200: '#FFCBBE',
          300: '#FFB09D',
          400: '#FF967D',
          500: '#FF7C5C',
          600: '#DE674A',
          700: '#BE5237',
          800: '#7D2712',
          900: '#5C1200',
        },
        tertiary: {
          50: '#F3F7FF',
          100: '#E5EDFF',
          200: '#CDDBFE',
          300: '#B4C6FC',
          400: '#8DA2FB',
          500: '#6875F5',
          600: '#5850EC',
          700: '#5145CD',
          800: '#42389D',
          900: '#362F78',
        },
        'accent-yellow': {
          50: '#FFFFF5',
          100: '#FFFFE4',
          200: '#FFFED9',
          300: '#FFFEC5',
          400: '#FFFDB2',
          500: '#FFFD9F',
          600: '#E3E17F',
          700: '#C8C65F',
          800: '#ADAB40',
          900: '#918F20',
        },
        'accent-blue': {
          50: '#EBECF6',
          100: '#D7DAEC',
          200: '#B0B4D4',
          300: '#888FC7',
          400: '#6169B5',
          500: '#3944A2',
          600: '#2E3681',
          700: '#222961',
          800: '#171B41',
          900: '#0B0E20',
        },
        teal: {
          50: '#EDFAFA',
          100: '#CCF2F8',
          200: '#99E5F1',
          300: '#66D8EA',
          400: '#33CBE3',
          500: '#00BEDC',
          600: '#0098B0',
          700: '#007284',
          800: '#004c58',
          900: '#00262C',
        },
        pink: {
          50: '#FEEFF6',
          100: '#FDDFED',
          200: '#FBBFDC',
          300: '#FA9ECA',
          400: '#F87EB9',
          500: '#F65EA&',
          600: '#DF4D93',
          700: '#C73B7F',
          800: '#B02A6A',
          900: '#981856',
        },
        success: {
          50: '#E5FBF5',
          100: '#CCF7EC',
          200: '#99EFD9',
          300: '#66E7C6',
          400: '#33DFB3',
          500: '#00D7A0',
          600: '#00AC80',
          700: '#008160',
          800: '#005640',
          900: '#002B20',
        },
        danger: {
          50: '#FFEFEF',
          100: '#FFE0E0',
          200: '#FFC1C1',
          300: '#FFA2A2',
          400: '#FF8383',
          500: '#FF6464',
          600: '#EA5050',
          700: '#D53C3C',
          800: '#C02828',
          900: '#AC1414',
        },
      },
      backgroundImage: {
        gradient1: 'linear-gradient(106.74deg, #00FFB9 0%, #40F2FD 100%)',
        gradient2: 'linear-gradient(104.04deg, #FFCE59 -10.15%, #F65EA7 112.52%)',
        gradient3: 'linear-gradient(101.5deg, #6875F5 0%, #985EF6 100%)',
        gradient4: 'linear-gradient(305.46deg, #5CAFE5 11.29%, #63D892 94.29%)',
        gradient5: 'linear-gradient(210deg, #E1ADFA 13.4%, #FCB4B4 86.6%)',
        gradient6: 'linear-gradient(90deg, #9796F0 0%, #FBC7D4 100%)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
