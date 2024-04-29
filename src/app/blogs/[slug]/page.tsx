import { ClockIcon, LeftArrowIcon, PencilIcon } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Mdx from "@/components/Mdx";
import { allDocs } from "contentlayer/generated";
import Link from "next/link";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";

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
        <MaxWidthWrapper className="pt-6 md:pt-16 flex items-start px-5 pb-64">
            <div className="flex flex-col w-full">
                <div className="text-2xl md:text-5xl font-semibold relative">
                    <div className="size-min block md:absolute -left-[calc(1em+0.2em)] top-0">
                        <Link href={"/blogs"}>
                            <LeftArrowIcon className="size-8 md:size-12" />
                        </Link>
                    </div>
                    <Balancer>
                        {doc.title}
                    </Balancer>
                </div>
                <div className="flex justify-between my-3 text-xl md:text-2xl">
                    <div className="flex items-center">
                        <PencilIcon className="size-6 mr-1" />
                        <div>
                            {doc.author}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <ClockIcon className="size-6 mr-2" />
                        {new Date(doc.createdAt).toLocaleDateString("en-US", { hour: "numeric" })}
                    </div>
                </div>
            </div>
            <Mdx code={doc.body.code} />
        </MaxWidthWrapper>
    );
}
