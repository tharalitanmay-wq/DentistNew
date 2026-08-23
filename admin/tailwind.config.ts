import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f5f8f4',
          100: '#e6ede3',
          200: '#cfdccb',
          300: '#b0c5aa',
          400: '#86a57d',
          500: '#6c8e63',
          600: '#54734b',
          700: '#425a3a',
          800: '#2d3f27',
          900: '#1a2717',
          950: '#0e170c',
        },
        navy: {
          950: '#0e170c',
          900: '#152213',
          800: '#1f331c',
          700: '#2d4a29',
        },
        cyan: {
          400: '#86a57d',
          500: '#6c8e63',
          600: '#54734b',
        }
      }
    },
  },
  plugins: [],
};
export default config;
