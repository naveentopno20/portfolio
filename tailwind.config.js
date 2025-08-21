// tailwind.config.js
import textShadow from 'tailwindcss-textshadow'

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        akatsuki: { red: "#ef4444", dark: "#0b0b0c" }
      },
      boxShadow: {
        'glow-red': '0 0 24px rgba(239, 68, 68, 0.55)',
      },
      textShadow: {
        'glow-red': '0 0 14px rgba(239, 68, 68, 0.85)',
      },
    },
  },
  plugins: [textShadow],
}
