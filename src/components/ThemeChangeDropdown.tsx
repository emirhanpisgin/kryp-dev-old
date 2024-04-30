import { useState } from "react";
import { ThemeKeys, themes, useTheme } from "./ThemeContext";

export default function ThemeChangeDropdown() {
    const [isOpen, setOpen] = useState(false);
    const { currentTheme, setTheme } = useTheme();

    return (
        <div className="relative">
            <div onClick={() => setOpen(!isOpen)}>
                <ThemeButton themeKey={currentTheme} />
            </div>
            <div className={`absolute flex flex-col gap-1 top-0 left-0 transition-[max-height,opacity] mt-9 overflow-hidden duration-300 ${isOpen ? "opacity-100 max-h-[1000%]" : "max-h-0 opacity-0"}`}>
                {Object.keys(themes).filter(key => key !== currentTheme).map((key, index) => (
                    <ThemeButton themeKey={key as ThemeKeys} key={index} setTheme={() => setTheme(key as ThemeKeys)} />
                ))}
            </div>
        </div>
    );
}

function ThemeButton({ themeKey, setTheme }: { themeKey: ThemeKeys, setTheme?: () => void }) {
    return (
        <div onClick={() => { if (setTheme) setTheme() }} className={`border-[hsl(${themes[themeKey].textColor.replaceAll(" ", "_")})] border-2 rounded-full size-8 bg-[hsl(${themes[themeKey].bgColor.replaceAll(" ", "_")})] flex overflow-hidden rotate-45 cursor-pointer transition-colors duration-300`}>
            <div className={`bg-[hsl(${themes[themeKey].textColor.replaceAll(" ", "_")})] h-full w-1/2 transition-colors duration-300`}></div>
            <div className={`bg-[hsl(${themes[themeKey].bgColor.replaceAll(" ", "_")})] h-full w-1/2 transition-colors duration-300`}></div>
        </div>
    );
}