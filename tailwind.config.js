/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f3ff',
        'neon-purple': '#bf00ff',
        'neon-pink': '#ff00e6',
        'dark-bg': '#0a0a0f',
        'card-bg': '#11111f',
      },
      boxShadow: {
        'neon': '0 0 5px #00f3ff, 0 0 10px #00f3ff, 0 0 20px #00f3ff',
        'neon-purple': '0 0 5px #bf00ff, 0 0 10px #bf00ff',
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { textShadow: '0 0 5px #00f3ff, 0 0 10px #00f3ff' },
          '50%': { textShadow: '0 0 15px #00f3ff, 0 0 30px #00f3ff' },
        },
      },
    },
  },
  plugins: [],
}