"use client";
import { ThemeProvider } from "next-themes";
import { DialogProvider } from "../context/DialogContext";
import DialogRenderer from "./dialog-renderer";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <DialogProvider>
                {children}
                <DialogRenderer />
            </DialogProvider>
        </ThemeProvider>
    );
}
