"use client";

import { useDialog } from "@/components/context/DialogContext";
import { CrossIcon, EyeIcon, LoadingIcon } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TagSelector from "@/components/TagSelector";
import { addBlog, editBlog, getMDX } from "@/lib/queries";
import { Blog } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

export default function NewBlogForm({ blog }: { blog?: Blog }) {
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(blog?.content ?? "");
    const title = useRef(blog?.title ?? "");
    const description = useRef(blog?.description ?? "");
    const [tags, setTags] = useState<string[]>(blog?.tags ?? []);
    const router = useRouter();
    const { setDialogComponent } = useDialog();

    async function onSubmit(redirect = false) {
        setLoading(true);
        let blogId = blog?.id;

        if (blogId && blog) {
            await editBlog({
                title: title.current,
                description: description.current,
                author: blog.author,
                content,
                createdAt: blog.createdAt,
                id: blogId,
                tags
            });
        } else {
            blogId = await addBlog({
                title: title.current,
                description: description.current,
                tags: tags,
                content,
            });
        }

        if (redirect) {
            router.push(`/./blogs/${blogId}`);
        } else {
            router.push("/");
        }
    }

    async function goPreview() {
        setLoading(true);

        const md = await getMDX(content);

        setDialogComponent(
            <div className="bg-white dark:bg-black p-5 rounded-lg w-3/4 h-3/4 overflow-auto">
                {md}
            </div>
        );

        setLoading(false);
    }

    return (
        <MaxWidthWrapper className="min-h-screen">
            <div className="flex w-full flex-col h-full">
                <div className="text-left my-10 text-7xl font-semibold flex justify-between items-center">
                    <div className="flex items-center gap-5">
                        New Blog
                        {loading && <LoadingIcon className="size-12" />}
                    </div>
                    <div className="flex justify-end py-6 gap-5 *:py-3 *:px-4 *:text-xl *:rounded-xl *:cursor-pointer font-normal">
                        <div className="bg-black dark:bg-white !bg-opacity-30 hover:!bg-opacity-20 transition-colors flex items-center gap-2" onClick={() => goPreview()}>
                            <EyeIcon className="size-6" /> Önizleme
                        </div>
                        <Link href="/" className="bg-black dark:bg-white !bg-opacity-30 hover:!bg-opacity-20 transition-colors">
                            İptal
                        </Link>
                        <div className="bg-green-600 hover:bg-green-700 transition-colors flex items-center" onClick={() => onSubmit(true)}>
                            Kaydet
                        </div>
                        <div className="bg-green-600 hover:bg-green-700 transition-colors" onClick={() => onSubmit()}>
                            Kaydet ve Çık
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6 text-2xl h-full *:flex *:flex-col *:gap-2 *:">
                    <div>
                        Title
                        <input type="text" defaultValue={title.current} className="w-1/2 !min-w-max" spellCheck={false} onChange={(e) => { title.current = e.target.value }} />
                    </div>
                    <div>
                        Description
                        <TextareaAutosize defaultValue={description.current} className="w-1/2 min-h-[6em]" spellCheck={false} onChange={(e) => { description.current = e.target.value }} />
                    </div>
                    <div>
                        Tags
                        <TagSelector tags={tags} setTags={(state) => setTags(state)} />
                        {tags.length === 0 ? (
                            <div>
                                No tags
                            </div>
                        ) : (
                            <div className="flex gap-2 text-xl">
                                {[...tags].reverse().map((tag, index) => (
                                    <div key={index} className="bg-[field] p-2 py-1 rounded-xl flex items-center gap-1">
                                        {tag}
                                        <CrossIcon className="cursor-pointer hover:!text-red-600 transition-colors" onClick={() => setTags([...tags.filter(t => t !== tag)])} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-3 flex-1 font-normal">
                        Content
                        <TextareaAutosize defaultValue={content} spellCheck={false} className="text-2xl min-h-[calc(100vh-2rem)] mb-4 mt-2" onChange={(e) => setContent(e.target.value)} />
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    );
}