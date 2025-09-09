'use client'

import { Button, ErrorAlert, SuccessAlert, TextField } from "@/components";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react"
import * as Yup from "yup";

interface Fornecedor {
    id: string;
    nome: string;
    cnpj: string;
    email: string;
    telefone: string;
}

interface Produto {
    id: string,
    fornecedor_id: string
    fornecedor_nome: string;
    nome: string,
    marca: string,
    valor_unico: string,
    estoque: string,
    categoria: string,
}

interface FormProps {
    produto: Produto;
}

export const FormEdicaoProduto: React.FC<FormProps> = ({ produto }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [SucessMessage, setSucessMessage] = useState("")
    const [produtoEditar, setProdutoEditar] = useState<Produto>({} as Produto);

    useEffect(() => {
        setProdutoEditar(produto);
        console.log(produtoEditar)
    })
    return (
        <div className="flex items-center">
            <button onClick={() => { setIsOpen(true) }} type="button">
                <img className="w-4" src="icons/edit-icon.svg" alt="icone-editar" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center px-5 justify-center bg-black/20">
                    <div className="bg-gray-50 rounded-2xl shadow-md px-4 py-6">

                        <Formik
                            initialValues={{
                                nome: produto ? produto.nome : "",
                                marca: produto ? produto.marca : "",
                                valor_unico: produto ? produto.valor_unico : 0,
                                estoque: produto ? produto.estoque : 0,
                                categoria: produto ? produto.categoria : "Categoria",
                                fornecedor_nome: produto ? produto.fornecedor_id : "",
                                fornecedor_id: "",
                            }}

                            validationSchema={Yup.object({
                                nome: Yup.string().required("Nome do produto é obrigatório"),
                                marca: Yup.string().required("Nome da marca é obrigatório"),
                                valor_unico: Yup.number().required("Valor do produto obrigatório"),
                                estoque: Yup.number().required("Quantidade de estoque necessário"),
                                fornecedor_nome: Yup.string().required("Nome do fornecedor obrigatório"),
                            })}

                            onSubmit={async (values, { setSubmitting, setErrors }) => {

                            }}>
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col gap-5 ">
                                    <div className="flex justify-between mb-5">
                                        <h1 className="text-xl font-bold">Editar Produto</h1>
                                        <button className="cursor-pointer hover:opacity-20" onClick={() => setIsOpen(false)}><img src="icons/close-button.svg" /></button>
                                    </div>
                                    <div>
                                        <TextField name="nome" type="text" placeholder="Digite o nome do produto" />
                                        <ErrorAlert name="nome" component="div" />
                                    </div>

                                    <div>
                                        <TextField name="marca" type="text" placeholder="Digite a marca do produto" />
                                        <ErrorAlert name="marca" component="div" />
                                    </div>

                                    <div className="flex gap-3">
                                        <div>
                                            <TextField name="valor_unico" type="number" placeholder="Valor do produto" />
                                            <ErrorAlert name="valor_unico" component="div" />
                                        </div>

                                        <div>
                                            <TextField name="estoque" type="number" placeholder="quantidade" />
                                            <ErrorAlert name="estoque" component="div" />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 items-center justify-center">
                                        <div className="w-full">
                                            <TextField type="text" name="fornecedor_nome" placeholder="Nome Fornecedor" />
                                            <ErrorAlert name="fornecedor_nome" component="div" />
                                        </div>

                                        <div className="w-full">
                                            <Field className="text-center bg-white border shadow-md border-[#CDCDCD] rounded-3xl py-4 w-full focus:outline-none" as="select" name="categoria">
                                                <option value="">Categoria</option>
                                                <option value="Alcolico">Alcolico</option>
                                                <option value="Não Alcolico">Não Alcolico</option>
                                            </Field>
                                            <ErrorAlert name="categoria" component="div" />
                                        </div>
                                    </div>
                                    <Button functionName="Adicionar Produto" type="submit" disabled={isSubmitting} />
                                    {SucessMessage && <SuccessAlert SuccessMessage={SucessMessage} />}
                                </Form>
                            )}
                        </Formik>
                        <div className="mt-5">
                            <Button functionName="Fechar" onClick={() => setIsOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}