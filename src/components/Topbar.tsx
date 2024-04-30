import Link from "next/link";
import { URLArrowIcon } from "./Icons";

export default function Topbar() {
    return (
        <div className="fixed top-0 w-full h-8">
            <Link href={"https://github.com/kryparnold/kryp-dev"} target="_blank" className="flex items-center gap-1 justify-end p-5 text-2xl text-white/30 hover:text-white transition-colors">
                <URLArrowIcon className="size-8 -rotate-[135deg] text-inherit" />
                Source
            </Link>
        </div>
    );
}
