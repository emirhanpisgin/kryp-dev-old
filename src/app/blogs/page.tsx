import { allDocs } from "contentlayer/generated";
import Link from "next/link";

export default async function Blogs() {
    return (
        <div>
            {allDocs.map((doc, index) => (
                <Link key={index} href={`/blogs/${doc.slugAsParams}`}>{doc.title}</Link>
            ))}
        </div>
    );
}
