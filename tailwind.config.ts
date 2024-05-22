import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/lib/queries.tsx"],
	theme: {
		extend: {
			keyframes: {
				blink: {
					"100%": { opacity: "0" },
				},
				appear: {
					"100%": { opacity: "100" },
				},
				shake: {
					"0%, 100%": { transform: "rotate(0)" },
					"10%, 30%, 50%, 70%, 90%": { transform: "rotate(-10deg)" },
					"20%, 40%, 60%, 80%": { transform: "rotate(10deg)" },
				},
			},
			animation: {
				blink: "blink ease-out 0.8s infinite",
				appear: "appear 1s forwards",
				showup: "appear 0.3s forwards",
				shake: "shake 0.7s ease-in-out forwards",
			},
		},
	},
	plugins: [],
	darkMode: "class",
};

export default config;
