"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "./Icons";

export default function ChangeTheme() {
    const { setTheme, resolvedTheme } = useTheme();

    return (
        <div className="relative size-8 cursor-pointer">
            {resolvedTheme === "light" ? <Sun className="size-8 text-black opacity-0 animate-showup" onClick={() => setTheme("dark")} /> : <Moon className="size-8 opacity-0 animate-showup" onClick={() => setTheme("light")} />}
        </div>
    );
}
