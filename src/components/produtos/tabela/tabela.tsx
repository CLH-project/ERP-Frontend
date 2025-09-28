import { Button, FormEdicaoProduto, LoadingSpinner, ModalConfirm, PaginateButton, SelectField, TextField } from "@/components";
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
                setPager({ currentPage: 1, totalPages: 1, perPage: response.data.length, total: response.data.length });
            }
        } catch (error) {
            //Criar um modal para exibir um erro
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
            <div className="w-full flex flex-col gap-2 mt-3 mb-5 ">
                <div className="flex flex-col gap-2 mb-2 md:flex-row md:gap-4 ">
                    <SelectField label="Filtrar por:" options={["todos", "nome"]} name="" change={(e) => setFiltroCampo(e.target.value)} />
                    <TextField name="filtro" value={filtroTexto} placeholder={filtroCampo} change={(e) => setFiltroTexto(e.target.value)} />
                </div>
                <Button onClick={() => pesquisarProdutos(1)} functionName="Pesquisar" theme="secondary" />
            </div>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className="shadow-md rounded-2xl border border-zinc-300 overflow-x-auto w-full mx-auto  p-5">
                        <table className="w-full table-auto text-sm sm:text-base">
                            <thead className="text-center">
                                <tr>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">ID</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">produto</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">marca</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">valor</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">estoque</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">categoria</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">fornecedor</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">ações</th>
                                </tr>
                            </thead>

                            <tbody className="text-center">
                                {produtos.length === 0 ? (
                                    <tr >
                                        <td colSpan={8} className="text-center py-4">Nenhum produto encontrado</td>
                                    </tr>
                                ) :
                                    produtos.map((produto, index) => (
                                        <tr key={index} className="bg-white hover:bg-gray-100 dark:hover:bg-gray-100 cursor-pointer">
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{produto.id}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{produto.nome}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{produto.marca}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">R$ {produto.valor_unico}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{produto.estoque}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{produto.categoria}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{produto.fornecedor}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">
                                                <div className="flex gap-3">
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
                                                </div>
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