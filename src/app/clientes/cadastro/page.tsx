'use client'

import {Button, FormCadastroCliente, Header } from "@/components";
import { useRouter } from "next/navigation";

export default function CadastroClientes() {

    const router = useRouter();

    return (
        <div className="w-full h-screen flex flex-col items-center">
            <Header/>

            <div>
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-10 ml-5">Cliente</h1>
                </div>
                
                <div className="flex flex-col items-center justify-center px-5 py-6 bg-gray-200 rounded-2xl">
                    <FormCadastroCliente />
                </div>
                    
                <div className="w-full flex justify-center mt-5">
                    <Button functionName="Voltar para tela inicial" type="button"  onClick={() => router.push("/inicio")}/>
                </div>
            </div>
        </div>
    );
}