'use client'

import { Header, TabelaVendas } from "@/components"
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

            <div className="w-full p-6 sm:p-8 flex flex-col items-center justify-center gap-6">
                <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-6 py-6 md:p-8 rounded-3xl bg-[#4A302D] shadow-2xl transition-all duration-300 hover:shadow-3xl">

                    <div className="order-2 md:order-1 text-center md:text-left">
                        <h1 className="text-2xl sm:text-3xl text-[#F0EAD6] font-light max-w-lg leading-snug">
                            Bem-vindo de volta,
                            <span className="font-extrabold block sm:inline-block mt-1 sm:mt-0 text-3xl sm:text-4xl">
                                {user?.nome} 
                            </span>!           
                            Tenha um ótimo dia.
                        </h1>
                    </div>

                    <div className="order-1 md:order-2 flex-shrink-0">
                        <img className="w-48 h-auto sm:w-48 md:w-48 lg:w-64 transition-transform duration-300 hover:scale-105"
                            src="/image/logo-image.svg"
                            alt="Logo do sistema"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-10 flex flex-col px-5 md:px-24 md:justify-center">
                <div className="px-5">
                    <h1 className="text-2xl font-bold mb-10">Últimas Vendas Realizadas</h1>
                </div>
                <TabelaVendas />
            </div>

        </div >
    )
}