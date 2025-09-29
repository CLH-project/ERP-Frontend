import { Button, FormEdicaoProduto, FormEdicaoUsuario, LoadingSpinner, ModalConfirm, PaginateButton, SelectField, TextField } from "@/components";
import axios from "axios";
import { useState, useEffect } from "react";

interface Usuario {
    id: string,
    nome: string
    cpf: string,
    cargo: string,
}

export const TabelaUsuarios: React.FC = () => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [pager, setPager] = useState({ currentPage: 1, totalPages: 0, perPage: 10, total: 0 });
    const [loading, setLoading] = useState(false);

    const pesquisarUsuarios = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/usuarios?page=${page}`);
            setUsuarios(response.data.usuarios)
            setPager(response.data.pager);
            setPager({ currentPage: 1, totalPages: 1, perPage: response.data.length, total: response.data.length });

        } catch (error) {
            //Criar um modal para exibir um erro
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { pesquisarUsuarios(1) }, [])

    const mudancaPagina = (page: number) => {
        if (page >= 1 && page <= pager.totalPages) {
            setPager((prev) => ({ ...prev, currentPage: page }));
            pesquisarUsuarios(page);
        }
    };

    const [usuarioParaDeletar, setUsuarioParaDeletar] = useState<Usuario | null>(null);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8080/usuarios/${id}`);
            pesquisarUsuarios(1);
        } catch (error) {
            // Exibir Modal de Erro
        }
    }

    return (
        <div className="flex flex-col items-center w-full">
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className="shadow-md rounded-2xl border border-zinc-300 overflow-x-auto w-full mx-auto  p-5">
                        <table className="w-full table-auto text-sm sm:text-base">
                            <thead className="text-center">
                                <tr>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">ID</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">nome</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">cpf</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">cargo</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">ações</th>
                                </tr>
                            </thead>

                            <tbody className="text-center">
                                {usuarios.length === 0 ? (
                                    <tr >
                                        <td colSpan={5} className="text-center py-4">Nenhum usuario encontrado</td>
                                    </tr>
                                ) :
                                    usuarios.map((usuario, index) => (
                                        <tr key={index} className="bg-white hover:bg-gray-100 dark:hover:bg-gray-100 cursor-pointer">
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{usuario.id}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{usuario.nome}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{usuario.cpf}</td>
                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">{usuario.cargo}</td>

                                            <td className="font-medium px-4 py-4 border-b-1 border-gray-300">
                                                <div className="flex gap-3">
                                                    <button className="w-4 hover:opacity-70 transition-opacity cursor-pointer" onClick={() => setUsuarioParaDeletar(usuario)}>
                                                        <img className="w-4" src={"./icons/remove-icon.svg"} />
                                                    </button>
                                                    <FormEdicaoUsuario usuario={usuario} />
                                                    <ModalConfirm title="Deletar" message={`Deseja apagar o usuário ${usuarioParaDeletar?.nome}?`}
                                                        isOpen={usuarioParaDeletar !== null}
                                                        onConfirm={() => {
                                                            if (usuarioParaDeletar) {
                                                                handleDelete(usuarioParaDeletar.id);
                                                            }
                                                            setUsuarioParaDeletar(null);
                                                        }} onCancel={() => setUsuarioParaDeletar(null)} />
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