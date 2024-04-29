import { cn } from "@/utils";
import { useMDXComponent } from "next-contentlayer/hooks";
import React from "react";

interface MdxProps {
    code: string;
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
    code: ({ className, ...props }: React.ComponentProps<'code'>) => (
        <code className={cn("px-5 whitespace-pre-wrap", className)} {...props} />
    ),
    pre: ({ className, ...props }: React.ComponentProps<'pre'>) => (
        <pre className={cn("rounded-lg", className)} {...props} />
    )
}

export default function Mdx({ code }: MdxProps) {
    const Component = useMDXComponent(code);

    return <Component components={components} />;
}
