// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust according to your file structure
  ],
  theme: {
    extend: {
      colors: {
        'light-orange': '#FFBF73', // Custom color
        'dark-orange': '#FF8C00', 
        'yellow-500': '#F59E0B',
        'blue-500': '#3B82F6',
        'green-500': '#10B981',
        'red-500': '#EF4444',
        'purple-500': '#8B5CF6',
        'gray-600': '#4B5563',// Custom color
      },
      spacing: {
        '128': '32rem', // Custom spacing
        '144': '36rem', // Custom spacing
      },
      borderRadius: {
        'extra-large': '1.5rem', // Custom border radius
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)', // Custom shadow
      },
    },
  },
  plugins: [
    // Add plugins here if needed
  ],
};
