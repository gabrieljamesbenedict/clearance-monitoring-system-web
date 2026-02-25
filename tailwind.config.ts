import type { Config } from "tailwindcss";

const config: Config = {
    
    //   darkMode: "class", TODO: Create darkmode support i dont wanna do it rn

    content: [
        "./app/**/*.{ts,tsx}",
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],

    theme: {
        extend: {
            colors: {
                "primary": "var(--primary)",
                "secondary": "var(--secondary)",
                "accent": "var(--accent)",
                "accent-hover": "var(--accent-hover)",
                "background": "var(--bg-main)",
                "card": "var(--bg-card)",
                "text-primary": "var(--text-primary)",
                "text-secondary": "var(--text-secondary)",
                "text-muted": "var(--text-muted)"
            },
        },
    },

    plugins: [],
};
