import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Montserrat', 'Inter', 'Arial', 'sans-serif']
      },
      colors: {
        ink: '#202327',
        graphite: '#2D2F34',
        muted: '#7B7F86',
        line: '#E6E1DA',
        ivory: '#F7F4EF',
        champagne: '#D9A45F',
        bronze: '#A87542'
      },
      boxShadow: {
        soft: '0 24px 80px rgba(24, 28, 32, 0.10)',
        card: '0 14px 34px rgba(24, 28, 32, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
