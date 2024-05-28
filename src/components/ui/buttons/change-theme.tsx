"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "../icons";

export default function ChangeTheme() {
    const { setTheme, resolvedTheme } = useTheme();

    return (
        <div className="relative size-8 cursor-pointer">
            {resolvedTheme === "light" ? (
                <Sun className="size-8 animate-showup text-black opacity-0" onClick={() => setTheme("dark")} />
            ) : (
                <Moon className="size-8 animate-showup opacity-0" onClick={() => setTheme("light")} />
            )}
        </div>
    );
}
