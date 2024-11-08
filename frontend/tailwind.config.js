/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        texto_color: '#000000', // color negro
        fondo: '#fffcf9', // blanco grisáceo
        primario: '#5d0909', // rojo oscuro
        secundario: '#9f9f9f', // gris claro
        acento: '#381008', // negro o marrón oscuro
      },
    },
  },
  plugins: [],
}
