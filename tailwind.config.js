/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(180, 29%, 50%)",
        background: "hsl(180, 52%, 96%)",
        filterTabs: "hsl(180, 31%, 95%)",
        darkGrayishCyan: "hsl(180, 8%, 52%)",
        veryDarkGrayishCyan: "hsl(180, 14%, 20%)",
      },
    },
    fontFamily: {
      mainFont: ["League Spartan", "sans-serif"],
    },
  },
  plugins: [],
};
