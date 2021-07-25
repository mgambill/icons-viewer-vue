const theme = require("tailwindcss/defaultTheme");

const safelist = []
Object.keys(theme.spacing).forEach(x => safelist.push(`w-${x}`))
Object.keys(theme.spacing).forEach(x => safelist.push(`h-${x}`))

module.exports = {
  mode: 'jit',
  purge: {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    safelist
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
