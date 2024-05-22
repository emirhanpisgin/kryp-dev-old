import { cn } from "@/utils";
import { ComponentProps, ReactNode } from "react";

interface MaxWidthWrapperProps extends ComponentProps<'div'> {
    children: ReactNode
}

export default function MaxWidthWrapper({ children, className, ...props }: MaxWidthWrapperProps) {
    return (
        <div className={cn("w-full md:w-10/12 lg:w-9/12 flex flex-col items-center", className)} {...props}>{children}</div>
    );
}