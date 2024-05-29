import { cn } from "./utils";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import * as prod from "react/jsx-runtime";
import { unified } from "unified";
import React from "react";

const components = {
    h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
        <h1 className={cn("my-3 text-3xl font-semibold md:my-7 md:text-5xl", className)} {...props} />
    ),
    h2: ({ className, ...props }: React.ComponentProps<"h1">) => (
        <h2 className={cn("my-2 text-2xl font-semibold md:my-5 md:text-4xl", className)} {...props} />
    ),
    h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
        <h3 className={cn("my-2 text-xl font-semibold md:my-5 md:text-3xl", className)} {...props} />
    ),
    p: ({ className, ...props }: React.ComponentProps<"h1">) => (
        <p className={cn("my-3 w-full text-xl", className)} {...props} />
    ),
    pre: ({ className, ...props }: React.ComponentProps<"pre">) => (
        <pre className={cn("my-2 whitespace-pre-wrap rounded-lg p-4", className)} {...props} />
    ),
    li: ({ className, ...props }: React.ComponentProps<"li">) => <li className={cn("text-xl", className)} {...props} />,
    ol: ({ className, ...props }: React.ComponentProps<"ol">) => <ol className={cn("my-2", className)} {...props} />,
    figure: ({ className, ...props }: React.ComponentProps<"figure">) => <figure className={cn("w-fit", className)} {...props} />
};

export async function getMDX(content: string) {
    const file = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypePrettyCode, {
            theme: "github-dark",
        }) //@ts-expect-error
        .use(rehypeReact, {
            Fragment: prod.Fragment,
            jsx: prod.jsx,
            jsxs: prod.jsxs,
            components,
        })
        .process(content);

    return file.result;
}
