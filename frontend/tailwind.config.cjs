module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          500: "#334155", // Slate Blue for trust
          600: "#1e293b",
          900: "#0f172a",
        },
        rose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          500: "#f43f5e", // Rose for empathy/awareness
          600: "#e11d48",
        },
        teal: {
          50: "#f0fdfa",
          500: "#14b8a6",
          600: "#0d9488",
        },
        card: "#ffffff",
        bg: "#f8fafc",
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "soft-md": "0 6px 18px rgba(15,23,42,0.06)",
        "premium": "0 10px 30px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
