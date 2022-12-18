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
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
