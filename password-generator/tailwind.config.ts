import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lgx: { max: "1107px" },
      // => @media (max-width: 1023px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }
      mdlg: { max: "860px" },
      // => @media (max-width: 860px) { ... }
      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "479px" },
      // => @media (max-width: 479px) { ... }
      xxs: { max: "430px" },

      "2xlmin": { min: "1535px" },
      // => @media (min-width: 1535px) { ... }

      xlmin: { min: "1279px" },
      // => @media (min-width: 1279px) { ... }

      lgxmin: { min: "1107px" },

      lgmin: { min: "1023px" },
      // => @media (min-width: 1023px) { ... }
      mdlgmin: { min: "860px" },
      // => @media (min-width: 860px) { ... }
      mdmin: { min: "767px" },
      // => @media (min-width: 767px) { ... }

      smmin: { min: "639px" },
      // => @media (min-width: 639px) { ... }

      xsmin: { min: "479px" },
      xxsmin: { min: "300px" },
      // => @media (min-width: 430px) { ... }
    },
  },
  plugins: [],
} satisfies Config;
