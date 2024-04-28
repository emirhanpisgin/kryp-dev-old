import { allDocs } from "contentlayer/generated";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Kryp.Dev Blogs',
    description: 'My Blogs',
}

export default async function Blogs() {
    return (
        <div className="flex items-center flex-col">
            <div className="text-6xl md:text-8xl py-7">
                Kryp.Dev
            </div>
            <div className="mt-16 text-5xl">
                My Blogs
                <div className="text-3xl mt-5">
                    {allDocs.map((doc, index) => (
                        <div key={index} className="text-blue-400">
                            • <Link href={doc.slug} className="underline decoration-transparent hover:decoration-current transition-colors">
                                {doc.title}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
