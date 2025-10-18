'use client'

import { useState } from "react";
import { Button, CloseButton } from "@/components/button";
import { TextField } from "@/components/field";
import api from "@/services/api/api";
import { CadastroClienteModal } from "@/components/clientes/formulario";
import { useRouter } from "next/navigation";

interface Produto {
    id: string;
    fornecedor: string;
    nome: string;
    marca: string;
    valor_unico: string;
    estoque: string;
    categoria: string;
}

interface ProdutoCarrinho extends Produto {
    quantidade: number;
}

export const VendaForm: React.FC = () => {
    const rounter = useRouter();

    const [produto, setProduto] = useState<Produto | null>(null);
    const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);
    const [nomeProduto, setNomeProduto] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [nomeCliente, setNomeCleinte] = useState("");
   

    const searchProduto = async () => {
        if (!nomeProduto.trim()) return;

        try {
            const response = await api.get(`/produtos/filter`, {
                params: { nome: nomeProduto },
            });

            const resultado = response.data.produtos;
            if (Array.isArray(resultado) && resultado.length > 0) {
                setProduto(resultado[0]);
            } else {
                setProduto(null);
            }
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
        }
    };

    const adicionarAoCarrinho = () => {
        if (!produto) return;

        setCarrinho((prevCarrinho) => {
            const index = prevCarrinho.findIndex((item) => item.id === produto.id);

            if (index !== -1) {
                return prevCarrinho.map((item, i) =>
                    i === index ? { ...item, quantidade: item.quantidade + 1 } : item
                );
            } else {
                return [...prevCarrinho, { ...produto, quantidade: 1 }];
            }
        });
    };

    const diminuirQuantidade = (id: string) => {
        setCarrinho((prevCarrinho) =>
            prevCarrinho
                .map((item) =>
                    item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
                )
                .filter((item) => item.quantidade > 0)
        );
    };

    const removerProduto = (id: string) => {
        setCarrinho((prevCarrinho) =>
            prevCarrinho.filter((item) => item.id !== id)
        );
    };

    const precoTotal = carrinho.reduce((total, item) => {
        return total + parseFloat(item.valor_unico) * item.quantidade;
    }, 0);

    return (
        <div>
            {/* Modal Vincular Cliente */}
            {modalAberto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
                    <div className="bg-[#F3F3F3] rounded-2xl p-8 w-full max-w-md shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-[#3D2422]">Vincular Cliente</h2> 
                            <CloseButton onClick={() => setModalAberto(false)} />
                        </div>

                        <div className="text-gray-700">
                            <div className="flex flex-col gap-4">
                                <TextField
                                    label=""
                                    name="nomeCliente"
                                    placeholder="Pesquisar cliente por CPF"
                                    value={nomeCliente}
                                    change={(e) => setNomeCleinte(e.target.value)}
                                />
                                <Button functionName="Pesquisar" theme="secondary" />
                            </div>
                            <div className="flex flex-col items-center mt-10">
                                <p className="text-[#626262]">{produto?.nome || "Nome do cliente"}</p>
                                <div className="mt-5 w-[12rem]">
                                    <Button functionName="Vincular Cliente" />
                                </div>
                            </div>

                            <p className="text-center mt-5 font-bold">ou adicione ou um novo cliente</p>

                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <CadastroClienteModal />
                                <Button functionName="Fechar" theme="back" onClick={() => {setModalAberto(false)}}/>

                            </div>
                        </div>
                    </div>
                </div>
            )}

            

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-20">
                {/* Seção de produto */}
                <div>
                    <div className="border-2 border-[#725743] text-[#3D2422] rounded-2xl py-3 px-4 text-center text-2xl">
                        <p>{produto?.nome || "Produto não selecionado"}</p>
                    </div>

                    <div className="flex flex-col gap-5 mt-5 px-8 py-8 bg-[#F3F3F3] rounded-2xl">
                        <div className="text-xl">
                            <TextField
                                label="Nome do Produto"
                                name="nome"
                                placeholder="Digite o nome do produto"
                                value={nomeProduto}
                                change={(e) => setNomeProduto(e.target.value)}
                            />
                            <div className="mt-3">
                                <Button functionName="Buscar Produto" onClick={searchProduto} />
                            </div>
                        </div>

                        <div>
                            <p className="text-lg px-3 text-[#725743] font-medium">Preço Unitário</p>
                            <div className="border-2 bg-white shadow-md border-[#725743] text-[#3D2422] rounded-2xl py-3 px-4 text-center text-2xl">
                                <p>R$ {produto?.valor_unico || "0.00"}</p>
                            </div>
                        </div>

                        <Button functionName="Adicionar ao carrinho" onClick={adicionarAoCarrinho} />
                    </div>
                </div>

                {/* Seção do carrinho */}
                <div className="w-full">
                    <div className="text-2xl font-bold mb-5">
                        <h1>Carrinho</h1>
                    </div>

                    <div className="shadow-md rounded-2xl border border-zinc-300 overflow-x-auto w-full mx-auto p-5">
                        <table className="w-full table-auto text-sm sm:text-base">
                            <thead className="text-center">
                                <tr>
                                    <th className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">ID</th>
                                    <th className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Produto</th>
                                    <th className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Marca</th>
                                    <th className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Valor</th>
                                    <th className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Quantidade</th>
                                    <th className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Ações</th>
                                </tr>
                            </thead>

                            <tbody className="text-center">
                                {carrinho.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-4">Adicione um item no carrinho</td>
                                    </tr>
                                ) : (
                                    carrinho.map((item) => (
                                        <tr key={item.id} className="bg-white hover:bg-gray-100 cursor-pointer">
                                            <td className="font-medium px-4 py-5 border-b-1 border-gray-300">{item.id}</td>
                                            <td className="font-medium px-4 py-5 border-b-1 border-gray-300">{item.nome}</td>
                                            <td className="font-medium px-4 py-5 border-b-1 border-gray-300">{item.marca}</td>
                                            <td className="font-medium px-4 py-5 border-b-1 border-gray-300">R$ {item.valor_unico}</td>
                                            <td className="font-medium px-4 py-5 border-b-1 border-gray-300">{item.quantidade}</td>
                                            <td className="font-medium px-4 py-5 border-b-1 border-gray-300 flex gap-4 justify-center">
                                                <button onClick={() => diminuirQuantidade(item.id)} className="cursor-pointer hover:opacity-90"></button>
                                                <button onClick={() => removerProduto(item.id)} className="w-3 cursor-pointer hover:opacity-90"><img src="/icons/remove-icon.svg" alt="" /></button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 w-full text-right">
                        <p className="font-bold px-3">
                            Preço Total: R$ <span className="font-normal">{precoTotal.toFixed(2)}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Botões finais */}
            <div className="mt-5 mb-5 flex flex-col gap-3 md:grid-cols-3 md:grid">
                <Button functionName="Vincular Cliente" onClick={() => setModalAberto(true)} />
                <Button theme="confirm" functionName="Confirmar Venda" />
                <Button theme="back" functionName="Voltar" onClick={() => rounter.push("/inicio")}/>
            </div>
        </div>
    );
};
