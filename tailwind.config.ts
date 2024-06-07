import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "rgb(59 130 246 / var(--tw-bg-opacity));",
        black: "#000",
        primary: "#0D1A4F",
        "primary-1": "#253572",
        "primary-2": "#4A5995",
        "primary-3": "#7B87B9",
        "primary-4": "#D9DDED",
      },
      screens: {
        'xs': "475px",
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
export default config;
