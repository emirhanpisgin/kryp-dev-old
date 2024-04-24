import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		keyframes: {
			blink: {
				"100%": { opacity: "0" },
			},
		},
		animation: {
			blink: "blink ease-out 0.8s infinite",
		},
	},
	plugins: [],
};
export default config;
