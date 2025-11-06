'use client'

import { CadastroUsuarioModal, Header, TabelaUsuarios, Template } from "@/components";

export default function Inicio() {
    return (
        <Template>
            <div className="">
                <div className="text-3xl font-bold text-[#725742] md:text-4xl lg:text-5xl mb-10">
                    <h1>Usuários</h1>
                </div>
                <div className="p-4 rounded-2xl bg-[#f3f3f3]">
                    <div className="bg-white rounded-2xl p-6">
                        <div className="mb-5 justify-end flex">
                            <CadastroUsuarioModal />
                        </div>
                        <TabelaUsuarios />
                    </div>
                </div>
            </div>
        </Template>
    )
}