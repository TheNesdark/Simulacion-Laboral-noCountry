import { Doctor } from "@/types";
import { API_BASE_URL } from "./config";

export async function getAllMedicos(): Promise<Doctor[]> {
    const res = await fetch(`${API_BASE_URL}/medicos`);
    if (!res.ok) throw new Error("Error fetching users");
    return res.json();
}