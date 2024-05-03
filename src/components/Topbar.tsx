import Link from "next/link";
import { URLArrowIcon } from "./Icons";
import ChangeTheme from "./ChangeTheme";

export default function Topbar() {
    return (
        <div className="absolute top-0 w-full flex justify-end items-center">
            <ChangeTheme />
            <Link href={"https://github.com/kryparnold/kryp-dev"} target="_blank" className="flex items-center gap-1 p-5 text-2xl opacity-30 hover:opacity-100 transition-opacity duration-300">
                <URLArrowIcon className="size-8 -rotate-[135deg] text-inherit" />
                Source
            </Link>
        </div>
    );
}
