import { useDialog } from "./context/DialogContext";
import { useRef } from "react";

export default function DialogRenderer() {
    const { dialogComponent, isVisible, clearDialog } = useDialog();
    const dialogRef = useRef<HTMLDivElement>(null);

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (e.target === dialogRef.current) {
            clearDialog();
        }
    };

    return (
        <div
            className={`h-screen w-screen absolute top-0 left-0 pointer-events-none transition-opacity duration-300 ${isVisible ? "pointer-events-auto opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={(e) => handleClick(e)}
        >
            <div ref={dialogRef} className="bg-black/50 grid place-items-center h-full w-full">
                {dialogComponent}
            </div>
        </div>
    );
}