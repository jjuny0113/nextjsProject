/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode:"media",//"class는 브라우저 말고 프로덕션 설정 따라가게 하는것"
  plugins: [require('@tailwindcss/forms')],
};  
