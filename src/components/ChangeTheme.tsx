"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "./Icons";

export default function ChangeTheme() {
    const { setTheme, resolvedTheme } = useTheme();

    return (
        <div className="relative size-8 cursor-pointer">
            <Sun className={`size-8 text-black transition-opacity absolute top-0 left-0 ${resolvedTheme === "light" ? "opacity-100" : "opacity-0"}`} onClick={() => setTheme("dark")} />
            <Moon className={`size-8 transition-opacity absolute top-0 left-0 ${resolvedTheme === "dark" ? "opacity-100" : "opacity-0"}`} onClick={() => setTheme("light")} />
        </div>
    );
}
