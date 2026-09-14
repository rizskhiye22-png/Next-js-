import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F6FAFF",
        "bg-soft": "#EAF3FF",
        ink: "#33414F",
        "ink-soft": "#4B5A6B",
        brand: "#5B9BD8",
        accent: "#FF8FA8",
        sunny: "#FFCE7A",
        mint: "#A8E8D4",
      },
      fontFamily: {
        display: ["var(--font-baloo)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        jp: ["var(--font-zenmaru)", "sans-serif"],
      },
      borderRadius: {
        lg: "28px",
        md: "18px",
        sm: "10px",
      },
      maxWidth: {
        site: "1140px",
      },
    },
  },
  plugins: [],
};

export default config;
