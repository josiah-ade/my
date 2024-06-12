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
        "black": "#000000",
        "gray-600": "#475367",
        "green-50": "#E7F6EC",
        "gray-900": "#101928",
        "gray-500": "#667185",
        "primary": "#EB5017",
        "primary-1": "#D0D5DD",
        "primary-2": "#F0F2F5",
        "primary-3": "#FFECE5",
        "primary-4": "#344054",
        "primary-5": "#1671D9",
        "primary-6": "#667185",
        "primary-7": "#98A2B3",
        "success": "#0F973D",
        "primary-base": "#F56630",
      },
      screens: {
        'xs': "10px",
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
