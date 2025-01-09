/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        customGreen: '#059B00',
        customDarkGreen: '#054D1F',
        lightBlue: "#1E90FF",
        darkBlue: "#0F52BA",
        customGray: "#444444",
        textGray: "#1D1D1E"
      },
      backgroundColor: {
        customBlue: "#212735"
      },
      shadow: {
        shadowTop:"0px 4px 4px 0px #0000004D",
        shadowBottom:" 0px 8px 12px 6px #00000026"
      },
      fontSize:{
        large: "210px",
        small: "108.5px",
        extraSmall:"6.5px"
      },
      fontFamily: {
        ubuntu: ["Ubuntu", "serif"]
      },
      width: {
        logo: "37px"
      },
      height: {
        logo: "50px"
      },
      minHeight: {
        'custom-screen': '55vh', // Replace '80vh' with your desired height
      },
    },
  },
  plugins: [],
}