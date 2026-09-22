/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#0B1220",
          deep: "#070d18",
          shell: "#0B1220",
          frame: "#0B1220",
          surface: "#121a2c",
        },
        cyan: {
          DEFAULT: "#8ecae6",
          fill: "#1B8BB8",
          ink: "#041018",
        },
        teal: {
          DEFAULT: "#156082",
          bright: "#1B8BB8",
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
