/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Here we can define the SkillLink brand colors
        nexus: {
          indigo: '#4F46E5',
          black: '#0F172A',
        }
      }
    },
  },
  plugins: [],
}