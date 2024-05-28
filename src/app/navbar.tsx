"use client";
import { URLArrowIcon } from "@/components/ui/icons";
import ChangeTheme from "@/components/ui/buttons/change-theme";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="relative flex w-full justify-between gap-3 border-b-2 p-5">
            <div className="flex flex-1 items-center gap-8">
                <Link href={"/"} className="text-4xl font-semibold">
                    Kryp.Dev
                </Link>
                <div className="flex h-full flex-1 items-center justify-end space-x-4 text-2xl md:justify-start">
                    <div className="hidden space-x-4 text-2xl md:block">
                        <Link className="hover:underline" href={"/"}>
                            Home
                        </Link>
                        <Link className="hover:underline" href={"/blogs"}>
                            Blogs
                        </Link>
                    </div>
                    <div className="grid aspect-square h-full w-min place-items-center md:hidden">
                        <div
                            onClick={() => setOpen(!isOpen)}
                            className="grid aspect-square w-full cursor-pointer place-items-center gap-1 py-3 *:h-[.1875rem] *:w-3/4 *:rounded-lg *:bg-black *:dark:bg-white"
                        >
                            <div className={`transition-transform ${isOpen ? "translate-y-[230%] rotate-45" : ""}`} />
                            <div className={`transition-opacity ${isOpen ? "opacity-0" : "opacity-100"}`} />
                            <div className={`transition-transform ${isOpen ? "-translate-y-[230%] -rotate-45" : ""}`} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end space-x-5">
                <ChangeTheme />
                <Link
                    href={"https://github.com/kryparnold/kryp-dev"}
                    target="_blank"
                    className="hidden items-center gap-1 text-2xl opacity-30 transition-opacity duration-300 hover:opacity-100 md:flex"
                >
                    <URLArrowIcon className="size-8 -rotate-[135deg] text-inherit" />
                    Source
                </Link>
            </div>
            <div
                className={`absolute left-0 top-full z-50 flex max-h-0 w-screen flex-col overflow-hidden border-t-2 bg-white text-3xl opacity-0 transition-[max-height,opacity] duration-300 *:border-b-2 *:p-5 dark:bg-black ${isOpen && "max-h-[50vh] opacity-100"}`}
            >
                <Link onClick={() => setOpen(false)} className="hover:underline" href={"/"}>
                    Home
                </Link>
                <Link onClick={() => setOpen(false)} className="hover:underline" href={"/blogs"}>
                    Blogs
                </Link>
            </div>
        </div>
    );
}
