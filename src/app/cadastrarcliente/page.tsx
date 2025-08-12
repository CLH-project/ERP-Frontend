'use client'

import {ClienteCadastroForm } from "@/components";

export default function cadastrarCliente() {
    return (
        <div className="w-[90%] h-screen flex flex-col items-center justify-center mx-auto mt-10">
            <div>

            </div>

            <div>
                <div className="w-full"><h1 className="text-2xl font-bold mb-10 ml-5">Cliente</h1></div>
                <div className="flex flex-col items-center justify-center px-5 py-6 bg-gray-200 rounded-2xl">
                    <ClienteCadastroForm />
                </div>
            </div>
        </div>
    );
}