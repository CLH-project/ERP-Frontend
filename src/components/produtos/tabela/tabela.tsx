import { FormEdicaoProduto, LoadingSpinner, ModalConfirm } from "@/components";
import axios from "axios";
import { useState, useEffect } from "react";

interface Produto {
    id: string,
    fornecedor: string
    nome: string,
    marca: string,
    valor_unico: string,
    estoque: string,
    categoria: string,
}

export const TabelaProdutos: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [pager, setPager] = useState({ currentPage: 1, totalPages: 0, perPage: 10, total: 0 });
    const [loading, setLoading] = useState(false);

    const [filtroTexto, setFiltroTexto] = useState('');
    const [filtroCampo, setFiltroCampo] = useState('todos');

    const pesquisarProdutos = async (page = 1) => {
        setLoading(true);
        try {
            if (filtroCampo === 'todos') {
                const response = await axios.get(`http://localhost:8080/produtos?page=${page}`);
                setProdutos(response.data.produtos)
                setPager(response.data.pager);
            } else {
                const response = await axios.get(`http://localhost:8080/produtos/filter`, {
                    params: {
                        [filtroCampo]: filtroTexto,
                    },
                });
                setProdutos(response.data.produtos);
                setPager({ currentPage: 1, totalPages: 1, perPage: response.data.data.length, total: response.data.data.length });
            }
        } catch {
            console.log("Erro ao retornar os produtos")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { pesquisarProdutos(1) }, [])

    const mudancaPagina = (page: number) => {
        if (page >= 1 && page <= pager.totalPages) {
            setPager((prev) => ({ ...prev, currentPage: page }));
            pesquisarProdutos(page);
        }
    };

    const [produtoParaDeletar, setProdutoParaDeletar] = useState<Produto | null>(null);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8080/produtos/${id}`);
            pesquisarProdutos(1);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full flex flex-col gap-2 mt-5 mb-5">
                <select className="px-4 py-2 rounded-xl border w-full sm:w-auto cursor-pointer" value={filtroCampo} onChange={(e) => setFiltroCampo(e.target.value)}>
                    <option value="todos">Todos</option>
                    <option value="nome">Produto</option>
                </select>

                <input className="px-4 py-2 rounded-xl border w-full sm:w-auto"
                    type="text" placeholder={`Filtrar por ${filtroCampo}`} value={filtroTexto}
                    onChange={(e) => setFiltroTexto(e.target.value)} />

                <button className="px-4 text-md bg-[#725743] rounded-2xl text-white font-bold py-3 hover:cursor-pointer hover:opacity-90"
                    onClick={() => pesquisarProdutos(1)}>Pesquisar</button>
            </div>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className="shadow-md rounded-2xl border border-zinc-300 overflow-x-auto w-full mx-auto">
                        <table className="w-full table-auto text-sm sm:text-base">
                            <thead className="text-center bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-4 py-2">ID</th>
                                    <th scope="col" className="px-4 py-2">produto</th>
                                    <th scope="col" className="px-4 py-2">marca</th>
                                    <th scope="col" className="px-4 py-2">valor</th>
                                    <th scope="col" className="px-4 py-2">estoque</th>
                                    <th scope="col" className="px-4 py-2">categoria</th>
                                    <th scope="col" className="px-4 py-2">fornecedor</th>
                                    <th scope="col" className="px-4 py-2">ações</th>
                                </tr>
                            </thead>

                            <tbody className="text-center">
                                {produtos.length === 0 ? (
                                    <tr >
                                        <td colSpan={8} className="text-center py-4">Nenhum produto encontrado</td>
                                    </tr>
                                ) :
                                    produtos.map((produto, index) => (
                                        <tr key={index} className="bg-white  hover:bg-gray-100  transition-colors cursor-pointer">
                                            <td className="px-4 py-3 font-bold text-[#725743]">{produto.id}</td>
                                            <td className="px-4 py-3">{produto.nome}</td>
                                            <td className="px-4 py-3">{produto.marca}</td>
                                            <td className="px-4 py-3">R$ {produto.valor_unico}</td>
                                            <td className="px-4 py-3">{produto.estoque}</td>
                                            <td className="px-4 py-3">{produto.categoria}</td>
                                            <td className="px-4 py-3">{produto.fornecedor}</td>
                                            <td className="px-4 py-3 flex items-center justify-center gap-3">
                                                <button className="w-4 hover:opacity-70 transition-opacity cursor-pointer" onClick={() => setProdutoParaDeletar(produto)}>
                                                    <img className="w-4" src={"./icons/remove-icon.svg"} />
                                                </button>
                                                <FormEdicaoProduto produto={produto} />
                                                <ModalConfirm title="Deletar" message={`Deseja apagar o produto ${produtoParaDeletar?.nome}?`}
                                                    isOpen={produtoParaDeletar !== null}
                                                    onConfirm={() => {
                                                        if (produtoParaDeletar) {
                                                            handleDelete(produtoParaDeletar.id);
                                                        }
                                                        setProdutoParaDeletar(null);
                                                    }} onCancel={() => setProdutoParaDeletar(null)} />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <div className=" flex gap-6 p-3">
                        <button className="hover:opacity-50 cursor-pointer" onClick={() => mudancaPagina(pager.currentPage - 1)} disabled={pager.currentPage === 1}>
                            ⬅ Anterior
                        </button>
                        <span className="text-zinc-600">
                            Página {pager.currentPage} de {pager.totalPages}
                        </span>
                        <button className="hover:opacity-50 cursor-pointer" onClick={() => mudancaPagina(pager.currentPage + 1)} disabled={pager.currentPage === pager.totalPages}>
                            Próxima ➡
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}