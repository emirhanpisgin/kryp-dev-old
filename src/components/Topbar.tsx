"use client"
import Link from "next/link";
import { URLArrowIcon } from "./Icons";
import { ThemeKeys, useTheme } from "./ThemeContext";
import ThemeChangeDropdown from "./ThemeChangeDropdown";

export default function Topbar() {
    const { setTheme, currentTheme } = useTheme();

    return (
        <div className="absolute top-0 w-full flex justify-between md:justify-end items-center p-5 gap-5">
            <ThemeChangeDropdown />
            <Link href={"https://github.com/kryparnold/kryp-dev"} target="_blank" className="flex items-center gap-1 text-2xl text-primary-text/50 hover:text-primary-text duration-300 transition-colors">
                <URLArrowIcon className="size-8 -rotate-[135deg] text-inherit" />
                Source
            </Link>
        </div>
    );
}
