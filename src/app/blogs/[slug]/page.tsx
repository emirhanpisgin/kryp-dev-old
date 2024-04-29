import { ClockIcon, LeftArrowIcon, PencilIcon } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Mdx from "@/components/Mdx";
import { allDocs } from "contentlayer/generated";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getDocFromParams(slug: string) {
    const doc = allDocs.find((doc) => doc.slugAsParams === slug);

    if (!doc) notFound();

    return doc;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const doc = await getDocFromParams(params.slug);

    return {
        title: "Kryp.Dev Blogs - " + doc.title,
        description: doc.description
    }
}

export async function generateStaticParams() {
    return allDocs.map((doc) => ({
        slug: doc.slugAsParams,
    }));
}

export default async function Blog({ params }: { params: { slug: string } }) {
    const doc = await getDocFromParams(params.slug);

    return (
        <MaxWidthWrapper className="pt-6 md:pt-16 flex items-start px-5">
            <div className="flex flex-col">
                <div className="text-2xl md:text-5xl font-semibold relative">
                    <div className="size-min absolute -left-[calc(1em+0.2em)] top-0">
                        <Link href={"/blogs"}>
                            <LeftArrowIcon className="size-8 md:size-12" />
                        </Link>
                    </div>
                    {doc.title}
                </div>
                <div className="flex justify-between my-3">
                    <div className="flex items-center">
                        <PencilIcon className="size-6 mr-1" />
                        <div className="text-xl md:text-2xl">
                            {doc.author}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <ClockIcon className="size-6 mr-2" />
                        {new Date(doc.createdAt).toUTCString()}
                    </div>
                </div>
            </div>
            <Mdx code={doc.body.code} />
        </MaxWidthWrapper>
    );
}
