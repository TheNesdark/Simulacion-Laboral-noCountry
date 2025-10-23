"use client";
import "@/styles/components/layout/Header.css";
import { useRouter } from "next/navigation";

export default function Header() {
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	return (
		<header className="header">
			<img src="/assets/icons/back-icon.svg" alt="Volver" onClick={handleBack} className="back-link" />
			<h1>Perfil</h1>
		</header>
	);
}
