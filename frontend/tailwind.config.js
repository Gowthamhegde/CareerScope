/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Neon Dystopia palette
        bg:      '#050508',
        surface: '#0f0f1a',
        cyan:    '#00ffe0',
        magenta: '#ff2d6b',
        ink:     '#e8e8f0',
        // Extended shades
        'cyan-dim':    'rgba(0,255,224,0.15)',
        'magenta-dim': 'rgba(255,45,107,0.15)',
        'surface-2':   '#161625',
        'surface-3':   '#1e1e30',
        'muted':       '#6b6b8a',
        'muted-2':     '#9898b8',
      },
      fontFamily: {
        heading: ['Syne', 'system-ui', 'sans-serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'aurora':    'aurora 14s ease-in-out infinite alternate',
        'float':     'float 6s ease-in-out infinite',
        'float-slow':'float 9s ease-in-out infinite',
        'marquee':   'marquee 28s linear infinite',
        'marquee-r': 'marqueeR 28s linear infinite',
        'pulse-c':   'pulseCyan 3s ease-in-out infinite',
        'pulse-m':   'pulseMagenta 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'shimmer':   'shimmer 2.2s linear infinite',
        'fade-up':   'fadeUp 0.7s ease-out forwards',
        'glow-border':'glowBorder 2s ease-in-out infinite alternate',
      },
      keyframes: {
        aurora: {
          '0%':   { backgroundPosition: '0% 50%', opacity: '0.7' },
          '50%':  { backgroundPosition: '100% 50%', opacity: '1' },
          '100%': { backgroundPosition: '0% 50%', opacity: '0.8' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-16px)' },
        },
        marquee:  { '0%': { transform: 'translateX(0)' },    '100%': { transform: 'translateX(-50%)' } },
        marqueeR: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
        pulseCyan: {
          '0%,100%': { boxShadow: '0 0 20px rgba(0,255,224,0.2)' },
          '50%':     { boxShadow: '0 0 60px rgba(0,255,224,0.6), 0 0 100px rgba(0,255,224,0.2)' },
        },
        pulseMagenta: {
          '0%,100%': { boxShadow: '0 0 20px rgba(255,45,107,0.2)' },
          '50%':     { boxShadow: '0 0 60px rgba(255,45,107,0.6), 0 0 100px rgba(255,45,107,0.2)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowBorder: {
          '0%':   { borderColor: 'rgba(0,255,224,0.2)' },
          '100%': { borderColor: 'rgba(0,255,224,0.7)' },
        },
      },
      boxShadow: {
        'cyan':    '0 0 30px rgba(0,255,224,0.4), 0 0 80px rgba(0,255,224,0.15)',
        'magenta': '0 0 30px rgba(255,45,107,0.4), 0 0 80px rgba(255,45,107,0.15)',
        'card':    '0 4px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
        'card-hover': '0 12px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,255,224,0.2)',
      },
    },
  },
  plugins: [],
}
