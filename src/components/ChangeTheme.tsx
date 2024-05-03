"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "./Icons";

export default function ChangeTheme() {
    const { setTheme, resolvedTheme } = useTheme();

    const defaultTheme = resolvedTheme === "system" ? "dark" : resolvedTheme;

    return (
        <div className="relative size-8 cursor-pointer">
            <Sun className={`size-8 text-black transition-opacity absolute top-0 left-0 ${defaultTheme === "light" ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setTheme("dark")} />
            <Moon className={`size-8 transition-opacity absolute top-0 left-0 ${defaultTheme === "dark" ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setTheme("light")} />
        </div>
    );
}
