import { ClockIcon, PencilIcon } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { timePassed } from "@/utils";
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
            <div className="text-6xl md:text-8xl py-7">
                Kryp.Dev
            </div>
            <div className="mt-16">
                <div className="text-5xl text-center">
                    My Recent Blogs
                </div>
                <div className="mt-5 flex flex-col md:gap-6">
                    {allDocs.map((doc, index) => (
                        <Link href={doc.slug} key={index} className="border-b-2 p-3 md:rounded-xl md:border-2 flex flex-col first:border-t-2">
                            <div className="text-2xl my-1">
                                {doc.title}
                            </div>
                            <div className="whitespace-pre-wrap text-xl my-1">
                                {doc.description}
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <PencilIcon className="size-5 mr-1" />
                                    <div>
                                        {doc.author}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <ClockIcon className="size-5 mr-1"/>
                                    {timePassed(new Date(doc.createdAt))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>  
            </div>
        </MaxWidthWrapper>
    );
}
