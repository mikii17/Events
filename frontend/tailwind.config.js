/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00e980",
        secondary: "#215563",
        accent: "#235a68",
      },
      backgroundColor: {
        primary: "#011926",
        secondary: "#000c13",
        darkBlue: "#215563",
        lightBlue: "#011926",
        green: "#00e980",
        lightGreen: "#173f35",
      },
    },
  },
  plugins: [],
};
