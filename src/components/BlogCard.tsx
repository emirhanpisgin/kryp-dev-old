"use client";
import { timePassed } from "@/utils";
import { useEffect, useState } from "react";
import { Blog } from "@prisma/client";
import { ClockIcon, DeleteBlogIcon, LeftArrowIcon, PencilIcon } from "./Icons";
import Balancer from "react-wrap-balancer";
import Link from "next/link";
import { useDialog } from "./context/DialogContext";
import CheckForm from "./CheckForm";
import Image from "next/image";

interface BlogCardProps {
    blog: Blog;
    dashboard?: boolean;
}

export default function BlogCard({ blog: { author, createdAt, description, id, tags, title }, dashboard = false }: BlogCardProps) {
    const [timeStamp, setTimeStamp] = useState(timePassed(createdAt));
    const { setDialogComponent } = useDialog();

    useEffect(() => {
        setTimeStamp(timePassed(createdAt));
    }, [createdAt]);

    return (
        <div className="p-3 border-b-2 first:border-t-2 md:border-2 md:rounded-xl">
            <div className="flex items-center justify-between my-1 text-xl font-semibold md:text-2xl">
                <Balancer>
                    {title}
                </Balancer>
                <div className="flex items-center gap-1 text-xl font-normal opacity-70">
                    <ClockIcon className="size-4" /> {timeStamp}
                </div>
            </div>
            <div className="my-1 text-lg">{description}</div>
            {tags.length && (
                <div className="flex flex-wrap gap-2 text-sm">
                    {tags.map((tag, index) => (
                        <div key={index} className="px-2 bg-slate-300 dark:bg-gray-600 rounded-xl">
                            {tag}
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between mt-2 text-lg font-medium">
                <div className="flex items-center w-full">
                    <div className="flex-1 whitespace-nowrap items-center flex gap-2">
                        <Image src="/pp.jpg" alt="Profile" className="rounded-full size-8" width={270} height={270} />
                        {author}
                    </div>
                    {!dashboard && (
                        <Link href={`/blogs/${id}`} className="text-xl flex items-center gap-1 before:h-[.125rem] before:w-0 hover:before:w-full before:bg-black before:dark:bg-white before:absolute relative before:bottom-[3px] before:left-0">
                            Read <LeftArrowIcon className="rotate-180 size-6" />
                        </Link>
                    )}
                </div>
                {dashboard && (
                    <div className="flex gap-2">
                        <Link href={`/dashboard/edit/${id}`} className="p-2 transition-colors bg-gray-600 rounded-lg hover:text-blue-500">
                            <PencilIcon className="size-6" />
                        </Link>
                        <div className="p-2 transition-colors bg-gray-600 rounded-lg cursor-pointer hover:text-red-700" onClick={() => setDialogComponent(<CheckForm id={id} title={title} />)}>
                            <DeleteBlogIcon className="size-6" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}