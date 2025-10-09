'use client';

import { ModalConfirm } from "@/components/alerts/alerts";
import { Button, PaginateButton } from "@/components/button";
import { SelectField, TextField } from "@/components/field";
import { LoadingSpinner } from "@/components/spinner";
import axios from "axios";
import { useEffect, useState } from "react";

import api from '@/services/api/api'

interface Cliente {
  id: string,
  nome: string,
  cpf: string,
  telefone: string
}

export const TabelaClientes: React.FC = () => {

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [pager, setPager] = useState({ currentPage: 1, totalPages: 0, perPage: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroCampo, setFiltroCampo] = useState('todos');

  const pesquisarClientes = async (page = 1) => {

    setLoading(true);
    try {
      if (filtroCampo === "todos") {

        const response = await api.get(`/clientes?page=${page}`)

        setClientes(response.data.data);
        setPager(response.data.pager);

      } else {

        const response = await api.get(`${filtroTexto}`)
        const cliente = response.data;

        if (cliente && cliente.id) {
          setClientes([cliente]);
          setPager({ currentPage: 1, totalPages: 1, perPage: 10, total: cliente ? 1 : 0 });
        } else {
          setClientes([]);
          setPager({ currentPage: 1, totalPages: 1, perPage: 10, total: cliente ? 1 : 0 });
        }
      }
    } catch (error) {
      // Trocar por alerta de erro
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    pesquisarClientes(1);
  }, []);

  const mudancaPagina = (page: number) => {
    if (page >= 1 && page <= pager.totalPages) {
      setPager((prev) => ({ ...prev, currentPage: page }));
      pesquisarClientes(page);
    }
  };

  const [clienteParaDeletar, setClienteParaDeletar] = useState<Cliente | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/clientes/${id}`);
      pesquisarClientes(pager.currentPage)
    } catch (error) {
      // Trocar por alerta de erro
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="w-full mt-4 mb-4 flex flex-col md:flex-row gap-3 ">
            <div className="md:w-[15rem]">
              <SelectField options={["todos", "id", "cpf"]} name="filtro" change={(e: any) => setFiltroCampo(e.target.value)} />
            </div>
            <div className="md:w-[30rem]">
              <TextField name="filtroTexto" type="text" placeholder={filtroCampo === "id" ? "Digite o ID do cliente" : filtroCampo === "cpf" ? "Digite o CPF do cliente" : "Pesquise por ID ou CPF"} value={filtroTexto} change={(e: any) => setFiltroTexto(e.target.value)} />
            </div>
            <div className="md:w-[15rem]">
              <Button theme="secondary" functionName="Pesquisar" onClick={() => pesquisarClientes(1)} />
            </div>

          </div>

          <div className="shadow-md rounded-2xl border border-zinc-300 overflow-x-auto w-full mx-auto p-5">
            <table className="w-full table-auto">
              <thead className="text-center">
                <tr>
                  <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">ID</th>
                  <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Nome</th>
                  <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">CPF</th>
                  <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Telefone</th>
                  <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Ações</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {clientes.length === 0 ? (
                  <tr >
                    <td colSpan={5} className="text-center py-4">Nenhum cliente encontrado</td>
                  </tr>
                ) :
                  clientes.map((cliente, index) => (
                    <tr key={index} className="bg-white hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors cursor-pointer">
                      <td className="font-semibold px-4 py-4 border-b-1 border-gray-300">{cliente.id}</td>
                      <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{cliente.nome}</td>
                      <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{cliente.cpf}</td>
                      <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{cliente.telefone}</td>
                      <td className="font-medium px-4 py-4 border-b-1 border-gray-300">
                        <button className="w-4 hover:opacity-70 transition-opacity cursor-pointer" onClick={() => setClienteParaDeletar(cliente)}>
                          <img src={"./icons/remove-icon.svg"} />
                        </button>
                        <ModalConfirm title="Deletar" message={`Deseja apagar os dados do cliente ${clienteParaDeletar?.nome}?`}
                          isOpen={clienteParaDeletar !== null}
                          onConfirm={() => {
                            if (clienteParaDeletar) {
                              handleDelete(clienteParaDeletar.id);
                            }
                            setClienteParaDeletar(null);
                          }} onCancel={() => setClienteParaDeletar(null)} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className=" w-full flex gap-4 p-3 justify-center items-center">
            <PaginateButton direction="previous" onClick={() => mudancaPagina(pager.currentPage - 1)} disabled={pager.currentPage === 1} />
            <span className="font-medium text-sm text-[#9B6D39]">
              Página {pager.currentPage} de {pager.totalPages}
            </span>
            <PaginateButton direction="next" onClick={() => mudancaPagina(pager.currentPage + 1)} disabled={pager.currentPage === pager.totalPages} />
          </div>
        </>
      )}
    </div>
  );
}