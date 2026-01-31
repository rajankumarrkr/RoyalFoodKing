/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#DAA520", // Golden color for a premium feel
                secondary: "#1a1a1a",
            }
        },
    },
    plugins: [],
}
