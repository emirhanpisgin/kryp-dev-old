import { useDialog } from "../context/DialogContext";
import { useRef } from "react";

export default function DialogRenderer() {
    const { dialogComponent, isVisible, clearDialog } = useDialog();
    const dialogRef = useRef<HTMLDivElement>(null);

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (e.target === dialogRef.current) {
            clearDialog();
        }
    }

    return (
        <div
            className={`pointer-events-none absolute left-0 top-0 h-screen w-screen transition-opacity duration-300 ${isVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
            onClick={(e) => handleClick(e)}
        >
            <div ref={dialogRef} className="grid h-full w-full place-items-center bg-black/50">
                {dialogComponent}
            </div>
        </div>
    );
}
