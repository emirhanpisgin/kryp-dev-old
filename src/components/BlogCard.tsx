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
        <Link href={doc.slug} className="border-b-2 p-3 md:rounded-xl md:border-2 flex flex-col first:border-t-2 hover:shadow-[0_0_10px_#ffffff] transition-shadow duration-300">
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
                    <ClockIcon className="size-5 mr-1" />
                    {timePassed(new Date(doc.createdAt))}
                </div>
            </div>
        </Link>
    );
}
