'use client'

import { Button } from "@/components/button";
import { TextField } from "@/components/field";
import { Form, Formik } from "formik";
import { useState } from "react";

interface Produto {
    id: string,
    fornecedor: string
    nome: string,
    marca: string,
    valor_unico: string,
    estoque: string,
    categoria: string,
}

export const VendaForm: React.FC = () => {

    const [produto, setProduto] = useState<Produto | null>(null);
    const [carrinho, setCarrinho] = useState<Produto[]>([]);

    const searchProduto = () => {

    }

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-20">
                <div>
                    <div className="border-2 border-[#725743] text-[#3D2422] rounded-2xl py-3 px-4 text-center text-2xl">
                        <p>{produto?.nome}Produto</p>
                    </div>

                    <div className="flex flex-col gap-5 mt-5 px-8 py-8 bg-[#F3F3F3] rounded-2xl">
                        <div className="text-xl">
                            <TextField label="Código" name="codigo" placeholder="Digite o código do produto" change={() => searchProduto()} />
                        </div>

                        <div>
                            <p className="text-lg px-3 text-[#725743] font-medium">Preço Unitário</p>
                            <div className="border-2 bg-white shadow-md border-[#725743] text-[#3D2422] rounded-2xl py-3 px-4 text-center text-2xl">
                                <p>R$ {produto?.valor_unico}</p>
                            </div>
                        </div>

                        <Button functionName="Adicionar ao carrinho" />
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
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">ID</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">produto</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">marca</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">valor</th>
                                    <th scope="col" className="font-normal text-gray-700 px-4 py-2 border-b-1 border-gray-300">ações</th>
                                </tr>
                            </thead>

                            <tbody className="text-center">
                                {carrinho.length === 0 ? (
                                    <tr >
                                        <td colSpan={5} className="text-center py-4">Adicione um item no carrinho</td>
                                    </tr>
                                ) :
                                    carrinho.map((produto, index) => (
                                        <tr key={index} className="bg-white hover:bg-gray-100 dark:hover:bg-gray-100 cursor-pointer">
                                            <td className="font-medium px-4 py-5 border-b-1 border-gray-300">{produto.id}</td>
                                            <td className="font-medium px-4 py-5 border-b-1 border-gray-300">{produto.nome}</td>
                                            <td className="font-medium px-4 py-5 border-b-1 border-gray-300">{produto.marca}</td>
                                            <td className="font-medium px-4 py-5 border-b-1 border-gray-300">R$ {produto.valor_unico}</td>
                                            <td className="font-medium px-4 py-5 border-b-1 border-gray-300"></td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 w-full text-right">
                        <p className="font-bold px-3">Preço Total: R$ <span className="font-normal"></span></p>
                    </div>
                </div>
            </div>


            <div className="mt-5 flex flex-col gap-3 md:grid-cols-3 md:grid">
                <Button functionName="Vincular Cliente" />
                <Button theme="confirm" functionName="Confirmar Venda" />
                <Button theme="back" functionName="Voltar" />
            </div>
        </div >
    )
}