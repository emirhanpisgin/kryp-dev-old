import BlogCard from "@/components/BlogCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { prisma } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Kryp.Dev Blogs',
    description: 'My Blogs',
}

export default async function Blogs() {
    const blogs = await prisma.blog.findMany();

    return (
        <MaxWidthWrapper className="flex items-start flex-col">
            <div className="mt-5 md:mt-12">
                <div className="text-3xl md:text-5xl text-center md:text-left py-1 md:py-3">
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
