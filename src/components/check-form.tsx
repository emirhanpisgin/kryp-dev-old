import { deleteBlog } from "@/lib/queries";
import { useDialog } from "@/components/context/DialogContext";
import Balancer from "react-wrap-balancer";
import { useRouter } from "next/navigation";

export default function CheckForm({ id, title }: { id: string, title: string }) {
    const { clearDialog } = useDialog();
    const router = useRouter();

    return (
        <div className="bg-black p-3 text-2xl rounded-lg text-center">
            <Balancer>
                Wanna delete the blog titled {`"${title}"`}?
            </Balancer>
            <div className="flex justify-end gap-3">
                <div className="bg-green-500 px-2 py-1 rounded-lg cursor-pointer" onClick={async () => {
                    await deleteBlog(id);
                    router.refresh();
                    clearDialog();
                }}>
                    Yes
                </div>
                <div className="bg-red-600 px-2 py-1 rounded-lg cursor-pointer" onClick={() => clearDialog()}>
                    No
                </div>
            </div>
        </div>
    );
}