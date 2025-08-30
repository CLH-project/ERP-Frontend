'use client';

import axios from "axios";
import { useEffect, useState } from "react";


interface Cliente {
  id: string,
  nome: string,
  cpf: string,
  telefone: string
}


export const TableClientes: React.FC = () => {

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [pager, setPager] = useState({ currentPage: 1, totalPages: 0, perPage: 10, total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchClientes = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/clientes?page=${page}`);
      setClientes(response.data.data);
      setPager(response.data.pager);
    } catch (error) {
      alert("Erro ao retornar os clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes(pager.currentPage);
  }, [pager.currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pager.totalPages) {
      setPager((prev) => ({ ...prev, currentPage: page }));
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Deseja apagar o cliente")) {
      try {
        console.log("aqui")
        await axios.delete(`http://localhost:8080/clientes/${id}`);
        fetchClientes(pager.currentPage)
      } catch (error) {
        console.log(error);
      }
    }
  }

  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroCampo, setFiltroCampo] = useState('nome');

  const clientesFiltrados = clientes.filter((cliente) => {

    const valorCampo = cliente[filtroCampo as keyof Cliente];
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
              <option value="cpf">CPF</option>
              <option value="telefone">Telefone</option>
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
              <thead className="text-center bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-2">ID</th>
                  <th scope="col" className="px-4 py-2">Nome</th>
                  <th scope="col" className="px-4 py-2">CPF</th>
                  <th scope="col" className="px-4 py-2">Telefone</th>
                  <th scope="col" className="px-4 py-2">Ações</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {clientesFiltrados.map((cliente, index) => (
                  <tr key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">

                    <td className="px-4 py-3">{cliente.id}</td>
                    <td className="px-4 py-3">{cliente.nome}</td>
                    <td className="px-4 py-3">{cliente.cpf}</td>
                    <td className="px-4 py-3">{cliente.telefone}</td>
                    <td className="px-4 py-3">
                      <button className="w-4 hover:opacity-70 transition-opacity" onClick={() => handleDelete(cliente.id)}><img src={"./icons/remove-icon.svg"}/></button>
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