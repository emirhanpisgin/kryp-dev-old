"use client";

import { DiscordIcon, GithubIcon, TwitchIcon, YoutubeIcon } from "@/components/Icons";
import TypeWriter from "@/components/TypeWriter";
import { useRef } from "react";

export default function Home() {
    const linksRef = useRef<HTMLDivElement>(null);

    const links = [
        {
            title: "Twitch",
            url: "https://twitch.tv/kryparnold",
            iconComponent: TwitchIcon
        },
        {
            title: "Discord",
            url: "https://discord.gg/arnold",
            iconComponent: DiscordIcon
        },
        {
            title: "Github",
            url: "https://github.com/kryparnold",
            iconComponent: GithubIcon
        },
        {
            title: "Youtube",
            url: "https://www.youtube.com/channel/UC_Qf0YHNFWhnW_1BknnKCpQ",
            iconComponent: YoutubeIcon
        }
    ]

    function onWritingEnd() {
        if (!linksRef.current) return;

        linksRef.current.style.maxHeight = "100vh";

        const linkElements = linksRef.current.childNodes as NodeListOf<HTMLDivElement>;

        setTimeout(() => {
            for (let i = 0; i < linkElements.length; i++) {
                const linkElement = linkElements.item(i);

                linkElement.style.opacity = "100";
                linkElement.style.transform = "translateY(0)";
            }
        }, 500);
    }

    return (
        <main className="grid place-items-center h-full bg-inherit">
            <div className="flex flex-col gap-5 items-center">
                <TypeWriter text="Kryp.Dev" duration={1} onWritingEnd={onWritingEnd} className="text-6xl md:text-8xl select-none" />
                <div ref={linksRef} className="flex gap-8 justify-evenly max-h-0 h-auto duration-[3s] transition-max-height">
                    {links.map((link, index) => (
                        <div key={index} style={{ transitionDelay: `${(index + 1) * 200}ms` }} className="border-2 p-3 -translate-y-1/3 rounded-xl cursor-pointer duration-500 hover:animate-shake opacity-0 transition-all">
                            <a href={link.url} target="_blank">
                                <link.iconComponent className="size-8 md:size-12" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
