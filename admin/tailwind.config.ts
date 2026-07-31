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
        navy: {
          950: '#070C1B',
          900: '#0B132B',
          800: '#1C2541',
          700: '#2A365C',
        },
        cyan: {
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
        }
      }
    },
  },
  plugins: [],
};
export default config;
