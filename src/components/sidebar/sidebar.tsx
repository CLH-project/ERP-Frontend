import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/components'

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
            acoes: ['Listar'],
        },
        {
            titulo: 'Fornecedores',
            icone: '👤',
            acoes: ['Cadastrar', 'Listar']
        }
    ];

    // Função para lidar com o clique em uma ação do submenu
    // Ela verifica qual ação foi clicada e redireciona para a rota correspondente
    // As rotas são definidas em um objeto, onde cada módulo tem suas ações mapeadas para suas respectivas rotas
    // Se a ação não estiver definida, nada acontece
    const handleActionClick = (modulo: string, acao: string) => {
        const rotas: Record<string, Record<string, string>> = {
            Clientes: {
                Cadastrar: '/clientes/cadastro',
                Listar: '/clientes',
            },
            Vendas: {
                Caixa: '/caixa',
            },
            Produtos: {
                Listar: '/produtos',
            },
            Fornecedores: {
                Cadastrar: '/fornecedores/cadastro',
                Listar: '/fornecedores'
            }
        };

        const rota = rotas[modulo]?.[acao];

        if (rota) {
            router.push(rota);
        }
    }

    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div>
            <button
                onClick={toggleSidebar}
                className={isOpen ? "display-none" : "hover:cursor-pointer hover:opacity-70"}>
                <img src="/icons/hamburger-menu.svg" alt="" />
            </button>

            {isOpen && (
                <div className="flex flex-col justify-between fixed top-0 left-0 h-screen w-64 bg-white text-white z-[1000] shadow-lg p-4 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-bold text-[#725743]">ERP CLH</span>
                        <button
                            onClick={toggleSidebar}
                            className={isOpen ? "hover:cursor-pointer hover:opacity-70" : "none"}>
                            <img src="/icons/close-button.svg" alt="" />
                        </button>
                    </div>

                    <div className='flex flex-col'>
                        <button onClick={() => { router.push("/inicio") }}
                            className=" mb-4 w-full text-left px-2 py-3 bg-[#725743] hover:bg-[#7e5f47] rounded-2xl flex items-center hover:cursor-pointer">Início
                        </button>

                        <button onClick={() => { router.push("/clientes") }}
                            className=" mb-4 w-full text-left px-2 py-3 bg-[#725743] hover:bg-[#7e5f47] rounded-2xl flex items-center hover:cursor-pointer">Clientes
                        </button>

                        <button onClick={() => { router.push("/produtos") }}
                            className=" mb-4 w-full text-left px-2 py-3 bg-[#725743] hover:bg-[#7e5f47] rounded-2xl flex items-center hover:cursor-pointer">Produtos
                        </button>

                        <button onClick={() => { router.push("/fornecedores") }}
                            className=" mb-4 w-full text-left px-2 py-3 bg-[#725743] hover:bg-[#7e5f47] rounded-2xl flex items-center hover:cursor-pointer">Fornecedores
                        </button>

                        <button onClick={() => { router.push("/vendas") }}
                            className=" mb-4 w-full text-left px-2 py-3 bg-[#725743] hover:bg-[#7e5f47] rounded-2xl flex items-center hover:cursor-pointer">Vendas
                        </button>

                    </div>
                    <Button functionName='Sair' onClick={() => router.push('/login')} />
                </div>
            )}

        </div>
    );
}



