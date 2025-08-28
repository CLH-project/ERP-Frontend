'use client';

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
  const handleDelete = async (id: string) => {
    if (confirm("Deseja apagar o fornecedor")) {
      try {
        console.log("aqui")
        await axios.delete(`http://localhost:8080/fornecedor/${id}`);
        fetchFornecedores(pager.currentPage)
      } catch (error) {
        console.log(error);
      }
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
    <div className=" flex flex-col justify-center items-center">

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className="flex gap-10 mt-5 mb-5">
            <select className="px-5 py-3 rounded-2xl border cursor-pointer" value={filtroCampo} onChange={(e) => setFiltroCampo(e.target.value)}>
              <option value="nome">Nome</option>
              <option value="cnpj">CNPJ</option>
            </select>

            <input
              className="px-5 py-3 rounded-2xl border"
              type="text"
              placeholder={`Filtrar por ${filtroCampo}`}
              value={filtroTexto}
              onChange={(e) => setFiltroTexto(e.target.value)}
            />
          </div>

        <div className="rounded-2xl border-zinc-300 border p-1 overflow-x-auto w-[90%]">
          <table className="min-w-full table-fixed">
            <thead className="text-center">
              <tr className="w-full">
                <th scope="col" className="w-4 px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Nome</th>
                <th scope="col" className="px-6 py-3">CNPJ</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Telefone</th>
              </tr>
            </thead>

            <tbody className="rounded-2xl text-center">
              {fornecedoresFiltrados.map((fornecedor, index) => (
                <tr className=" rounded-2xl bg-white dark:bg-gray-800 hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-gray-600" key={index}>
                  <td scope="row" className="px-4 py-2">{fornecedor.id}</td>
                  <td scope="row" className="px-6 py-4">{fornecedor.nome}</td>
                  <td scope="row" className="px-6 py-4">{fornecedor.cnpj}</td>
                  <td scope="row" className="px-6 py-4">{fornecedor.email}</td>
                  <td scope="row" className="px-6 py-4">{fornecedor.telefone}</td>
                  <td scope="row" className="px-6 py-4"><button className="hover:opacity-50 cursor-pointer" onClick={() => handleDelete(fornecedor.id)}>deletar</button></td>
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