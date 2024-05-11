import { ChangeEvent, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface TagSelectorProps {
    tags: string[],
    setTags: (state: string[]) => void;
}

export default function TagSelector({ tags, setTags }: TagSelectorProps) {
    const textArea = useRef<HTMLTextAreaElement>(null);
    const [tagInput, setTagInput] = useState("");

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        //@ts-expect-error
        const eventType: string = e.nativeEvent.inputType;

        if (eventType === "insertLineBreak") {
            setTags([...tags, tagInput]);
            e.target.value = "";
        } else {
            setTagInput(e.target.value);
        }
    }

    return (
        <TextareaAutosize className="max-h-[2em] w-1/3 !min-w-0" ref={textArea} onChange={(e) => handleChange(e)} />
    );
}