'use client'

import { useRouter } from "next/navigation"
import { TabelaClientes, Header, Button, CadastroClienteModal } from "@/components";

export default function ListaClientes() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col ">
      <Header/>
      <div className="mt-10 flex flex-col px-5 md:px-24 md:justify-center">
        <div className="text-2xl font-bold mb-5">
          <h1>Clientes</h1>
        </div>
        <div>
          <div>
            <CadastroClienteModal />
          </div>
          <TabelaClientes />
          <div className="w-full md:mt-2 flex md:justify-end" >
            <div className="w-full md:w-[15rem]">
               <Button theme="back" functionName="Voltar para tela inicial" type="button" onClick={() => router.push("/inicio")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}