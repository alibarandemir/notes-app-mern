/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    
    extend: {
      colors:{
        purple:{
          950:'#332941'},
      },
      flexGrow:{
        1:'1',
        2:'2',
        3:'3',
        4:'4',
      }
    },
  },
  plugins: [],
}
