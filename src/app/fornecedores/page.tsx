'use client'

import { useRouter } from "next/navigation"
import { TableFornecedores, Header, Button, CadastroFornecedorModal } from "@/components";

export default function ListaFornecedores() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col px-5">
      <Header />
      <div className="mt-10 flex flex-col">
        <div className="text-2xl font-bold mb-5">
            <h1>Fornecedores</h1>
          </div>
        <div className="">
          <div>
            <CadastroFornecedorModal />
          </div>
          <TableFornecedores />
          <div className="w-full flex justify-center mb-5 mt-5">
            <Button functionName="Voltar para tela inicial" type="button" onClick={() => router.push("/inicio")} />
          </div>
        </div>
      </div>
    </div>
  );
}