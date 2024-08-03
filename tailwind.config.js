/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      fontRegular: ["roboto-regular"],
      fontBold: ["roboto-bold"],
    },
  },
  plugins: [],
};
