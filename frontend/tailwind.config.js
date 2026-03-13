/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0a0e17",
        "cyan-electric": "#00f0ff",
        "purple-cyber": "#b03dff",
        "neon-green": "#00ff88",
        "amber-status": "#ffa500",
        "ruby-red": "#ff1744",
      },
      backdropFilter: {
        'blur-sm': 'blur(4px)',
        'blur-md': 'blur(12px)',
        'blur-lg': 'blur(20px)',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.5)',
        'glow-purple': '0 0 20px rgba(176, 61, 255, 0.5)',
        'glow-green': '0 0 15px rgba(0, 255, 136, 0.7)',
      },
    },
  },
  plugins: [],
}
