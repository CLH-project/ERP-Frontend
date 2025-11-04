'use client'

import { Button, Header, TabelaProdutos, CadastroProdutoModal, Template } from "@/components";
import { useRouter } from "next/navigation"

export default function produtos() {
  const router = useRouter();

  return (
    <Template>
      <div className="w-full">
        <div className="text-3xl md:text-4xl lg:text-5xl mb-10">
          <h1>Produtos</h1>
        </div>
        <div className="">
          <CadastroProdutoModal />
          <TabelaProdutos />
          <div className="w-full md:mt-2 flex md:justify-end" >
          </div>
        </div>
      </div>
    </Template>
  )
}