'use client'

import { Button, Header, TabelaProdutos, FormCadastroProduto } from "@/components";
import { useRouter } from "next/navigation"


export default function produtos() {

    const router = useRouter();

    return (
        <div className="w-full flex flex-col ">
              <Header />
              <div  className="mt-10 flex flex-col">
                <div className="w-full px-10">
                  <h1 className="text-2xl font-bold mb-10 ml-5">Produtos</h1>
                </div>
                <FormCadastroProduto />
                <TabelaProdutos />
                <div className="w-[90%] flex justify-center m-auto mt-5">
                  <Button functionName="Voltar para tela inicial" type="button" onClick={() => router.push("/inicio")} />
                </div>
              </div>
        </div>
    )
}