import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        buttonBlack: "#000000",
        whitePrimary: "#FAFAFA",
        secondary: "#F5F5F5",
        redPrimary: "#DB4444",
        grayPrimary: "#828282"
      },
    },
  },
  plugins: [],
} satisfies Config;
