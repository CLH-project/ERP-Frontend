'use client'

import { Button, Header, TabelaProdutos, CadastroProdutoModal } from "@/components";
import { useRouter } from "next/navigation"

export default function produtos() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col ">
      <Header />
      <div className="mt-10 flex flex-col px-5 md:px-24 md:justify-center">
        <div className="px-5">
          <h1 className="text-2xl font-bold mb-10">Produtos</h1>
        </div>
        <div className="px-5">
          <div>
            <CadastroProdutoModal />
          </div>
          <div>
            <TabelaProdutos />
          </div>
          <div className="w-full md:mt-2 flex md:justify-end" >
            <div className="w-full md:w-[15rem]">
               <Button theme="back" functionName="Voltar para tela inicial" type="button" onClick={() => router.push("/inicio")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}