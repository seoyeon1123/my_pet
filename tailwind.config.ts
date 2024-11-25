import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        darkPink: 'var(--darkPink)',
        lightPink: 'var(--lightPink)',
        lightPinkbg: 'var(--lightPinkbg)',
      },
      fontFamily: {
        hakgyo: ["'HakgyoansimPuzzleTTF-Outline'", 'sans-serif'],
      },
      screens: {
        xs: { max: '479px' }, // 모바일 세로 (최대 479px)
        sm: { min: '480px', max: '767px' }, // 모바일 가로 및 태블릿 세로 (480px ~ 767px)
        md: { min: '768px', max: '1023px' }, // 태블릿 가로 (768px ~ 1023px)
        lg: { min: '1024px', max: '1279px' },
        xl: { min: '1280px' },
      },
    },
  },
  plugins: [],
};
export default config;
