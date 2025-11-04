'use client'

import { useRouter } from "next/navigation"
import { TableFornecedores, Header, Button, CadastroFornecedorModal, Template } from "@/components";

export default function ListaFornecedores() {
  const router = useRouter();

  return (
    <Template>
      <div className="w-full">
        <div className="text-3xl md:text-4xl lg:text-5xl mb-10">
          <h1>Fornecedores</h1>
        </div>
        <div className="">
          <CadastroFornecedorModal />
          <TableFornecedores />
          <div className="w-full md:mt-2 flex md:justify-end" >
          </div>
        </div>
      </div>
    </Template>
  );
}