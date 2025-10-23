"use client"

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function DropdownUser() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }

        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setIsOpen(false);
        }

        document.addEventListener("mousedown", onDoc);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDoc);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    return (
        <div className="dropdown-user" ref={ref}>
            <button
                aria-expanded={isOpen}
                aria-haspopup="menu"
                className="dropdown-toggle"
                onClick={() => setIsOpen((s) => !s)}
                type="button"
            >
                <img
                    src="/assets/example-photos/fadbb3fb1c636000b153327245aafd5c73dccc90.png"
                    alt="Usuario"
                    width={36}
                    height={36}
                    className="dropdown-avatar"
                />
            </button>

            {isOpen && (
                <div className="dropdown-menu" role="menu">
                    <Link href="/Profile" className="dropdown-item" role="menuitem">
                        Perfil
                    </Link>
                    <button className="dropdown-item" role="menuitem" onClick={() => alert('Cerrar sesión (stub)')}>
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
}