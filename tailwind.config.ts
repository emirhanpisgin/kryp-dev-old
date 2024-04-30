import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
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
				shake: "shake 0.7s ease-in-out forwards",
			},
			colors: {
				"primary-text": "hsl(var(--primary-text))",
				"primary-bg": "hsl(var(--primary-bg))",
			},
		},
	},
	safelist: [
		"border-[hsl(0_0%_100%)]",
		"border-[hsl(0_0%_0%)]",
        "border-[hsl(220_13%_91%)]",
        "border-[hsl(291_93%_83%)]",
		"bg-[hsl(0_0%_100%)]",
		"bg-[hsl(0_0%_0%)]",
        "bg-[hsl(220_13%_91%)]",
        "bg-[hsl(215_16%_47%)]",
        "bg-[hsl(291_93%_83%)]",
        "bg-[hsl(240_5%_26%)]",
	],
	plugins: [],
};

export default config;
