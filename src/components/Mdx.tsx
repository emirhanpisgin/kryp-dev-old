import { cn } from "@/utils";
import { useMDXComponent } from "next-contentlayer/hooks";
import React from "react";

interface MdxProps {
    code: string;
}

const components = {
    h1: ({ className, ...props }: React.ComponentProps<'h1'>) => (
        <h1 className={cn("text-3xl md:text-5xl my-3 md:my-7", className)} {...props} />
    ),
    h2: ({ className, ...props }: React.ComponentProps<'h1'>) => (
        <h2 className={cn("text-3xl", className)} {...props} />
    ),
    p: ({ className, ...props }: React.ComponentProps<'h1'>) => (
        <p className={cn("text-xl my-2 w-full", className)} {...props} />
    )
}

export default function Mdx({ code }: MdxProps) {
    const Component = useMDXComponent(code);

    return <Component components={components} />;
}
