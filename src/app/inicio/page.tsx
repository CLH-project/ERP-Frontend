'use client'

import { Header } from "@/components"
import { useAuth } from "@/services/usuario/auth/AuthContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function Inicio() {

    const usuario = useAuth();
    const router = useRouter(); 

    useEffect(() => {
        if (!usuario?.user) {
            router.push("/login")
        }
    } , [usuario])

    if (!usuario) return null;

    return (
        <div className="w-full h-screen flex flex-col">
            <Header/>
        </div>
    )
}