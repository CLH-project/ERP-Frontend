'use client'

import { Header } from "@/components"
import { useEffect, useState } from "react"

interface User {
    id: string;
    nome: string;
    cargo?: string,
}

export default function Inicio() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="w-full h-screen flex flex-col">
            <Header />

            <div className="w-full p-5 flex justify-center ">
                <div className="mt-5 rounded-2xl bg-[#3D2422] shadow-md px-5 py-4 flex flex-col-reverse md:flex-row items-center ">
                    <h1 className="text-white text-xl font-medium max-w-[22rem]">Bem vindo de volta, <span className="font-bold "> {user?.nome}</span>, tenha um ótimo dia!</h1>
                    <img className="min-w-[8rem] max-w-[16rem]" src="/image/logo-image.svg" alt="" />
                </div>
            </div>
        </div>
    )
}