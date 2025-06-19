/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all files inside src
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        white: {
          0: "#FFFFFF",
          10: "#F9FAFB",
          20: "#F9FAFBCC",
          30: "#E5E7EB",
        },
        gray: {
          0: "#4D5562",
          10: "#212936",
        },
        black: {
          0: "#121826",
          10: "#000000",
        },
        blue: {
          0: "#C2DAF9",
          10: "#3662E3",
        },
      },
      fontFamily: {
        inter: ["light", "medium", "semi-bold"],
      },
    },
  },
  plugins: [],
};
