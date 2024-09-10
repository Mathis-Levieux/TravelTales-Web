import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        header: {
          DEFAULT: 'hsl(var(--header))',
        },
        bleutext: {
          DEFAULT: 'hsl(var(--bleutext))',
        },
        jaune: {
          DEFAULT: 'hsl(var(--jaune))',
        },
        marron: {
          DEFAULT: 'hsl(var(--marron))',
        },
        marronfonce: {
          DEFAULT: 'hsl(var(--marron-fonce))',
        },
        bleufooter: {
          DEFAULT: 'hsl(var(--bleufooter))',
        },
        beige: {
          DEFAULT: 'hsl(var(--beige))',
        },
        rougelight: {
          DEFAULT: 'hsl(var(--rougelight))',
        },
        violet: {
          DEFAULT: 'hsl(var(--violet))',
        },
        rose: {
          DEFAULT: 'hsl(var(--rose))',
        },
        grisfonce: {
          DEFAULT: 'hsl(var(--gris-fonce))',
        },
      },
      boxShadow: {
        createtripbutton: '0px 4px 4px 0px #FE705D',
        jointripbutton: '0px 4px 4px 0px #C3A2F8',
        input: 'inset 4px 5px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  safelist: [{
    pattern: /(bg|text|border)-(jaune|marron|marronfonce|bleufooter|beige|rougelight|violet|rose|grisfonce)/,
  }]
} satisfies Config;

export default config;
