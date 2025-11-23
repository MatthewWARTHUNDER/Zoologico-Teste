  /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'azul-primario': '#2C5A84',
          'verde-calmo': '#6B8E23',
          'cinza-fundo': '#EBEBEB',
          'amarelo-destaque': '#FFC300',
        }
      },
    },
    plugins: [],
  }

