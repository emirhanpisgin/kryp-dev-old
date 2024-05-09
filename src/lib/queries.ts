"use server";

import { prisma } from "./db";

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
