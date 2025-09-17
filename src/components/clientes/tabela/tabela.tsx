'use client';

import { ModalConfirm } from "@/components/alerts/alerts";
import { PaginateButton } from "@/components/button";
import { LoadingSpinner } from "@/components/spinner";
import axios from "axios";
import { useEffect, useState } from "react";

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
        const response = await axios.get(`http://localhost:8080/clientes?page=${page}`);

        setClientes(response.data.data);
        setPager(response.data.pager);
      } else {
        const response = await axios.get(`http://localhost:8080/clientes/${filtroTexto}`);

        const cliente = response.data;

        if (cliente && cliente.id) {
          setClientes([cliente]);
          setPager({ currentPage: 1, totalPages: 1, perPage: 10, total: cliente ? 1 : 0 });
        } else {      // Com isso quero garantir que a lista não seja undefined para que a lógica de montar somente tendo o tem funciona
          setClientes([]);
          setPager({ currentPage: 1, totalPages: 1, perPage: 10, total: cliente ? 1 : 0 });
        }
      }
    } catch (error) {
      // Trocar por alerta de erro
      console.log(error)
      alert();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { pesquisarClientes(1); }, []);

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
    <div className="flex flex-col items-center w-full">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="w-full flex flex-col gap-2 mt-3 mb-5">
            <select className="px-4 py-2 rounded-xl border w-full sm:w-auto" value={filtroCampo} onChange={(e) => setFiltroCampo(e.target.value)}>
              <option value="todos">Todos</option>
              <option value="id">ID</option>
              <option value="cpf">CPF</option>
            </select>

            <input
              className="px-4 py-2 rounded-xl border w-full sm:w-auto"
              type="text"
              placeholder={`Filtrar por ${filtroCampo}`}
              value={filtroTexto}
              onChange={(e) => setFiltroTexto(e.target.value)}
              disabled={filtroCampo === 'todos'}
            />

            <button className="px-4 text-md bg-[#725743] rounded-2xl text-white font-bold py-3 hover:cursor-pointer hover:opacity-90" onClick={() => pesquisarClientes(1)}>
              Pesquisar
            </button>
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
          <div className=" flex gap-6 p-3 items-center">
            <PaginateButton direction="previous" onClick={() => mudancaPagina(pager.currentPage - 1)} disabled={pager.currentPage === 1} />
            <span className="font-medium text-[#9B6D39]">
              Página {pager.currentPage} de {pager.totalPages}
            </span>
            <PaginateButton direction="next" onClick={() => mudancaPagina(pager.currentPage + 1)} disabled={pager.currentPage === pager.totalPages} />
          </div>
        </>
      )}
    </div>
  );
}