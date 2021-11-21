module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        fontFamily: {
            'poppins': ['Poppins'],
        },
        colors: {
            qblue: {
                light: '#27c5ea',
                DEFAULT: '#16c1ea',
                dark: '#02b6e0'
            },
            qviolet: {
                DEFAULT: '#6e6bbd',
            }
        }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
