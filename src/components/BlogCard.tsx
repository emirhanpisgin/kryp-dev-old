"use client";
import { timePassed } from "@/utils";
import Link from "next/link";
import { PencilIcon, ClockIcon } from "./Icons";
import { useEffect, useState } from "react";
import { Blog } from "@prisma/client";

interface BlogCardProps {
    blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
    const [timeStamp, setTimeStamp] = useState(timePassed(blog.createdAt));

    useEffect(() => {
        setTimeStamp(timePassed(blog.createdAt));
    }, [blog.createdAt]);

    return (
        <Link href={"blogs/" + blog.id} className="border-b-2 p-3 md:rounded-xl md:border-2 gap-2 md:gap-3 flex flex-col first:border-t-2 hover:shadow-[0_0_10px_#ffffff] transition-shadow duration-300">
            <div className="text-xl md:text-2xl leading-7 md:leading-normal">
                {blog.title}
            </div>
            <div className="whitespace-pre-wrap text-lg md:text-xl leading-6 md:leading-normal">
                {blog.description}
            </div>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <PencilIcon className="size-5 mr-1" />
                    <div>
                        {blog.author}
                    </div>
                </div>
                <div className="flex items-center">
                    <ClockIcon className="size-5 mr-1" />
                    {timeStamp ?? timePassed(blog.createdAt)}
                </div>
            </div>
            {blog.tags?.length && <div className="flex gap-3">
                {blog.tags.map((tag, index) => (
                    <div key={index} className="p-1 text-sm md:text-base rounded-xl">
                        {tag}
                    </div>
                ))}
            </div>}
        </Link>
    );
}
