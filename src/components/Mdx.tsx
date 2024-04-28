import { cn } from "@/utils";
import { useMDXComponent } from "next-contentlayer/hooks";
import React from "react";

interface MdxProps {
    code: string;
}

const components = {
    h1: ({ className, ...props }: React.ComponentProps<'h1'>) => (
        <h1 className={cn("",className)} {...props}/>
    )
}

export default function Mdx({ code }: MdxProps) {
    const Component = useMDXComponent(code);

    return <Component components={components} />;
}
