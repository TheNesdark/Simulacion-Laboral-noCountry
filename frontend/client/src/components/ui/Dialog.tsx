"use client"

import React from "react";

interface DialogProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

const Dialog: React.FC<DialogProps> = ({
    open,
    setOpen,
    onConfirm,
    title = "Confirmar acción",
    message = "¿Deseas continuar?",
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="border border-[#00579b] bg-white rounded-lg shadow-lg max-w-sm w-full p-6 text-center">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                <p className="text-gray-700 text-sm mb-6">{message}</p>
                <div className="flex justify-between gap-3">
                    <button
                        type="button"
                        className="px-4 py-2 rounded-3xl border border-gray-300 hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 rounded-3xl bg-[#00579b] text-white hover:bg-[#00579b]/80"
                        onClick={() => {
                            onConfirm();
                            setOpen(false);
                        }}
                    >
                        Reservar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
