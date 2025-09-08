'use client'

import { useRouter } from "next/navigation"
import { TableFornecedores, Header, Button } from "@/components";

export default function ListaFornecedores() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col ">
      <Header />
      <div className="mt-10 flex flex-col">
        <div className="w-full px-10">
          <h1 className="text-2xl font-bold mb-10 ml-5">Fornecedores</h1>
        </div>
        <div className="px-5">
          <TableFornecedores />
          <div className="w-[90%] flex justify-center m-auto mt-5">
            <Button functionName="Voltar para tela inicial" type="button" onClick={() => router.push("/inicio")} />
          </div>
        </div>
      </div>
    </div>
  );
}