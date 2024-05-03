"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "./Icons";

export default function ChangeTheme() {
    const { setTheme, resolvedTheme } = useTheme();

    return (
        <div className="relative size-8">
            {resolvedTheme === "light" ? <Sun className="size-8 text-black" onClick={() => setTheme("dark")} /> : <Moon className="size-8" onClick={() => setTheme("light")} />}
        </div>
    );
}
