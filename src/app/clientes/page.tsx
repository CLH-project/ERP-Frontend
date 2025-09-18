'use client'

import { useRouter } from "next/navigation"
import { TabelaClientes, Header, Button, CadastroButtonModal, CadastroClienteModal } from "@/components";

export default function ListaClientes() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col px-5">
      <Header />
      <div className="mt-10 flex flex-col">
        <div className="text-2xl font-bold mb-5">
          <h1>Clientes</h1>
        </div>
        <div className="">
          <div className="">
            <CadastroClienteModal />
          </div>
          <TabelaClientes />
          <div className="w-full flex justify-center mb-5">
            <Button theme="back" functionName="Voltar para tela inicial" type="button" onClick={() => router.push("/inicio")} />
          </div>
        </div>
      </div>
    </div>
  );
}