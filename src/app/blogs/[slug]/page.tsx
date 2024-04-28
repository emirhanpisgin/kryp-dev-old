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
        slug: doc.slug,
    }));
}

export default async function Blog({ params }: { params: { slug: string } }) {
    const doc = await getDocFromParams(params.slug);

    return (
        <div>
            <Mdx code={doc.body.code} />
        </div>
    );
}
