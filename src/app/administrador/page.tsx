'use client'

import { useRouter } from "next/navigation"
import { Button, CadastroUsuarioModal, Header, TabelaUsuarios } from "@/components";

export default function Inicio() {

    const router = useRouter();

    return (
        <div className="w-full h-screen flex flex-col">
            <Header />
            <div className="mt-10 flex flex-col px-5 md:px-24 md:justify-center">
                <div className="text-2xl font-bold mb-5">
                    <h1>Usuários</h1>
                </div>
                <div>
                    <div className="mb-5">
                        <CadastroUsuarioModal />
                    </div>
                    <TabelaUsuarios />
                    <div className="w-full md:mt-2 flex md:justify-end" >
                        <div className="w-full md:w-[20rem]">
                            <Button theme="back" functionName="Voltar para tela inicial" type="button" onClick={() => router.push("/inicio")} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}