'use client'

import { LoadingSpinner, PaginateButton } from "@/components";
import api from "@/services/api/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Venda {
    venda_id: string,
    usuario_id: string
    usuario_nome: string,
    cliente_id: string,
    cliente_nome: string,
    total_venda: string,
    created_at: string | null,
    updated_at: string | null,
}

interface ApiResponse {
    status: string;
    data: Venda[];
    pagination: {
        currentPage: number;
        perPage: number;
        total: number;
        pageCount: number;
    };
}

const formatarData = (dataString: string | null): string => {
    if (!dataString) return 'N/A'; // N/A se for null
    const date = new Date(dataString);

    if (isNaN(date.getTime())) {
        return dataString;
    }
    return date.toLocaleDateString('pt-BR');
};


const formatarMoeda = (valor: string): string => {
    const numero = parseFloat(valor);
    if (isNaN(numero)) return valor;

    return numero.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};

export const TabelaVendas: React.FC = () => {

    const [vendas, setVendas] = useState<Venda[]>([]);

    const [pager, setPager] = useState({ currentPage: 1, totalPages: 1, perPage: 10, total: 0 });
    const [loading, setLoading] = useState(false);

    const [filtroTexto, setFiltroTexto] = useState('');
    const [filtroCampo, setFiltroCampo] = useState('todos');

    const router = useRouter();

    const buscarVendas = async (page = 1) => {
        setLoading(true);
        try {
            const response = await api.get<ApiResponse>(`/vendas?page=${page}`);

            setVendas(response.data.data);

            setPager({
                currentPage: response.data.pagination.currentPage,
                totalPages: response.data.pagination.pageCount,
                perPage: response.data.pagination.perPage,
                total: response.data.pagination.total,
            });

        } catch (error) {
            console.error("Erro ao buscar vendas:", error);
            // Criar um modal para exibir um erro (como sugerido no código original)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { buscarVendas(1) }, [])

    const mudancaPagina = (page: number) => {
        if (page >= 1 && page <= pager.totalPages) {
            buscarVendas(page);
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className="shadow-md rounded-2xl border border-zinc-300 overflow-x-auto w-full mx-auto p-5">
                        <table className="w-full table-auto text-sm sm:text-base">
                            <thead className="text-center">
                                <tr>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">ID</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Vendedor</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Cliente</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Valor da venda</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">Data da venda</th>
                                </tr>
                            </thead>

                            <tbody className="text-center">
                                {vendas.length === 0 ? (
                                    <tr >
                                        <td colSpan={5} className="text-center py-4">Nenhuma venda encontrada</td>
                                    </tr>
                                ) :
                                    vendas.map((venda) => ( 
                                        <tr key={venda.venda_id} className="bg-white hover:bg-gray-100 dark:hover:bg-gray-100 cursor-pointer">
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{venda.venda_id}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{venda.usuario_nome}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{venda.cliente_nome}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">
                                                {formatarMoeda(venda.total_venda)}
                                            </td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">
                                                {formatarData(venda.created_at)}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full flex gap-6 mt-2 items-center justify-end">
                        <PaginateButton
                            direction="previous"
                            onClick={() => mudancaPagina(pager.currentPage - 1)}
                            disabled={pager.currentPage === 1}
                        />
                        <span className="font-medium text-[#725743]">
                            Página {pager.currentPage} de {pager.totalPages}
                        </span>
                        <PaginateButton
                            direction="next"
                            onClick={() => mudancaPagina(pager.currentPage + 1)}
                            disabled={pager.currentPage === pager.totalPages}
                        />
                    </div>
                </>
            )
            }
        </div >
    );
}