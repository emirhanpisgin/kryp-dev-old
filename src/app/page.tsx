"use client";

import { DiscordIcon, GithubIcon, TwitchIcon, YoutubeIcon } from "@/components/ui/icons";
import TypeWriter from "@/components/util/typewriter";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
    const linksRef = useRef<HTMLDivElement>(null);
    const blogsRef = useRef<HTMLDivElement>(null);

    const links = [
        {
            title: "Twitch",
            url: "https://twitch.tv/kryparnold",
            iconComponent: TwitchIcon,
        },
        {
            title: "Discord",
            url: "https://discord.gg/arnold",
            iconComponent: DiscordIcon,
        },
        {
            title: "Github",
            url: "https://github.com/kryparnold",
            iconComponent: GithubIcon,
        },
        {
            title: "Youtube",
            url: "https://www.youtube.com/channel/UC_Qf0YHNFWhnW_1BknnKCpQ",
            iconComponent: YoutubeIcon,
        },
    ];

    function onWritingEnd() {
        if (!linksRef.current || !blogsRef.current) return;

        linksRef.current.style.maxHeight = "100vh";

        const linkElements = linksRef.current.childNodes as NodeListOf<HTMLDivElement>;

        setTimeout(() => {
            if (!blogsRef.current) return;
            for (let i = 0; i < linkElements.length; i++) {
                const linkElement = linkElements.item(i);

                linkElement.style.opacity = "100";
                linkElement.style.transform = "translateY(0)";
            }
            blogsRef.current.style.opacity = "100";
        }, 250);
    }

    return (
        <main className="grid flex-1 place-items-center bg-inherit">
            <div className="flex flex-col items-center gap-5">
                <TypeWriter
                    text="Kryp Arnold"
                    duration={0.9}
                    onWritingEnd={onWritingEnd}
                    className="select-none text-6xl md:text-8xl"
                />
                <div
                    ref={linksRef}
                    className="transition-max-height flex h-auto max-h-0 justify-evenly gap-8 duration-[3s]"
                >
                    {links.map((link, index) => (
                        <div
                            key={index}
                            style={{
                                transitionDelay: `${(index + 1) * 200}ms`,
                            }}
                            className="-translate-y-1/3 cursor-pointer rounded-xl border-2 border-black p-3 opacity-0 transition-[transform,opacity] duration-500 hover:animate-shake dark:border-white"
                        >
                            <a href={link.url} target="_blank">
                                <link.iconComponent className="size-8 md:size-12" />
                            </a>
                        </div>
                    ))}
                </div>
                <div className="text-2xl opacity-0 transition-opacity delay-1000 duration-500" ref={blogsRef}>
                    Wanna check out my{" "}
                    <Link
                        className="text-blue-400 underline decoration-transparent transition-colors duration-300 hover:decoration-current"
                        href={"/blogs"}
                    >
                        blogs?
                    </Link>
                </div>
            </div>
        </main>
    );
}
