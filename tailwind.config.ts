import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fee4e2',
          200: '#fecdca',
          300: '#fdaaa4',
          400: '#fb7970',
          500: '#f04438',
          600: '#dd2d20',
          700: '#ba2418',
          800: '#9a2117',
          900: '#80231a',
        },
      },
    },
  },
  plugins: [],
};
export default config;
