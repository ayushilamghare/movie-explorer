/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        outfit: ["'Outfit'", "sans-serif"],
        lora: ["'Lora'", "serif"],
      },
      colors: {
        dark: {
          bg:     "#0f0a1e",
          bg2:    "#160d2b",
          card:   "#130d24",
          border: "#2d1f4e",
          accent: "#7c3aed",
          text:   "#e2d9f3",
          muted:  "#a78bfa",
          dim:    "#4c1d95",
        },
      },
    },
  },
  plugins: [],
};
