import BlogCard from "@/components/BlogCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { prisma } from "@/lib/db";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Kryp.Dev Blogs',
    description: 'My Blogs',
}

export default async function Blogs() {
    const blogs = await prisma.blog.findMany();

    return (
        <MaxWidthWrapper className="flex items-center flex-col">
            <Link href={"/"} className="text-6xl md:text-8xl py-7">
                Kryp.Dev
            </Link>
            <div className="mt-5">
                <div className="text-5xl text-center py-3">
                    My Recent Blogs
                </div>
                <div className="mt-5 flex flex-col md:gap-6">
                    {blogs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((blog, index) => (
                        <BlogCard blog={blog} key={index} />
                    ))}
                </div>
            </div>
        </MaxWidthWrapper>
    );
}
