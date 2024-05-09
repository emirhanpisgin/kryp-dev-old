import { cn } from "@/utils";
import React from "react";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ReactMarkdown from 'react-markdown'
import rehypeSlug from "rehype-slug";

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
    code: ({ className, children, ...props }: React.ComponentProps<'code'>) => {
        const match = /language-(\w+)/.exec(className || '');

        return match ? (
            //@ts-expect-error
            <SyntaxHighlighter codeTagProps={{ className: cn("!whitespace-pre-wrap", className) }} customStyle={{ borderRadius: "0.5rem", margin: "0" }} style={oneDark} language={match[1]} {...props}>
                {String(children).replaceAll("\\\"", "\"").replaceAll("\\t", "    ")}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        );
    },
    pre: ({ className, ...props }: React.ComponentProps<'pre'>) => (
        <pre className={cn("rounded-lg my-2", className)} {...props} />
    ),
    li: ({ className, ...props }: React.ComponentProps<'li'>) => (
        <li className={cn("text-xl", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.ComponentProps<'ol'>) => (
        <ol className={cn("my-2", className)} {...props} />
    )
}

export default function Mdx({ content }: MdxProps) {

    return (
        <ReactMarkdown components={components} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
            {content.replace(/\\n/g, '\n')}
        </ReactMarkdown>
    );
}
