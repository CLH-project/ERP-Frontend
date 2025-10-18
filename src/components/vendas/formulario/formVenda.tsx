'use client'

import { useState, useCallback } from "react";
import { Button, CloseButton } from "@/components/button";
import { TextField } from "@/components/field";
import api from "@/services/api/api";
import { CadastroClienteModal } from "@/components/clientes/formulario";
import { useRouter } from "next/navigation";
import { NotificationModal } from "@/components/alerts";

interface Produto {
    id: string;
    fornecedor: string;
    nome: string;
    marca: string;
    valor_unico: number;
    estoque: string;
    categoria: string;
}

interface Cliente {
    id: string,
    nome: string,
    cpf: string,
    telefone: string
}

interface ProdutoCarrinho extends Produto {
    quantidade: number;
}

const cleanPrice = (price: string | number | null | undefined): number => {
    if (price === null || price === undefined) return 0;
    if (typeof price === 'number' && !isNaN(price)) return price;

    const priceString = String(price).trim();
    if (priceString === '') return 0;

    const cleaned = priceString.replace(/[^\d.]/g, '');
    const value = parseFloat(cleaned);

    return isNaN(value) ? 0 : value;
};


export const VendaForm: React.FC = () => {
    const router = useRouter();

    const [produto, setProduto] = useState<Produto | null>(null);
    const [nomeProduto, setNomeProduto] = useState("");

    const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]);

    const [modalClienteAberto, setModalClienteAberto] = useState(false);

    const [nomeCliente, setNomeCliente] = useState("");
    const [cliente, setCliente] = useState<Cliente | null>(null);

    const [notificationModal, setNotificationModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        isSuccess: false,
        onConfirmSuccess: undefined as (() => void) | undefined,
    });

    const openNotification = useCallback((title: string, message: string, isSuccess: boolean, onConfirmSuccess?: () => void) => {
        setNotificationModal({ isOpen: true, title, message, isSuccess, onConfirmSuccess });
    }, []);

    const closeNotification = useCallback(() => {
        setNotificationModal(prev => ({ ...prev, isOpen: false }));
    }, []);


    const searchCliente = async () => {
        if (!nomeCliente.trim()) {
            openNotification("Atenção", "Digite o CPF ou nome do cliente para pesquisar.", false);
            return;
        }

        try {

            const response = await api.get(`/clientes/${nomeCliente}`);

            const resultado = response.data;
            let foundClient: Cliente | null = null;

            if (Array.isArray(resultado) && resultado.length > 0) {
                foundClient = resultado[0];
            } else if (resultado && resultado.id) {
                foundClient = resultado;
            }

            if (foundClient) {
                setCliente(foundClient);
            } else {
                setCliente(null);
                openNotification("Cliente Não Encontrado", "Nenhum cliente foi encontrado com os dados fornecidos.", false);
            }

        } catch (error) {
            console.error("Erro ao buscar cliente:", error);
            setCliente(null);
            openNotification("Erro na Busca", "Ocorreu um erro ao buscar o cliente. Verifique a conexão ou os dados.", false);
        }
    }

    const vincularCliente = () => {
        if (cliente) {
            setModalClienteAberto(false);
            setNomeCliente("");
            openNotification("Sucesso", `Cliente ${cliente.nome} vinculado à venda.`, true);
        } else {
            openNotification("Atenção", "Nenhum cliente selecionado. Pesquise e encontre um cliente primeiro.", false);
        }
    }

    const searchProduto = async () => {
        if (!nomeProduto.trim()) return;

        try {
            const response = await api.get(`/produtos/filter`, {
                params: { nome: nomeProduto },
            });

            const resultado = response.data.produtos;
            if (Array.isArray(resultado) && resultado.length > 0) {
                const produtoEncontrado = resultado[0];
                setProduto({
                    ...produtoEncontrado,
                    valor_unico: cleanPrice(produtoEncontrado.valor_unico),
                });
            } else {
                setProduto(null);
                openNotification("Produto Não Encontrado", "Nenhum produto foi encontrado com esse nome.", false);
            }
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            openNotification("Erro na Busca", "Ocorreu um erro ao buscar o produto.", false);
        }
    };

    const adicionarAoCarrinho = () => {
        if (!produto) {
            openNotification("Atenção", "Por favor, busque e selecione um produto para adicionar ao carrinho.", false);
            return;
        }

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
        openNotification("Sucesso", `Produto ${produto.nome} adicionado ao carrinho.`, true);
    };

    const diminuirQuantidade = (id: string) => {
        setCarrinho((prevCarrinho) =>
            prevCarrinho
                .map((item) => item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item)
                .filter((item) => item.quantidade > 0)
        );
    };

    const removerProduto = (id: string) => {
        setCarrinho((prevCarrinho) =>
            prevCarrinho.filter((item) => item.id !== id)
        );
    };

    const precoTotal = carrinho.reduce((total, item) => {
        const itemPriceCents = Math.round(cleanPrice(item.valor_unico) * 100);
        const subtotalCents = itemPriceCents * item.quantidade;

        return total + subtotalCents;
    }, 0) / 100;


    const resetVenda = () => {
        setCarrinho([]);
        setCliente(null);
        setNomeProduto("");
        setProduto(null);
    }

    const confirmarVenda = async () => {
        if (!cliente) {
            openNotification("Atenção", "Por favor, vincule um cliente antes de confirmar a venda.", false);
            return;
        }

        if (carrinho.length === 0) {
            openNotification("Atenção", "O carrinho está vazio. Adicione produtos para realizar a venda.", false);
            return;
        }

        try {
            const venda = {
                cliente_id: cliente.id,
                total: precoTotal.toFixed(2),
                itens: carrinho.map(item => ({
                    produto_id: item.id,
                    quantidade: item.quantidade,
                    preco_unitario: cleanPrice(item.valor_unico)
                }))
            };

            const response = await api.post('/vendas', venda);

            if (response.status === 201) {
                openNotification("Venda Confirmada!", "Venda confirmada com sucesso!", true, resetVenda);

            } else {
                openNotification("Erro na Confirmação", `Erro ao confirmar venda: ${response.data.message || "Resposta inesperada do servidor"}`, false);
            }

        } catch (error: any) {
            console.error("Erro na requisição de venda:", error);
            const errorMessage = error.response?.data?.message || error.message || "Verifique a conexão e os dados da venda.";
            openNotification("Falha ao Processar Venda", `Detalhes: ${errorMessage}`, false);
        }
    };

    return (
        <div>
            {modalClienteAberto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
                    <div className="bg-[#F3F3F3] rounded-2xl p-8 w-full max-w-md shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-[#3D2422]">Vincular Cliente</h2>
                            <CloseButton onClick={() => setModalClienteAberto(false)} />
                        </div>

                        <div className="text-gray-700">
                            <div className="flex flex-col gap-4">
                                <TextField
                                    label=""
                                    name="nomeCliente"
                                    placeholder="Pesquisar cliente por CPF ou Nome"
                                    value={nomeCliente}
                                    change={(e) => setNomeCliente(e.target.value)}
                                />
                                <Button functionName="Pesquisar" onClick={searchCliente} theme="secondary" />
                            </div>
                            <div className="flex flex-col items-center mt-10">
                                <p className="text-[#626262]">{cliente?.nome || "Nome do cliente"}</p>
                                <div className="mt-5 w-[12rem]">
                                    <Button functionName="Vincular Cliente" onClick={vincularCliente} />
                                </div>
                            </div>

                            <p className="text-center mt-5 font-bold">ou adicione ou um novo cliente</p>

                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <CadastroClienteModal />
                                <Button functionName="Fechar" theme="back" onClick={() => { setModalClienteAberto(false) }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <NotificationModal
                isOpen={notificationModal.isOpen}
                onClose={closeNotification}
                title={notificationModal.title}
                message={notificationModal.message}
                isSuccess={notificationModal.isSuccess}
                onConfirmSuccess={notificationModal.onConfirmSuccess}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-20">
                <div>
                    <div className="border-2 border-[#725743] text-[#3D2422] rounded-2xl py-3 px-4 text-center text-2xl">
                        <p>{produto?.nome ? produto?.nome : "Produto não selecionado"}</p>
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
                                <p>R$ {produto?.valor_unico.toFixed(2) || "0.00"}</p>
                            </div>
                        </div>

                        <Button functionName="Adicionar ao carrinho" onClick={adicionarAoCarrinho} />
                    </div>
                </div>
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
                                            <td className="font-medium px-4 py-5">{item.id}</td>
                                            <td className="font-medium px-4 py-5">{item.nome}</td>
                                            <td className="font-medium px-4 py-5">{item.marca}</td>
                                            <td className="font-medium px-4 py-5">R$ {item.valor_unico.toFixed(2)}</td>
                                            <td className="font-medium px-4 py-5">{item.quantidade}</td>
                                            <td className="font-medium px-4 py-5">
                                                <div className="flex gap-3">
                                                    <button onClick={() => diminuirQuantidade(item.id)} className="w-4 cursor-pointer hover:bg-white ">
                                                        <img src="/icons/minus-icon.svg" alt="Diminuir" />
                                                    </button>
                                                    <button onClick={() => removerProduto(item.id)} className="w-4 cursor-pointer hover:bg-[#]">
                                                        <img src="/icons/remove-icon.svg" alt="Remover" />
                                                    </button>
                                                </div>
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

            <div className="mt-5 mb-5 flex flex-col gap-3 md:grid-cols-3 md:grid">
                <Button functionName="Vincular Cliente" onClick={() => setModalClienteAberto(true)} />
                <Button theme="confirm" functionName="Confirmar Venda" onClick={confirmarVenda} />
                <Button theme="back" functionName="Voltar" onClick={() => router.push("/inicio")} />
            </div>
        </div>
    );
};