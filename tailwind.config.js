/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackprimary: "#181818",
        blacksecondary: "#212121",
        blacktertiary: "#3D3D3D",
        grayprimary: "#AAAAAA",
        bluebutton: "#006EB8",
        blackOriginal: "#121212",
        blackInputs: "#3B3B3B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(250px, 1fr))",
      },
    },
  },
  plugins: [],
};
