"use client";

import clsx from "clsx";
import { ClassValue } from "clsx";
import React, { useEffect, useRef } from "react";
import { twMerge } from "tw-merge";

interface TypeWriterProps extends React.ComponentProps<'div'> {
    text: string;
    duration: number;
}

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function TypeWriter({ text, duration, className, ...props }: TypeWriterProps) {
    const displayRef = useRef<HTMLDivElement>(null);
    const trackerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (!displayRef.current || !trackerRef.current) return;
        console.log(text);

        const durationMs = duration * 1000;

        for (let i = 0; i < text.length; i++) {
            const charSpeed = (durationMs / text.length) * (i + 1);
            let char = text[i];

            if (char === " ") {
                char += text[i + 1];
            }

            setTimeout(() => {
                if (!displayRef.current) return;

                displayRef.current.innerText += text[i];
            }, charSpeed);
        }

        setTimeout(() => {
            if (!trackerRef.current) return;

            trackerRef.current.style.opacity = "0";
        }, durationMs + 1600)
    }, [text, duration])

    return (
        <div className={cn("whitespace-pre-wrap flex", className)} {...props}>
            <div ref={displayRef}>

            </div>
            <div ref={trackerRef} className="animate-blink flex items-center transition-opacity">
                |
            </div>
        </div>
    );
}
