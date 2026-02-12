import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // 1. Look in the ROOT app folder (where your pages are)
    "./app/**/*.{js,ts,jsx,tsx,mdx}", 
    
    // 2. Look in the SRC folder (where your components are)
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;