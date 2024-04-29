import BlogCard from "@/components/BlogCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { allDocs } from "contentlayer/generated";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Kryp.Dev Blogs',
    description: 'My Blogs',
}

export default async function Blogs() {
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
                    {allDocs.map((doc, index) => (
                        <BlogCard doc={doc} key={index} />
                    ))}
                </div>
            </div>
        </MaxWidthWrapper>
    );
}
