'use client'

import { TableClientes, Header } from "@/components";

export default function listaclientes() {
  return (
    <div className="w-[90%] h-screen flex flex-col items-center mx-auto">
      <Header />
      <div>

        <div className="w-full">
          <h1 className="text-2xl font-bold mb-10 ml-5">Clientes</h1>
        </div>

        <TableClientes />
      </div>
    
    </div>
  );
}