/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yelloww': '#F9BE00',
        'redd': '#DE3C4B',
        'combo': '#FF9201',
        'txt': '#1F2054'
      },
      backgroundImage: {
        'heroimage': "url('https://images.unsplash.com/photo-1552083974-186346191183?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  plugins: [],
}