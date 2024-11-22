/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        width: '3px',
        track: 'bg-gray-200',
        thumb: 'bg-gray-500',
        rounded: 'rounded-full'
      },
      colors: {
        blue: {
          900: '#10197a',
          800: '#1a2793',
          700: '#2a3887',
          600: '#3d53db',
          500: '#546fff',
          400: '#9f84fd',
          300: '#9f84fd',
          200: '#bac8ff',
          100: '#ffffff'
        },
        green: {
          900: '#3b6506',
          800: '#4c7adb',
          700: '#659711',
          600: '#7fb519',
          500: '#9cd323',
          400: '#bce455',
          300: '#d3f178',
          200: '#e8faa6',
          100: '#f5fcd2'
        },
        error: {
          900: '#7a0619',
          800: '#930b16',
          700: '#b71112',
          600: '#db2719',
          500: '#ff4423',
          400: '#ff7f59',
          300: '#ffa37a',
          200: '#ffcba6',
          100: '#ffe7d3'
        },
        warning: {
          900: '#7a4d0b',
          800: '#936312',
          700: '#b7821d',
          600: '#dba32a',
          500: '#ffc73a',
          400: '#ffd96b',
          300: '#ffe488',
          200: '#ffefb0',
          100: '#fff8d7'
        },
        info: {
          900: '#102e7a',
          800: '#1a4393',
          700: '#2a60b7',
          600: '#3d81db',
          500: '#54a6ff',
          400: '#7ec2ff',
          300: '#98d3ff',
          200: '#bae5ff',
          100: '#dcf3ff'
        },
        black: {
          DEFAULT: '#000',
          900: '#040815',
          800: '#060713',
          700: '#0a0a18',
          600: '#0e0f1d',
          500: '#141522',
          400: '#54577a',
          300: '#8e92bc',
          200: '#c2c6e8',
          100: '#dfe1f3'
        }
      },
      fontFamily: {
        pregular: ["Plus Jakarta Sans", "sans-serif"],
        pmedium: ["Plus Jakarta Sans", "sans-serif"],
        psemibold: ["Plus Jakarta Sans", "sans-serif"],
        pbold: ["Plus Jakarta Sans", "sans-serif"],
      }
    },
    fontFamily: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  plugins: [
    // require('tailwind-scrollbar'),
    // require('tailwind-scrollbar-hide')
  ],
}

