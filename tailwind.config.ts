import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "rgb(59 130 246 / var(--tw-bg-opacity));",
        black: "#000000",
        "gray-600": "#475367",
        "green-50": "#E7F6EC",
        "gray-900": "#101928",
        "gray-500": "#667185",
        "gray-50": "#F9FAFB",
        "gray-300": "#D0D5DD",
        "gray-400": "#98A2B3",
        "gray-75": "#F7F9FC",
        "gray-100": "#F0F2F5",
        "gray-200": "#E4E7EC",
        "gray-700": "#344054",
        primary: "#EB5017",
        "primary-50": "#FFECE5",
        "primary-75": "#FCD2C2",
        "primary-100": "#FCB59A",
        "primary-200": "#FA9874",
        "primary-300": "#F77A4A",
        "primary-400": "#F56630",
        "primary-500": "#EB5017",
        "primary-600": "#CC400C",
        "primary-700": "#AD3307",
        "primary-800": "#8F2802",
        "primary-900": "#711E00",
        success: "#0F973D",
        "success-700": "#036B26",
        "success-600": "#04802E",
        "success-50": "#E7F6EC",
        "warning-50": "#FEF6E7",
        "warning-100": "#F7D394",
        "warning-200": "#F7C164",
        "warning-300": "#F5B546",
        "warning-500": "#DD900D",
        "warning-600": "#AD6F07",
        "warning-700": "#865503",
        "warning-800": "#664101",
        "warning-900": "#523300",
        "warning": "#F3A218",
        "error-700": "#9E0A05",
        "error-500": "#CB1A14",
        error: "#D42620",
        "error-100": "#EB9B98",
        "error-50": "#FBEAE9",
        "secondary-700": "#04326B",
        "secondary-500": "#0D5EBA",
        secondary: "#1671D9",
        "secondary-400": "#1671D9",
        "secondary-100": "#B6D8FF",
        "secondary-50": "#E3EFFC",
      },
      screens: {
        xs: "10px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      animation: {
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
