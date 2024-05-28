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
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      fontSize: {
        sectionTitle: "2rem",
        buttonText: "0.938rem",
      },
      colors: {
        orangePrimary: "#FE8330",
        blackPrimary: "#3C3C3B",
      },
      maxWidth: {
        deskContainer: "1440px",
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
      },
      aspectRatio: {
        mobile: "9/16",
      },
    },
  },
};
