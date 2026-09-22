/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#14171c",
          deep: "#0e1114",
          shell: "#0b0e13",
          frame: "#10151c",
          surface: "#1c2128",
        },
        cyan: {
          DEFAULT: "#5ed4ea",
          fill: "#1ec8e0",
          ink: "#04181c",
        },
        amber: {
          DEFAULT: "#e2a23a",
          hover: "#f0b85a",
          ink: "#1c1406",
        },
        "space-blue": "#156082",
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"Segoe UI"', "sans-serif"],
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};
