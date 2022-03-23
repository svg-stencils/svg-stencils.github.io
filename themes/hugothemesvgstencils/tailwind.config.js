module.exports = {

  content: [
    './**/*.html'
  ],

  theme: {
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
      display: ['Nunito', 'sans-serif'],
      body: ['Nunito', 'sans-serif']
    },
    extend: {}
  },
  variants: {},
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ]
}
