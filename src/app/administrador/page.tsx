'use client'

import { useRouter } from "next/navigation"
import { Button, CadastroUsuarioModal, Header, TabelaUsuarios } from "@/components";

export default function Inicio() {

    const router = useRouter();

    return (
        <div className="w-full h-screen flex flex-col">
            <Header />

            <div className="mt-10 flex flex-col px-5">
                <div className="text-2xl font-bold mb-5">
                    <h1>Usuários</h1>
                </div>
                <div>
                    <div>
                        <CadastroUsuarioModal />
                    </div>
                    <TabelaUsuarios />
                    <div className="w-full flex justify-center mb-5">
                        <Button theme="back" functionName="Voltar para tela inicial" type="button" onClick={() => router.push("/inicio")} />
                    </div>
                </div>
            </div>
        </div>
    )
}