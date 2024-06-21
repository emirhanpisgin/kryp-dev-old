import BlogCard from "@/components/blog-card";
import MaxWidthWrapper from "@/components/util/max-width-wrapper";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { blogs as blogSchema } from "@/lib/db/schema";

export const metadata: Metadata = {
    title: "Kryp.Dev Blogs",
    description: "My Blogs",
};

export default async function Blogs() {
    const blogs = await db.select().from(blogSchema);

    return (
        <MaxWidthWrapper className="flex flex-col items-start">
            <div className="mt-5 md:mt-12">
                <div className="py-1 text-center text-3xl md:py-3 md:text-left md:text-5xl">Awesome Blogs</div>
                <div className="mt-5 flex flex-col md:gap-6">
                    {blogs
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map((blog, index) => (
                            <BlogCard blog={blog} key={index} />
                        ))}
                </div>
            </div>
        </MaxWidthWrapper>
    );
}
