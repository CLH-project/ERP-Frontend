'use client';

import { ModalConfirm } from "@/components/alerts/alerts";
import { Button, LoadingSpinner, PaginateButton, TextField } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";
import { searchFornecedor } from "@/services/fornecedor/searchFornecedor";

interface Fornecedor {
  id: string;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
}

export const TabelaFornecedores: React.FC = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [pager, setPager] = useState({ currentPage: 1, totalPages: 0, perPage: 10, total: 0 });
  const [loading, setLoading] = useState(false);

  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroCampo, setFiltroCampo] = useState('todos');

  const pesquisarFornecedores = async (page = 1) => {
    setLoading(true);
    console.log(filtroCampo, filtroTexto)
    try {
      if (filtroCampo === 'todos') {
        const response = await axios.get(`http://localhost:8080/fornecedores?page=${page}`);
        setFornecedores(response.data.fornecedores);
        setPager(response.data.pager);
      } else {
        const response: any = await searchFornecedor("nome", filtroTexto);
        console.log(response)

        setFornecedores(response.data.fornecedores);
        setPager({ currentPage: 1, totalPages: 1, perPage: 10, total: 1 });
      }
    } catch (error) {
     
      alert("Erro ao retornar os fornecedores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { pesquisarFornecedores(1); }, []);

  const mudancaPagina = (page: number) => {
    if (page >= 1 && page <= pager.totalPages) {
      setPager((prev) => ({ ...prev, currentPage: page }));
      pesquisarFornecedores(page);
    }
  };

  const [fornecedorParaDeletar, setFornecedorParaDeletar] = useState<Fornecedor | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/fornecedor/${id}`);
      setFornecedorParaDeletar(null);

      pesquisarFornecedores(pager.currentPage);
    } catch (error) {
      // Trocar por alerta de erro real
      alert("Erro ao apagar");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full flex flex-col gap-2 mb-5">
        <TextField name="filtro" value={filtroTexto} placeholder={filtroCampo} change={(e) => setFiltroTexto(e.target.value)} />
        <Button onClick={() => pesquisarFornecedores(1)} functionName="Pesquisar" theme="search" />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="shadow-md rounded-2xl border border-zinc-300 overflow-x-auto w-full mx-auto p-5">
            <table className="w-full table-auto">
              <thead className="text-center">
                <tr>
                  <th className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">ID</th>
                  <th className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Nome</th>
                  <th className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">CNPJ</th>
                  <th className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Email</th>
                  <th className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Telefone</th>
                  <th className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Ações</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {fornecedores.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center">Nenhum fornecedor encontrado</td>
                  </tr>
                ) :
                  fornecedores.map((fornecedor, index) => (
                    <tr key={index} className="bg-white hover:bg-gray-100 dark:hover:bg-gray-100 cursor-pointer">
                      <td className="font-semibold px-4 py-4 border-b-1 border-gray-300">{fornecedor.id}</td>
                      <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{fornecedor.nome}</td>
                      <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{fornecedor.cnpj}</td>
                      <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{fornecedor.email}</td>
                      <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{fornecedor.telefone}</td>
                      <td className="font-medium px-4 py-4 border-b-1 border-gray-300">
                        <button className="hover:opacity-50 cursor-pointer w-4" onClick={() => setFornecedorParaDeletar(fornecedor)}>
                          <img src="./icons/remove-icon.svg" />
                        </button>
                        <ModalConfirm
                          title="Deletar"
                          message={`Deseja apagar os dados do fornecedor ${fornecedorParaDeletar?.nome}?`}
                          onConfirm={() => {
                            if (fornecedorParaDeletar !== null) {
                              handleDelete(fornecedorParaDeletar.id);
                            }
                            setFornecedorParaDeletar(null);
                          }}
                          isOpen={fornecedorParaDeletar !== null}
                          onCancel={() => setFornecedorParaDeletar(null)}
                        />
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
};
