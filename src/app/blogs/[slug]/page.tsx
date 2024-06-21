import MaxWidthWrapper from "@/components/util/max-width-wrapper";
import { getMDX } from "@/lib/mdx";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { blogs as blogSchema } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function getBlogFromId(id: string) {
    const [blog] = await db.select().from(blogSchema).where(eq(blogSchema.id, id));

    if (!blog) notFound();

    return blog;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const blog = await getBlogFromId(params.slug);

    return {
        title: "Kryp.Dev Blogs - " + blog.title,
        description: blog.description,
    };
}

export async function generateStaticParams() {
    const blogs = await db.select().from(blogSchema);

    return blogs.map((blog) => ({
        slug: blog.id,
    }));
}

export default async function Blog({ params }: { params: { slug: string } }) {
    const { id, author, content, createdAt, description, tags, title } = await getBlogFromId(params.slug);
    const markdown = await getMDX(content);

    return (
        <MaxWidthWrapper className="mt-2 flex items-start px-5 pb-64 md:mt-12">
            <div className="flex w-full flex-col items-center">
                <div className="flex flex-1 flex-col items-center gap-2 whitespace-nowrap py-1 text-2xl font-medium md:py-0 md:text-4xl">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/pp.jpg"
                            alt="Profile"
                            className="size-10 rounded-full md:size-16"
                            width={270}
                            height={270}
                        />
                        {author}
                    </div>
                    <div className="text-xl opacity-50">{new Date(createdAt).toLocaleDateString("tr")}</div>
                </div>
                <div className="flex flex-col items-center py-9 md:py-16">
                    <div className="text-center text-3xl text-balance font-semibold md:text-7xl">{title}</div>
                    <div className="py-3 text-center text-2xl text-balance font-medium md:text-3xl">{description}</div>
                    {tags.length && (
                        <div className="flex flex-wrap justify-center gap-2 text-sm">
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl bg-slate-300 px-2 text-sm dark:bg-gray-600 md:text-lg"
                                >
                                    {tag}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {markdown}
        </MaxWidthWrapper>
    );
}
