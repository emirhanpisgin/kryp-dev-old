import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Mdx from "@/components/Mdx";
import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";

async function getDocFromParams(slug: string) {
    const doc = allDocs.find((doc) => doc.slugAsParams === slug);

    if (!doc) notFound();

    return doc;
}

export async function generateStaticParams() {
    return allDocs.map((doc) => ({
        slug: doc.slugAsParams,
    }));
}

export default async function Blog({ params }: { params: { slug: string } }) {
    const doc = await getDocFromParams(params.slug);

    return (
        <MaxWidthWrapper className="pt-6 md:pt-16 text-left px-5">
            <Mdx code={doc.body.code} />
        </MaxWidthWrapper>
    );
}
