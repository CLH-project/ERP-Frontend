'use client'

import {Button, ClienteCadastroForm, Sidebar } from "@/components";
import { useRouter } from "next/navigation";

export default function cadastrarCliente() {

    const router = useRouter();

    return (
        <div className="w-[90%] h-screen flex flex-col items-center mx-auto">
            <div className="w-full flex justify-between items-center p-2">
                <Sidebar/>
                <img className="w-10" src="/image/logo-image.svg" alt="" />
            </div>

            <div>
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-10 ml-5">Cliente</h1>
                </div>
                
                <div className="flex flex-col items-center justify-center px-5 py-6 bg-gray-200 rounded-2xl">
                    <ClienteCadastroForm />
                </div>
                    
                <div className="w-full flex justify-center mt-5">
                    <Button functionName="Voltar" type="button"  onClick={() => router.back()}/>
                </div>
            </div>
        </div>
    );
}