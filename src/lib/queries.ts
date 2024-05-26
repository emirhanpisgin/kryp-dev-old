"use server";
import { prisma } from "./db";
import { Blog } from "@prisma/client";

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
