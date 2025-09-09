'use client'

import { useRouter } from "next/navigation"
import { TabelaClientes, Header, Button } from "@/components";

export default function ListaClientes() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col px-2">
      <Header />
      <div className="mt-10 flex flex-col">
        <div className="px-5">
          <div className="text-2xl font-bold mb-5">
            <h1>Clientes</h1>
          </div>
          <TabelaClientes />
          <div className="w-full flex justify-center mb-5 mt-5">
            <Button functionName="Voltar para tela inicial" type="button" onClick={() => router.push("/inicio")} />
          </div>
        </div>
      </div>
    </div>
  );
}