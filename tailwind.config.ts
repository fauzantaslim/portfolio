import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1DCD9F",
          dark: "#169976",
        },
        neutral: {
          black: "#000000",
          dark: "#222222",
        },
      },
    },
  },
  plugins: [],
};

export default config;
