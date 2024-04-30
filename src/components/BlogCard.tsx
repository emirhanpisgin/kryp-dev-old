"use client";
import { timePassed } from "@/utils";
import { Doc } from "contentlayer/generated";
import Link from "next/link";
import { PencilIcon, ClockIcon } from "./Icons";
import { useEffect, useState } from "react";

interface BlogCardProps {
    doc: Doc;
}

export default function BlogCard({ doc }: BlogCardProps) {
    const [timeStamp, setTimeStamp] = useState("");

    useEffect(() => {
        setTimeStamp(timePassed(new Date(doc.createdAt)));
    }, [doc.createdAt])

    return (
        <Link href={doc.slug} className="border-b-2 p-3 md:rounded-xl md:border-2 gap-3 flex flex-col first:border-t-2 hover:shadow-[0_0_10px_#ffffff] transition-shadow duration-300">
            <div className="text-2xl leading-7 md:leading-normal">
                {doc.title}
            </div>
            <div className="whitespace-pre-wrap text-xl leading-6 md:leading-normal">
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
                    <ClockIcon className="size-5 mr-1" />
                    {timePassed(new Date(doc.createdAt))}
                </div>
            </div>
            {doc.tags?.length && <div className="flex gap-3">
                {doc.tags?.split(" ").map((tag, index) => (
                    <div key={index} className="border-2 p-1 rounded-xl">
                        {tag}
                    </div>
                ))}
            </div>}
        </Link>
    );
}
