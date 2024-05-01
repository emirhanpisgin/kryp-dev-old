"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export enum ThemeKeys {
    DARK = "dark",
    LIGHT = "light",
    SLATE = "slate",
    GRAY = "gray"
}

type Themes = {
    [x in ThemeKeys]: {
        textColor: string;
        bgColor: string;
    };
}

export const themes: Themes = {
    "dark": {
        textColor: "0 0% 100%",
        bgColor: "0 0% 0%"
    },
    "light": {
        textColor: "0 0% 0%",
        bgColor: "0 0% 100%"
    },
    "slate": {
        textColor: "220 13% 91%",
        bgColor: "215 16% 47%"
    },
    "gray": {
        textColor: "291 93% 83%",
        bgColor: "240 5% 26%"
    }
}

export type ThemeContextType = {
    currentTheme: ThemeKeys;
    setTheme: (themeKey: ThemeKeys) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children, initialTheme }: { children: ReactNode, initialTheme: ThemeKeys }) => {
    const [theme, setTheme] = useState<ThemeKeys>(initialTheme);

    useEffect(() => {
        Cookies.set("theme", theme);

        const root = document.documentElement;

        root.style.setProperty("--primary-text", themes[theme].textColor);
        root.style.setProperty("--primary-bg", themes[theme].bgColor);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ currentTheme: theme, setTheme: (themeKey: ThemeKeys) => setTheme(themeKey) }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}