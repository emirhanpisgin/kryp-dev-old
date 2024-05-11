"use client";
import { cn } from "@/utils";
import React from "react";
import { MDXRemote } from "next-mdx-remote";

interface MdxProps {
    content: string;
}

const components = {
    h1: ({ className, ...props }: React.ComponentProps<'h1'>) => (
        <h1 className={cn("text-3xl md:text-5xl my-3 md:my-7 font-semibold", className)} {...props} />
    ),
    h2: ({ className, ...props }: React.ComponentProps<'h1'>) => (
        <h2 className={cn("text-2xl md:text-4xl my-2 md:my-5 font-semibold", className)} {...props} />
    ),
    p: ({ className, ...props }: React.ComponentProps<'h1'>) => (
        <p className={cn("text-xl my-3 w-full", className)} {...props} />
    ),
    pre: ({ className, ...props }: React.ComponentProps<'pre'>) => (
        <pre className={cn("rounded-lg my-2 p-4", className)} {...props} />
    ),
    li: ({ className, ...props }: React.ComponentProps<'li'>) => (
        <li className={cn("text-xl", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.ComponentProps<'ol'>) => (
        <ol className={cn("my-2", className)} {...props} />
    )
}

export default function Mdx({ content }: MdxProps) {
    //@ts-expect-error
    return <MDXRemote compiledSource={content} components={components} />;
}
