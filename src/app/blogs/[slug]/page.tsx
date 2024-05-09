import { ClockIcon, LeftArrowIcon, PencilIcon } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Mdx from "@/components/Mdx";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";

async function getBlogFromId(id: string) {
    const blog = await prisma.blog.findFirst({
        where: {
            id
        }
    })

    if (!blog) notFound();

    return blog;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const blog = await getBlogFromId(params.slug);

    return {
        title: "Kryp.Dev Blogs - " + blog.title,
        description: blog.description
    }
}

export async function generateStaticParams() {
    const blogs = await prisma.blog.findMany();

    return blogs.map((blog) => ({
        slug: blog.id,
    }));
}

export default async function Blog({ params }: { params: { slug: string } }) {
    const blog = await getBlogFromId(params.slug);

    return (
        <MaxWidthWrapper className="pt-6 md:pt-16 flex items-start px-5 pb-64">
            <div className="flex flex-col w-full">
                <div className="text-2xl md:text-5xl font-semibold relative">
                    <div className="size-min block md:absolute -left-[calc(1em+0.2em)] top-0">
                        <Link href={"/blogs"}>
                            <LeftArrowIcon className="size-8 md:size-12" />
                        </Link>
                    </div>
                    <Balancer>
                        {blog.title}
                    </Balancer>
                </div>
                <div className="flex justify-between my-3 text-xl md:text-2xl">
                    <div className="flex items-center">
                        <PencilIcon className="size-6 mr-1" />
                        <div>
                            {blog.author}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <ClockIcon className="size-6 mr-2" />
                        {blog.createdAt.toLocaleDateString("en-US", { hour: "numeric" })}
                    </div>
                </div>
            </div>
            <Mdx content={blog.content} />
        </MaxWidthWrapper>
    );
}
