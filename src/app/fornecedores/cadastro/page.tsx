'use client'

import {FornecedorCadastroForm, Header} from "@/components"

export default function CadastroFornecedores() {
    return (
        <div className="w-[90%] h-screen flex flex-col items-center mx-auto">
            <Header />

            <div className="flex flex-col items-center justify-center px-5 py-6 bg-gray-200 rounded-2xl">
                <FornecedorCadastroForm/>
            </div>
            
        </div>
    )
}