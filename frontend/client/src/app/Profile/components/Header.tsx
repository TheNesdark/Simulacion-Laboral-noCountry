"use client";
import "@/styles/components/layout/Header.css";
import { useRouter } from "next/navigation";
import { BackIcon } from "@/components/icons";

export default function Header() {
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	return (
		<header className="header">
			<button className="back-link" onClick={handleBack}>
				<BackIcon />
			</button>
			<h1>Perfil</h1>
		</header>
	);
}
