'use client'

import { Button, ErrorAlert, FormikTextField, SelectField, SuccessAlert } from "@/components";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react"
import * as Yup from "yup";
import axios from 'axios';

interface Usuario {
    id: string,
    nome: string
    cpf: string,
    senha?: string
    cargo: string,
}

interface FormProps {
    usuario: Usuario;
}

export const FormEdicaoUsuario: React.FC<FormProps> = ({ usuario }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [SucessMessage, setSucessMessage] = useState("")
    const [produtoEditar, setProdutoEditar] = useState<Usuario>({} as Usuario);

    useEffect(() => {
        setProdutoEditar(usuario);
    })

    return (
        <div className="flex items-center">
            <button className="cursor-pointer hover:opacity-50" onClick={() => { setIsOpen(true) }} type="button">
                <img className="w-4" src="icons/edit-icon.svg" alt="icone-editar" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center px-5 justify-center bg-black/20">
                    <div className="bg-gray-50 rounded-2xl shadow-md px-4 py-6">

                        <Formik
                            initialValues={{
                                id: usuario ? usuario.id : "",
                                nome: usuario ? usuario.nome : "",
                                cpf: usuario ? usuario.cpf : "",
                                senha: "",
                                cargo: usuario ? usuario.cargo : ""
                            }}

                            validationSchema={Yup.object({
                                nome: Yup.string().required("Nome do produto é obrigatório"),
                                marca: Yup.string().required("Nome da marca é obrigatório"),
                                valor_unico: Yup.number().required("Valor do produto obrigatório"),
                                estoque: Yup.number().required("Quantidade de estoque necessário"),
                                fornecedor_nome: Yup.string().required("Nome do fornecedor obrigatório"),
                            })}

                            onSubmit={async (values, { setSubmitting, setErrors }) => {
                                try {

                                    const produtoAtualizado = {
                                        id: values.id,
                                        nome: values.nome,
                                        senha: values.senha,
                                        cargo: values.cargo
                                    }

                                    const putResponse = await axios.put(`http://localhost:8080/produtos/${usuario.id}`, produtoAtualizado)

                                    if (putResponse.status === 200) {
                                        setSucessMessage(putResponse.data.message);
                                    }
                                } catch (error: any) {
                                    if (error.response?.status === 400 && error.response.data?.errors) {
                                        setErrors(error.response.data.errors);
                                    } else {
                                        alert('Erro inesperado: ');
                                    }
                                } finally {
                                    setSubmitting(false);
                                }
                            }}>
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col gap-5 ">
                                    <div className="flex justify-between mb-5">
                                        <h1 className="text-xl font-bold">Editar Produto</h1>
                                        <button className="cursor-pointer hover:opacity-20" onClick={() => setIsOpen(false)}><img src="icons/close-button.svg" /></button>
                                    </div>
                                    <div>
                                        <FormikTextField name="nome" type="text" placeholder="Digite o nome do produto" />
                                        <ErrorAlert name="nome" component="div" />
                                    </div>

                                    <div>
                                        <FormikTextField name="marca" type="text" placeholder="Digite a marca do produto" />
                                        <ErrorAlert name="marca" component="div" />
                                    </div>

                                    <div className="flex gap-3">
                                        <div>
                                            <FormikTextField name="valor_unico" type="number" placeholder="Valor do produto" />
                                            <ErrorAlert name="valor_unico" component="div" />
                                        </div>

                                        <div>
                                            <FormikTextField name="estoque" type="number" placeholder="quantidade" />
                                            <ErrorAlert name="estoque" component="div" />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 items-center justify-center">
                                        <div className="w-full">
                                            <FormikTextField type="text" name="fornecedor_nome" placeholder="Nome Fornecedor" />
                                            <ErrorAlert name="fornecedor_nome" component="div" />
                                        </div>

                                        <div className="w-full">
                                             <SelectField label="Categoria" options={["Categoria", "Alcolico", "Não Alcolico"]} name="categoria" />
                                            <ErrorAlert name="categoria" component="div" />
                                        </div>
                                    </div>
                                    <Button functionName="Confirmar Edição" type="submit" disabled={isSubmitting} />
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