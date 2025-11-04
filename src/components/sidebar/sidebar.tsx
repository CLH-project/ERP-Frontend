'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'; 
import { Button, CloseButton, SidebarButton } from '@/components';
import { useAuth } from '@/services/usuario/auth/AuthContext';

interface User {
    id: string;
    nome: string;
    cargo?: string,
}

export const Sidebar: React.FC = () => {
    const router = useRouter();
    const { logout } = useAuth();
    const [user, setUser] = useState<User>({} as User);
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    useEffect(() => {
        const storedUser = localStorage.getItem('usuario');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const handleNavigation = (path: string) => {
        router.push(path);
        if (isOpen) {
            toggleSidebar();
        }
    };

    const renderAdmButton = (user: User) => {
        if (user.cargo === "Gerente") {
            return <SidebarButton iconUrl='/icons/sidebar-adm-icon.svg' name='Administração' onClick={() => handleNavigation("/administrador")} />;
        }
        return null;
    }

    return (
        <>
            <div className="hidden lg:flex justify-between flex-col bg-white rounded-2xl shadow-md">
                <div className='flex flex-col items-center  py-10 bg-[#3D2422] rounded-2xl'>
                    <img className="w-[60%]" src="/image/sidebar-logo.svg" alt="" />
                </div>

                <nav className="flex flex-col w-full gap-2 px-2">
                    <SidebarButton iconUrl='/icons/sidebar-home-icon.svg' name='Início' onClick={() => handleNavigation("/inicio")} />
                    <SidebarButton iconUrl='/icons/sidebar-cashier-icon.svg' name='Vendas' onClick={() => handleNavigation("/caixa")} />
                    <SidebarButton iconUrl='/icons/sidebar-customer-icon.svg' name='Clientes' onClick={() => handleNavigation("/clientes")} />
                    <SidebarButton iconUrl='/icons/sidebar-product-icon.svg' name='Produtos' onClick={() => handleNavigation("/produtos")} />
                    <SidebarButton iconUrl='/icons/sidebar-supplier-icon.svg' name='Fornecedores' onClick={() => handleNavigation("/fornecedores")} />
                    {renderAdmButton(user)}
                </nav>

                <button className='text-lg p-2 text-[#725643] font-medium hover:opacity-80 cursor-pointer' onClick={handleLogout}>
                    Log Out
                </button>
            </div>

            <div className="p-4 rounded-2xl shadow-2xl bg-[#725643] lg:hidden">
                <button onClick={toggleSidebar} className="hover:cursor-pointer hover:opacity-70">
                    <img src="/icons/hamburger-menu.svg" alt="menu" />
                </button>
            </div>


            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black opacity-50 z-[999]" onClick={toggleSidebar}></div>

                    <div className="lg:hidden flex flex-col justify-between fixed top-0 left-0 h-screen w-64 bg-white text-white z-[1000] shadow-lg p-4 overflow-y-auto rounded-r-2xl">
                        <div className="w-full flex flex-col">
                            <div className='w-full flex justify-between items-center'>
                                <span className="text-xl font-bold text-[#725743]">ERP CLH</span>
                                <CloseButton onClick={toggleSidebar} />
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-gray-500 font-light mb-5 px-2'>menu</p>
                            <SidebarButton iconUrl='/icons/sidebar-home-icon.svg' name='Início' onClick={() => handleNavigation("/inicio")} />
                            <SidebarButton iconUrl='/icons/sidebar-cashier-icon.svg' name='Vendas' onClick={() => handleNavigation("/caixa")} />
                            <SidebarButton iconUrl='/icons/sidebar-customer-icon.svg' name='Clientes' onClick={() => handleNavigation("/clientes")} />
                            <SidebarButton iconUrl='/icons/sidebar-product-icon.svg' name='Produtos' onClick={() => handleNavigation("/produtos")} />
                            <SidebarButton iconUrl='/icons/sidebar-supplier-icon.svg' name='Fornecedores' onClick={() => handleNavigation("/fornecedores")} />
                            {renderAdmButton(user)}
                        </div>
                        <button className='text-lg p-2 text-[#725643] font-medium hover:opacity-80 cursor-pointer' onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                </>
            )}
        </>
    );
};