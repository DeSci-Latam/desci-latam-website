const defaultTheme = require('tailwindcss/defaultTheme');
const { fontFamily } = defaultTheme;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["MerriweatherSans", ...fontFamily.sans],
        heading: ["Merriweather", ...fontFamily.sans],
      },
      height: {
        18: "4.5rem",
      },
      spacing: {
        18: "4.5rem",
      },
      colors: {
      /*   border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))", */
       
   /*      foreground: "hsl(var(--primary))", */
    /*     primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {    
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        lightblue: {
          DEFAULT: "hsl(var(--lightblue))",
          foreground: "hsl(var(--lightblue-foreground))",
        },
        primaryblue: {
          DEFAULT: "hsl(var(--primaryblue))",
        },
        darkblue: {
          DEFAULT: "hsl(var(--darkblue))",
          foreground: "hsl(var(--lightblue-foreground))",
        },
        primarywhite: {
          DEFAULT: "hsl(var(--primarywhite))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsla(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        }, */

"primary": "hsl(var(--primary))",
"primary-foreground": "hsl(var(--primary-foreground))",
          
"secondary": "hsl(var(--secondary))",
          
"accent": "hsl(var(--accent))",
          
"neutral": "hsl(var(--neutral))",
          
"base-100": "hsl(var(--base-100))",
          
"info": "hsl(var(--info))",
          
"success": "hsl(var(--success))",
          
"warning": "hsl(var(--warning))",
          
"error": "hsl(var(--error))",
        
        mainbackground: {
          DEFAULT: "hsl(var(--main-background))",
        },
        maintext: {
          DEFAULT: "hsl(var(--main-text))",
        },
        maincolor:{
          DEFAULT: "hsl(var(--main-color))",
        },
        border1:{
          DEFAULT: "hsl(var(--border-color-1))",
        },
        green4:{
          DEFAULT: "hsl(var(--green-4))",
        },
        gray1:{
          DEFAULT: "hsl(var(--gray-1))",
        },
        gray2:{
          DEFAULT: "hsl(var(--gray-2))",
        },
        gray3:{
          DEFAULT: "hsl(var(--gray-3))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: false,
  },
};
