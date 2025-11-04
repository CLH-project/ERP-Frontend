'use client'

import { useRouter } from "next/navigation"
import { Button, CadastroUsuarioModal, Header, TabelaUsuarios, Template } from "@/components";

export default function Inicio() {

    const router = useRouter();

    return (
        <Template>
            <div className="">
                <div className="text-3xl md:text-4xl lg:text-5xl mb-10">
                    <h1>Usuários</h1>
                </div>
                <div>
                    <div className="mb-5">
                        <CadastroUsuarioModal />
                    </div>
                    <TabelaUsuarios />
                </div>
            </div>
        </Template>
    )
}