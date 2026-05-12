import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F4F0EB",
        "card-light": "#FFFFFF",
        "card-dark": "#25262B",
        "card-muted": "#D1C7BD",
        primary: "#FFD034",
        coral: "#FF6B6B",
        "text-primary": "#25262B",
        "text-muted": "#8B8B8B",
        /* shadcn/ui compatibility */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "28px",
        pill: "99px",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        sans: ["var(--font-poppins)", "Quicksand", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 40px rgba(0, 0, 0, 0.04)",
        floating: "0 8px 32px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
