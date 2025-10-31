"use client"

import { useRouter } from "next/navigation";

export default function MessageTurnoPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-100 to-emerald-100 p-4">
            <div className="bg-rose-200 rounded-full w-72 h-72 flex flex-col items-center justify-center text-center shadow-lg">
                <h1 className="text-3xl font-bold mb-2 text-blue-700">¡Realizado con éxito!</h1>
                <p className="text-gray-700">Tu turno ha sido reservado con éxito.</p>
                <p className="text-gray-700">Te llegará un recordatorio un día antes del turno.</p>
            </div>

            <button
                className="mt-8 w-full bg-[#00579b] text-white font-semibold rounded-lg py-2 hover:bg-[#00447a] transition"
                onClick={() => router.push('/')}
            >
                Hecho
            </button>
        </div>

    );
}
