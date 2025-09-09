'use client'

import { Button, Header, TabelaProdutos, FormCadastroProduto } from "@/components";
import { useRouter } from "next/navigation"


export default function produtos() {

  const router = useRouter();

  return (
    <div className=" w-full h-screen flex flex-col px-20">
      <Header />
      <div className="mt-10 flex flex-col">
        <div className="px-5">
          <h1 className="text-2xl font-bold mb-10">Produtos</h1>
        </div>
        <div className="px-5">
          <div className="mb-5">
            <FormCadastroProduto />
          </div>
          <div>
            <TabelaProdutos />
          </div>
          <div className="w-[90%] flex justify-center m-auto mt-5">
            <Button functionName="Voltar para tela inicial" type="button" onClick={() => router.push("/inicio")} />
          </div>
        </div>
      </div>
    </div>
  )
}