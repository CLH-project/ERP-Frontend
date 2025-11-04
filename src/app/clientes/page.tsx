'use client'

import { useRouter } from "next/navigation"
import { TabelaClientes, Header, Button, CadastroClienteModal, Template } from "@/components";

export default function ListaClientes() {
  const router = useRouter();

  return (
    <Template>
      <div className="w-full">
        <div className="text-3xl md:text-4xl lg:text-5xl mb-10">
          <h1>Clientes</h1>
        </div>
        <div>
          <CadastroClienteModal />
          <TabelaClientes />
          <div className="w-full md:mt-2 flex md:justify-end">
          </div>
        </div>
      </div>
    </Template>
  );
}