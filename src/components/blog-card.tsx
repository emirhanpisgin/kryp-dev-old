"use client";
import { timePassed } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Blog } from "@prisma/client";
import { ClockIcon, DeleteBlogIcon, LeftArrowIcon, PencilIcon } from "./ui/icons";
import Link from "next/link";
import { useDialog } from "./context/DialogContext";
import CheckForm from "./check-form";
import Image from "next/image";

interface BlogCardProps {
    blog: Blog;
    dashboard?: boolean;
}

export default function BlogCard({
    blog: { author, createdAt, description, id, tags, title },
    dashboard = false,
}: BlogCardProps) {
    const [timeStamp, setTimeStamp] = useState(timePassed(createdAt));
    const { setDialogComponent } = useDialog();

    useEffect(() => {
        setTimeStamp(timePassed(createdAt));
    }, [createdAt]);

    return (
        <div className="border-b-2 p-3 first:border-t-2 md:rounded-xl md:border-2">
            <div className="my-1 flex items-center justify-between text-xl font-semibold md:text-2xl">
                <div>{title}</div>
                <div className="flex items-center gap-1 text-xl font-normal opacity-70">
                    <ClockIcon className="size-4" /> {timeStamp}
                </div>
            </div>
            <div className="my-1 line-clamp-2 text-lg md:line-clamp-1">
                {description}
            </div>
            {tags.length && (
                <div className="flex flex-wrap gap-2 text-sm">
                    {tags.map((tag, index) => (
                        <div key={index} className="rounded-xl bg-slate-300 px-2 dark:bg-gray-600">
                            {tag}
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-2 flex items-center justify-between text-lg font-medium">
                <div className="flex w-full items-center">
                    <div className="flex flex-1 items-center gap-2 whitespace-nowrap">
                        <Image src="/pp.jpg" alt="Profile" className="size-8 rounded-full" width={270} height={270} />
                        {author}
                    </div>
                    {!dashboard && (
                        <Link
                            href={`/blogs/${id}`}
                            className="relative flex items-center gap-1 text-xl before:absolute before:bottom-[3px] before:left-0 before:h-[.125rem] before:w-0 before:bg-black hover:before:w-full before:dark:bg-white"
                        >
                            Read <LeftArrowIcon className="size-6 rotate-180" />
                        </Link>
                    )}
                </div>
                {dashboard && (
                    <div className="flex gap-2">
                        <Link
                            href={`/dashboard/edit/${id}`}
                            className="rounded-lg bg-gray-600 p-2 transition-colors hover:text-blue-500"
                        >
                            <PencilIcon className="size-6" />
                        </Link>
                        <div
                            className="cursor-pointer rounded-lg bg-gray-600 p-2 transition-colors hover:text-red-700"
                            onClick={() => setDialogComponent(<CheckForm id={id} title={title} />)}
                        >
                            <DeleteBlogIcon className="size-6" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
