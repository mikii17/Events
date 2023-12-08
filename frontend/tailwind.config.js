/** @type {import('tailwindcss').Config} */
const withOpacity =
  (variableName) =>
  ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: withOpacity("0, 233, 128"),
        secondary: withOpacity("33, 85, 99"),
        accent: withOpacity("35, 90, 104"),
      },
      backgroundColor: {
        primary: withOpacity("1, 25, 38"),
        secondary: withOpacity("0, 12, 19"),
        darkBlue: withOpacity("33, 85, 99"),
        lightBlue: withOpacity("1, 25, 38"),
        green: withOpacity("0, 233, 128"),
        lightGreen: withOpacity("23, 63, 53"),
      },
    },
  },
  plugins: [],
};
