'use client'

import {useRouter} from "next/navigation"
import { TableFornecedores, Header, Button } from "@/components";

export default function ListaFornecedores() {
  const router = useRouter();

  return (
    <div className="w-[90%] h-screen flex flex-col items-center mx-auto">
      <Header />
      <div>
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-10 ml-5">Fornecedores</h1>
        </div>
        <TableFornecedores />
        <div className="w-[90%] flex justify-center m-auto mt-5">
          <Button functionName="Voltar para tela inicial" type="button" onClick={() => router.push("/inicio")} />
        </div>
      </div>
    </div>
  );
}