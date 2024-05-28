"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface TypeWriterProps extends React.ComponentProps<"div"> {
    text: string;
    duration: number;
    onWritingEnd?: () => any;
}

export default function TypeWriter({ text, duration, onWritingEnd, className, ...props }: TypeWriterProps) {
    const displayRef = useRef<HTMLDivElement>(null);
    const trackerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!displayRef.current || !trackerRef.current) return;

        const durationMs = duration * 1000;

        for (let i = 0; i < text.length; i++) {
            const charSpeed = (durationMs / text.length) * (i + 1);
            let char = text[i];

            if (char === " ") {
                char += text[i + 1];
            } else if (text[i - 1] === " ") {
                continue;
            }

            setTimeout(() => {
                if (!displayRef.current) return;

                if (i === 0) {
                    displayRef.current.innerText = char;
                } else {
                    displayRef.current.innerText += char;
                }
            }, charSpeed);
        }

        setTimeout(() => {
            if (!trackerRef.current) return;

            trackerRef.current.style.opacity = "0";
        }, durationMs + 1600);

        if (onWritingEnd) {
            setTimeout(() => {
                onWritingEnd();
            }, duration * 1000);
        }
    }, []);

    return (
        <div className={cn("relative flex w-min whitespace-pre-wrap", className)} {...props}>
            <div ref={displayRef} className="w-max">
                {" "}
            </div>
            <div
                ref={trackerRef}
                className="absolute -right-[0.4em] bottom-0 flex animate-blink items-center transition-opacity"
            >
                |
            </div>
        </div>
    );
}
