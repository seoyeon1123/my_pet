import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'jumping-text': 'jumping 0.7s ease-out ',
        firstJump: 'firstJump 1s ease-in-out infinite',
        lastJump: 'lastJump 1s ease-in-out infinite',
      },
      keyframes: {
        jumping: {
          '0%': {
            transform: 'translateY(0)', // 처음 상태
          },
          '50%': {
            transform: 'translateY(-15px)', // 점프 효과 (위로)
          },
          '100%': {
            transform: 'translateY(0)', // 원위치
          },
        },
        firstJump: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        lastJump: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        darkPink: 'var(--darkPink)',
        lightPink: 'var(--lightPink)',
        lightPinkbg: 'var(--lightPinkbg)',
        mediumPink: 'var(--mediumPink)',
      },
      fontFamily: {
        hakgyo: ["'HakgyoansimPuzzleTTF-Outline'", 'sans-serif'],
        TTLaundryGothicB: ['TTLaundryGothicB', 'sans-serif'],
        omyu_pretty: ['omyu_pretty', 'sans-serif'],
        HSSaemaul_Regular: ['HSSaemaul-Regular', 'sans-serif'],
        LotteMartHappy: ['LotteMartHappy', 'sans-serif'],
        Interop: ['Interop', 'sans-serif'],
        SDSamliphopangche_Basic: ['SDSamliphopangche_Basic'],
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
