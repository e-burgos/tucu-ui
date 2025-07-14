const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '500px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1780px',
      '4xl': '2160px', // only need to control product grid mode in ultra 4k device
    },
    extend: {
      colors: {
        brand: 'rgb(var(--color-brand) / <alpha-value>)',
        body: '#fcfcfc',
        dark: '#0D1321',
        'light-dark': '#171e2e',
        'sidebar-body': '#F8FAFC',
        // Primary colors
        primary: '#3B82F6', // blue-500
        'primary-lighter': '#DBEAFE', // blue-100
        'primary-dark': '#1E40AF', // blue-700
        // Secondary colors
        secondary: '#6B7280', // gray-500
        'secondary-lighter': '#F3F4F6', // gray-100
        'secondary-dark': '#374151', // gray-700
        // Red colors
        red: '#EF4444', // red-500
        'red-lighter': '#FEE2E2', // red-100
        'red-dark': '#DC2626', // red-600
        // Blue colors
        blue: '#3B82F6', // blue-500
        'blue-lighter': '#DBEAFE', // blue-100
        'blue-dark': '#1E40AF', // blue-700
        // Green colors
        green: '#10B981', // emerald-500
        'green-lighter': '#D1FAE5', // emerald-100
        'green-dark': '#059669', // emerald-600
        // Orange colors
        orange: '#F97316', // orange-500
        'orange-lighter': '#FED7AA', // orange-100
        'orange-dark': '#EA580C', // orange-600
      },
      spacing: {
        13: '3.375rem',
      },
      margin: {
        '1/2': '50%',
      },
      padding: {
        full: '100%',
      },
      width: {
        'calc-320': 'calc(100% - 320px)',
        'calc-358': 'calc(100% - 358px)',
        'w-calc-50-minus-10': 'calc(50% - 10px)',
      },
      fontFamily: {
        body: ['Roboto', 'monospace'],
      },
      fontSize: {
        '13px': ['13px', '18px'],
      },
      borderWidth: {
        3: '3px',
      },
      boxShadow: {
        main: '0px 6px 18px rgba(0, 0, 0, 0.04)',
        light: '0px 4px 4px rgba(0, 0, 0, 0.08)',
        large: '0px 8px 16px rgba(17, 24, 39, 0.1)',
        card: '0px 2px 6px rgba(0, 0, 0, 0.06)',
        transaction: '0px 8px 16px rgba(17, 24, 39, 0.06)',
        expand: '0px 0px 50px rgba(17, 24, 39, 0.2)',
        button:
          '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)',
      },
      dropShadow: {
        main: '0px 4px 8px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        blink: 'blink 1.4s infinite both',
        'move-up': 'moveUp 500ms infinite alternate',
        'scale-up': 'scaleUp 500ms infinite alternate',
        'drip-expand': 'expand 500ms ease-in forwards',
        'drip-expand-large': 'expand-large 600ms ease-in forwards',
        'move-up-small': 'moveUpSmall 500ms infinite alternate',
      },
      keyframes: {
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100%': { opacity: 0.2 },
        },
        expand: {
          '0%': {
            opacity: 0,
            transform: 'scale(1)',
          },
          '30%': {
            opacity: 1,
          },
          '80%': {
            opacity: 0.5,
          },
          '100%': {
            transform: 'scale(30)',
            opacity: 0,
          },
        },
        'expand-large': {
          '0%': {
            opacity: 0,
            transform: 'scale(1)',
          },
          '30%': {
            opacity: 1,
          },
          '80%': {
            opacity: 0.5,
          },
          '100%': {
            transform: 'scale(96)',
            opacity: 0,
          },
        },
        moveUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20px)' },
        },
        moveUpSmall: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
    patterns: {
      opacities: {
        100: '1',
        80: '.80',
        60: '.60',
        40: '.40',
        20: '.20',
        10: '.10',
        5: '.05',
      },
      sizes: {
        1: '0.25rem',
        2: '0.5rem',
        4: '1rem',
        6: '1.5rem',
        8: '2rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
      },
    },
    typography: (theme) => ({
      default: {
        css: {
          pre: {
            color: theme('colors.grey.1000'),
            backgroundColor: theme('colors.grey.100'),
          },
          'pre code::before': {
            'padding-left': 'unset',
          },
          'pre code::after': {
            'padding-right': 'unset',
          },
          code: {
            backgroundColor: theme('colors.grey.100'),
            color: theme('colors.red.500'),
            fontWeight: '400',
            'border-radius': '0.25rem',
          },
          'code::before': {
            content: '""',
            'padding-left': '0.25rem',
          },
          'code::after': {
            content: '""',
            'padding-right': '0.25rem',
          },
        },
      },
    }),
  },
};
