'use client';

import { ModalConfirm } from "@/components/alerts/alerts";
import axios from "axios";
import { useEffect, useState } from "react";

interface Fornecedor {
  id: string,
  nome: string,
  cnpj: string,
  email: string,
  telefone: string
}


export const TableFornecedores: React.FC = () => {

  const [fornecedor, setFornecedores] = useState<Fornecedor[]>([]);
  const [pager, setPager] = useState({ currentPage: 1, totalPages: 0, perPage: 10, total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchFornecedores = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/fornecedor?page=${page}`);
      setFornecedores(response.data.data);
      setPager(response.data.pager);
    } catch (error) {
      alert("Erro ao retornar os clientes");
    } finally {
      setLoading(false);
    }
  };


  // Mudança de página da tabela
  useEffect(() => {
    fetchFornecedores(pager.currentPage);
  }, [pager.currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pager.totalPages) {
      setPager((prev) => ({ ...prev, currentPage: page }));
    }
  };


  // Exclusão de cliente pelo id do mesmo

  const [showModal, setShowModal] = useState(false);




  const handleDelete = async (id: string) => {
      try {
        await axios.delete(`http://localhost:8080/fornecedor/${id}`);
        setShowModal(false)
        fetchFornecedores(pager.currentPage)
      } catch (error) {
        alert("erro ao apagar")
      }
    
  }

  // Filtro do select de consulta dos clientes
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroCampo, setFiltroCampo] = useState('nome');

  const fornecedoresFiltrados = fornecedor.filter((fornecedores) => {

    const valorCampo = fornecedores[filtroCampo as keyof Fornecedor];

    return valorCampo.toLowerCase().includes(filtroTexto.toLowerCase());
  });



  return (
    <div className="flex flex-col items-center w-full">

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className="flex gap-2 mt-5 mb-5 px-4">
            <select className="px-4 py-2 rounded-xl border w-full sm:w-auto" value={filtroCampo} onChange={(e) => setFiltroCampo(e.target.value)}>
              <option value="nome">Nome</option>
              <option value="cnpj">CNPJ</option>
            </select>

            <input
              className="px-4 py-2 rounded-xl border w-full sm:w-auto"
              type="text"
              placeholder={`Filtrar por ${filtroCampo}`}
              value={filtroTexto}
              onChange={(e) => setFiltroTexto(e.target.value)}
            />
          </div>

          <div className="rounded-2xl border border-zinc-300 p-1 overflow-x-auto w-full max-w-[90%] mx-auto">
            <table className="w-full table-auto text-sm sm:text-base">
              <thead className="text-center">
                <tr className="w-full">
                  <th scope="col" className="px-4 py-2">ID</th>
                  <th scope="col" className="px-4 py-2">Nome</th>
                  <th scope="col" className="px-4 py-2">CNPJ</th>
                  <th scope="col" className="px-4 py-2">Email</th>
                  <th scope="col" className="px-4 py-2">Telefone</th>
                  <th scope="col" className="px-4 py-2">Ações</th>
                </tr>
              </thead>

              <tbody className="rounded-2xl text-center">
                {fornecedoresFiltrados.map((fornecedor, index) => (
                  <tr className=" rounded-2xl bg-white dark:bg-gray-800 hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-gray-600" key={index}>
                    <td scope="row" className="px-4 py-3">{fornecedor.id}</td>
                    <td scope="row" className="px-4 py-3">{fornecedor.nome}</td>
                    <td scope="row" className="px-4 py-3">{fornecedor.cnpj}</td>
                    <td scope="row" className="px-4 py-3">{fornecedor.email}</td>
                    <td scope="row" className="px-4 py-3">{fornecedor.telefone}</td>
                    <td scope="row" className="px-4 py-3">
                      <button className="hover:opacity-50 cursor-pointer w-4" onClick={() => setShowModal(true)}>
                        <img src={"./icons/remove-icon.svg"} />
                      </button>
                      <ModalConfirm title="Deletar" message="Deseja apagar o fornecedor?"
                        isOpen={showModal}
                        onConfirm={() => handleDelete(fornecedor.id)} onCancel={() => setShowModal(false)}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className=" flex gap-6 p-3">
            <button className="hover:opacity-50 cursor-pointer" onClick={() => handlePageChange(pager.currentPage - 1)} disabled={pager.currentPage === 1}>
              ⬅ Anterior
            </button>
            <span className="text-zinc-600">
              Página {pager.currentPage} de {pager.totalPages}
            </span>
            <button className="hover:opacity-50 cursor-pointer" onClick={() => handlePageChange(pager.currentPage + 1)} disabled={pager.currentPage === pager.totalPages}>
              Próxima ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
}