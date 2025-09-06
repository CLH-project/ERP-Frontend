import { LoadingSpinner, ModalConfirm } from "@/components";
import axios from "axios";
import { useState, useEffect } from "react";

interface Produto {
    id: string,
    fornecedor_id: string
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

    const pesquisarProdutos = async (page = 1) => {
        setLoading(true);
        try {
             const response = await axios.get(`http://localhost:8080/produtos?page=${page}`);   
             setProdutos(response.data.produtos)
             setPager(response.data.pager);
             console.log(response)
        } catch {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() =>{pesquisarProdutos(1)}, [])

    const mudancaPagina = (page: number) => {
        if (page >= 1 && page <= pager.totalPages) {
            setPager((prev) => ({ ...prev, currentPage: page }));
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
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className="shadow-md rounded-2xl border border-zinc-300 overflow-x-auto w-full mx-auto">
                        <table className="w-full table-auto text-sm sm:text-base">
                            <thead className=" text-center bg-gray-100">
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
                                        <td colSpan={7} className="text-center py-4">Nenhum produto encontrado</td>
                                    </tr>
                                ) :
                                    produtos.map((produto, index) => (
                                        <tr key={index} className="bg-white  hover:bg-gray-100  transition-colors cursor-pointer">
                                            <td className="px-4 py-3">{produto.id}</td>
                                            <td className="px-4 py-3">{produto.nome}</td>
                                            <td className="px-4 py-3">{produto.marca}</td>
                                            <td className="px-4 py-3">{produto.valor_unico}</td>
                                            <td className="px-4 py-3">{produto.estoque}</td>
                                            <td className="px-4 py-3">{produto.categoria}</td>
                                            <td className="px-4 py-3">{produto.fornecedor_id}</td>
                                            <td className="px-4 py-3 flex justify-center gap-3">
                                                <button className="w-4 hover:opacity-70 transition-opacity cursor-pointer" onClick={() => setProdutoParaDeletar(produto)}>
                                                    <img src={"./icons/remove-icon.svg"} />
                                                </button>
                                                <button className="w-4 hover:opacity-70 transition-opacity cursor-pointer">
                                                    <img src={"./icons/edit-icon.svg"} />
                                                </button>
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