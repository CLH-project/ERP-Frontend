'use client'

import { TabelaProdutos, CadastroProdutoModal, Template } from "@/components";

export default function produtos() {
  return (
    <Template>
      <div className="w-full">
        <div className="text-3xl font-bold text-[#725742] md:text-4xl lg:text-5xl mb-10">
          <h1>Produtos</h1>
        </div>

        <div className="bg-[#f3f3f3] p-4 rounded-2xl">
          <div className="bg-white p-6 rounded-2xl">
            <TabelaProdutos />
            <div className="w-full md:mt-2 flex md:justify-end" >
            </div>
          </div>
        </div>
      </div>
    </Template>
  )
}