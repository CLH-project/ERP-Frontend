'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button, CloseButton, SidebarButton } from '@/components';
import { useAuth } from '@/services/usuario/auth/AuthContext';

interface User {
    id: string;
    nome: string;
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

    return (
        <>
            {/* Desktop: Menu fixo no topo */}
            <div className="hidden lg:flex gap-10 text-center justify-between items-center px-6 w-full">
                <div className='flex flex-col items-center gap-2'>
                    <img className="w-15" src="/image/logo-small.svg" alt="" />
                    <span className="text-sm text-gray-300 font-light">Olá, {user?.nome}</span>
                </div>
                

                <nav className="flex max-lg: bg-white p-2 rounded-2xl shadow-md gap-2">
                    <SidebarButton iconUrl='/icons/sidebar-home-icon.svg' name='Início' onClick={() => router.push("/inicio")} />
                    <SidebarButton iconUrl='/icons/sidebar-cashier-icon.svg' name='Vendas' onClick={() => router.push("/vendas")} />
                    <SidebarButton iconUrl='/icons/sidebar-customer-icon.svg' name='Clientes' onClick={() => router.push("/clientes")} />
                    <SidebarButton iconUrl='/icons/sidebar-product-icon.svg' name='Produtos' onClick={() => router.push("/produtos")} />
                    <SidebarButton iconUrl='/icons/sidebar-supplier-icon.svg' name='Fornecedores' onClick={() => router.push("/fornecedores")} />
                    <SidebarButton iconUrl='/icons/sidebar-adm-icon.svg' name='Administração' onClick={() => router.push("/administrador")} />
                </nav>

                <div className="flex items-center">
                    <Button theme='back' functionName='Sair' onClick={handleLogout} />
                </div>
            </div>

            <div className="py-2 px-4 lg:hidden">
                <button onClick={toggleSidebar} className="hover:cursor-pointer hover:opacity-70">
                    <img src="/icons/hamburger-menu.svg" alt="menu" />
                </button>
            </div>

            {/* Mobile: Sidebar lateral */}
            {isOpen && (
                <div className="lg:hidden flex flex-col justify-between fixed top-0 left-0 h-screen w-64 bg-white text-white z-[1000] shadow-lg p-4 overflow-y-auto rounded-r-2xl">
                    <div className="w-full flex flex-col">
                        <div className='w-full flex justify-between items-center'>
                            <span className="text-xl font-bold text-[#725743]">ERP CLH</span>
                            <CloseButton onClick={toggleSidebar} />
                        </div>
                        {user && <p className='text-sm text-gray-600 font-light'>Olá, {user.nome}</p>}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='text-gray-500 font-light mb-5 px-2'>menu</p>
                        <SidebarButton iconUrl='/icons/sidebar-home-icon.svg' name='Início' onClick={() => router.push("/inicio")} />
                        <SidebarButton iconUrl='/icons/sidebar-cashier-icon.svg' name='Vendas' onClick={() => router.push("/vendas")} />
                        <SidebarButton iconUrl='/icons/sidebar-customer-icon.svg' name='Clientes' onClick={() => router.push("/clientes")} />
                        <SidebarButton iconUrl='/icons/sidebar-product-icon.svg' name='Produtos' onClick={() => router.push("/produtos")} />
                        <SidebarButton iconUrl='/icons/sidebar-supplier-icon.svg' name='Fornecedores' onClick={() => router.push("/fornecedores")} />
                        <SidebarButton iconUrl='/icons/sidebar-adm-icon.svg' name='Administração' onClick={() => router.push("/administrador")} />
                    </div>
                    <Button theme='back' functionName='Sair' onClick={handleLogout} />
                </div>
            )}
        </>
    );
};
