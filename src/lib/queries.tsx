"use server";
import { prisma } from "./db";
import { Blog } from "@prisma/client";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import * as prod from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import { cn } from "@/utils";

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
        <pre className={cn("rounded-lg my-2 p-4 whitespace-pre-wrap", className)} {...props} />
    ),
    li: ({ className, ...props }: React.ComponentProps<'li'>) => (
        <li className={cn("text-xl", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.ComponentProps<'ol'>) => (
        <ol className={cn("my-2", className)} {...props} />
    )
}

interface AddBlogParams {
	title: string;
	description: string;
	tags: string[];
	content: string;
}

export async function addBlog({ title, description, tags, content }: AddBlogParams) {
	const newBlog = await prisma.blog.create({
		data: {
			title,
			description,
			content,
			tags,
			author: "Kryp Arnold",
		},
	});

	return newBlog.id;
}

export async function deleteBlog(id: string) {
	await prisma.blog.delete({
		where: {
			id,
		},
	});
}

export async function editBlog(blog: Blog) {
	await prisma.blog.update({
		where: {
			id: blog.id,
		},
		data: blog,
	});
}

export async function getMDX(content: string) {
	const file = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypePrettyCode, {
			theme: "github-dark",
		}) //@ts-expect-error
		.use(rehypeReact, { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs, components })
		.process(content);

    return file.result;
}
