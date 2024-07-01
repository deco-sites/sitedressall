import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
        headerHover: "headerHover 0.5s ease-in-out",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        headerHover: {
          "0%": {
            opacity: 0,
            transform: "translateY(-250px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      fontSize: {
        sectionTitle: "2rem",
        buttonText: "0.938rem",
      },
      colors: {
        orangePrimary: "#FE8330",
        blackPrimary: "#3C3C3B",
        middleGray: "#D9D9D9",
      },
      width: {
        "90vw": "90vw",
        "95vw": "95vw",
      },
      maxWidth: {
        deskContainer: "1440px",
        "98vw": "98vw",
      },
      inset: {
        "78": "78%",
        "76": "76%",
      },
      screens: {
        "max-425": { max: "425px" },
        "max-767": { max: "767px" },
        "max-768": { max: "768px" },
        "max-1023": { max: "1023px" },
        "max-1024": { max: "1024px" },
        "lg-new": { min: "1024px", max: "1100px" },
      },
      aspectRatio: {
        mobile: "9/16",
      },
    },
  },
};
