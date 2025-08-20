import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export const Sidebar: React.FC = () => {

    const router = useRouter();

    // Valores do menu
    // Cada item do menu tem um título, um ícone e uma lista de ações
    // As ações são os submenus que serão exibidos quando o item for clicado
    const menu = [
        {
            titulo: 'Clientes',
            icone: '👤',
            acoes: ['Cadastrar', 'Listar'],
        },
        {
            titulo: 'Vendas',
            icone: '🧾',
            acoes: ['Caixa'],
        },
        {
            titulo: 'Produtos',
            icone: '📦',
            acoes: ['Cadastrar', 'Listar'],
        },
    ];

     
    // Função para lidar com o clique em uma ação do submenu
    // Ela verifica qual ação foi clicada e redireciona para a rota correspondente
    // As rotas são definidas em um objeto, onde cada módulo tem suas ações mapeadas para suas respectivas rotas
    // Se a ação não estiver definida, nada acontece
    const handleActionClick = (modulo: string, acao: string) => {
        const rotas: Record<string, Record<string, string>> = {
            Clientes: {
                Cadastrar: '/cadastrarcliente',
                Listar: '/listarclientes',
            },
            Vendas: {
                Caixa: '/caixa',
            },
            Produtos: {
                Cadastrar: '/cadastrarproduto',
                Listar: '/listarprodutos',
            },
        };

        const rota = rotas[modulo]?.[acao];

        if (rota) {
            router.push(rota);
        }
    }

    const [aberto, setAberto] = useState(false);
    const [ativo, setAtivo] = useState<number | null>(null);

    const toggleSidebar = () => setAberto(!aberto);
    const toggleSubmenu = (index: number) => setAtivo(ativo === index ? null : index);

    return (
        <>
            <button
                onClick={toggleSidebar}
                className={aberto ? "display-none" : "hover:cursor-pointer hover:opacity-70"}>
                <img src="icons/hamburger-menu.svg" alt="" />
            </button>

            {aberto && (
                <div className="fixed top-0 left-0 h-screen w-64 bg-gray-200 text-white z-[1000] shadow-lg p-4 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-bold">ERP CLH</span>
                        <button
                            onClick={toggleSidebar}
                            className={aberto ? "hover:cursor-pointer hover:opacity-70" : "none"}>
                            <img src="icons/close-button.svg" alt="" />
                        </button>
                    </div>

                    {menu.map((item, index) => (
                        <div key={index} className="mb-4">
                            <button
                                onClick={() => toggleSubmenu(index)}
                                className="w-full text-left px-3 py-2 bg-gray-400 hover:bg-gray-700 rounded-2xl flex items-center hover:cursor-pointer"
                            >
                                <span className="mr-2">{item.icone}</span>
                                {item.titulo}
                            </button>

                            {ativo === index && (
                                <div className=" mt-2 space-y-2">
                                    {item.acoes.map((acao, i) => (
                                        <button
                                            key={i}
                                            className="w-full text-left px-3 py-1 text-sm hover:bg-gray-600 rounded hover:cursor-pointer"
                                            onClick={() => handleActionClick(item.titulo, acao)}
                                        >
                                            {acao}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <button>Sair</button>
                </div>
            )}

        </>
    );
}



