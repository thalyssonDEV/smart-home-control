/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D9D9D9",
        secondary: "#e9e9e9",
        accent: "#F5A623",
      },
    },
  },
  plugins: [],
};
