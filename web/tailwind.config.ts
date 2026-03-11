import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#F7F7F7',
        foreground: '#000',
        primary: '#006D77',
        accent: '#FF6F61',
        card: '#FFFFFF',
        muted: '#E5E5E5',
        border: '#D1D1D1',
        success: '#4CAF50',
        warning: '#FFA726',
      },
      borderRadius: {
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;