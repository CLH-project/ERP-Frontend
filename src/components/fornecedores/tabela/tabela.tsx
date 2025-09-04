'use client';

import { ModalConfirm } from "@/components/alerts/alerts";
import { LoadingSpinner } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";

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
    try {
      if (filtroCampo === 'todos') {
        const response = await axios.get(`http://localhost:8080/fornecedor?page=${page}`);
        setFornecedores(response.data.data);
        setPager(response.data.pager);
      } else {
        const response = await axios.get(`http://localhost:8080/fornecedor/filter`, {
          params: {
            [filtroCampo]: filtroTexto,
          },
        });

        setFornecedores(response.data.data);
        setPager({ currentPage: 1, totalPages: 1, perPage: response.data.data.length, total: response.data.data.length });
      }
    } catch (error) {
      // Trocar por alerta de erro real
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
      <div className="flex gap-2 mt-5 mb-5 px-4">
        <select className="px-4 py-2 rounded-xl border w-full sm:w-auto" value={filtroCampo} onChange={(e) => setFiltroCampo(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="nome">Nome</option>
          <option value="cnpj">CNPJ</option>
        </select>

        <input className="px-4 py-2 rounded-xl border w-full sm:w-auto"
          type="text" placeholder={`Filtrar por ${filtroCampo}`} value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)} />

        <button className="px-4 text-md bg-[#725743] rounded-2xl text-white font-bold py-3 hover:cursor-pointer hover:opacity-90"
          onClick={() => pesquisarFornecedores(1)}>Pesquisar</button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="rounded-2xl border border-zinc-300 p-1 overflow-x-auto w-full max-w-[90%] mx-auto shadow-md">
            <table className="w-full table-auto text-sm sm:text-base">
              <thead className="text-center">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nome</th>
                  <th className="px-4 py-2">CNPJ</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Telefone</th>
                  <th className="px-4 py-2">Ações</th>
                </tr>
              </thead>

              <tbody className="text-center">
                { fornecedores.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center">Nenhum fornecedor encontrado</td>
                  </tr>
                ) :
                fornecedores.map((fornecedor, index) => (
                  <tr key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <td className="px-4 py-3">{fornecedor.id}</td>
                    <td className="px-4 py-3">{fornecedor.nome}</td>
                    <td className="px-4 py-3">{fornecedor.cnpj}</td>
                    <td className="px-4 py-3">{fornecedor.email}</td>
                    <td className="px-4 py-3">{fornecedor.telefone}</td>
                    <td className="px-4 py-3">
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

          <div className="flex gap-6 p-3">
            <button onClick={() => mudancaPagina(pager.currentPage - 1)} disabled={pager.currentPage === 1}>
              ⬅ Anterior
            </button>
            <span>Página {pager.currentPage} de {pager.totalPages}</span>
            <button onClick={() => mudancaPagina(pager.currentPage + 1)} disabled={pager.currentPage === pager.totalPages}>
              Próxima ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};
