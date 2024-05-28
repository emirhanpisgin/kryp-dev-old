import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

export type DialogContextType = {
    dialogComponent?: React.ReactNode;
    setDialogComponent: Dispatch<SetStateAction<JSX.Element | undefined>>;
    isVisible: boolean;
    clearDialog: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [dialogComponent, setDialogComponent] = useState<JSX.Element | undefined>(undefined);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!dialogComponent) return;

        setIsVisible(true);
    }, [dialogComponent]);

    function clearDialog() {
        setIsVisible(false);
        setDialogComponent(undefined);
    }

    return (
        <DialogContext.Provider
            value={{
                dialogComponent,
                setDialogComponent,
                isVisible,
                clearDialog,
            }}
        >
            {children}
        </DialogContext.Provider>
    );
};

export function useDialog() {
    const context = useContext(DialogContext);

    if (context === undefined) {
        throw new Error("useDialog must be used within a DialogProvider");
    }

    return context;
}
