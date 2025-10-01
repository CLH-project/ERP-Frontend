import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button, CloseButton, SidebarButton } from '@/components'

export const Sidebar: React.FC = () => {

    const router = useRouter();
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
                        <CloseButton onClick={toggleSidebar} />
                    </div>

                    <div className='flex flex-col'>
                        <p className='text-gray-500 font-light mb-5 px-2'>menu</p>
                        <SidebarButton iconUrl='/icons/sidebar-home-icon.svg' name='Início' onClick={() => { router.push("/inicio") }} />
                        <SidebarButton iconUrl='/icons/sidebar-cashier-icon.svg' name='Vendas' onClick={() => { router.push("/vendas") }} />
                        <SidebarButton iconUrl='/icons/sidebar-customer-icon.svg' name='Clientes' onClick={() => { router.push("/clientes") }} />
                        <SidebarButton iconUrl='/icons/sidebar-product-icon.svg' name='Produtos' onClick={() => { router.push("/produtos") }} />
                        <SidebarButton iconUrl='/icons/sidebar-supplier-icon.svg' name='Fornecedores' onClick={() => { router.push("/fornecedores") }} />
                        <SidebarButton iconUrl='/icons/sidebar-adm-icon.svg' name='Administração' onClick={() => { router.push("/administrador") }} />
                    </div>
                    <Button theme='back' functionName='Sair' onClick={() => router.push('/login')} />
                </div>
            )}

        </div>
    );
}



