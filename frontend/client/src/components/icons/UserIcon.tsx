"use client";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
export default function UserProfile(){
    const { userData } = useAuth();
    return (
        <Image
          src={userData?.PhotoUrl || "/assets/example-photos/fadbb3fb1c636000b153327245aafd5c73dccc90.png"}
          alt="Usuario"
          width={40}
          height={40}
          className="dropdown-avatar"
          priority
        />
    );
}