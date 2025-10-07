'use client'

import { Button, CloseButton, ErrorAlert, FormikTextField, MaskedTextField, SuccessAlert } from "@/components";
import { Formik, Form } from "formik";
import { useState } from "react"
import * as Yup from "yup";
import axios from 'axios';
import { FormikSelectField } from "@/components/field/field";
import api from "@/services/api/api";

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
    const [usuarioEditar, setUsuarioEditar] = useState<Usuario>(usuario);


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
                                id: usuario ? usuarioEditar.id : "",
                                nome: usuario ? usuarioEditar.nome : "",
                                cpf: usuario ? usuarioEditar.cpf : "",
                                senha: "",
                                cargo: usuario ? usuarioEditar.cargo : ""
                            }}

                            validationSchema={Yup.object({
                                nome: Yup.string().required("Nome do usuário é obrigatório"),
                                cpf: Yup.string().required("CPF é obrigatório"),
                                senha: Yup.number().required("Digite a nova senha"),
                                cargo: Yup.string().required("Cargo obrigatório"),
                            })}

                            onSubmit={async (values, { setSubmitting, setErrors }) => {
                                try {

                                    const usuarioAtualizado = {
                                        id: values.id,
                                        nome: values.nome,
                                        cpf: values.cpf,
                                        senha: values.senha,
                                        cargo: values.cargo
                                    }

                                    const putResponse = await api.put(`/usuarios/${usuario.id}`, usuarioAtualizado)

                                    if (putResponse.status === 200) {
                                        setSucessMessage(putResponse.data.message);
                                        setTimeout( () => { setIsOpen(false); }, 2000 );
                                        window.location.reload();
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
                                        <h1 className="text-xl font-bold">Editar Usuário</h1>
                                        <CloseButton onClick={() => setIsOpen(false)} />
                                    </div>
                                    <div >
                                        <FormikTextField name="nome" type="text" placeholder="Digite o nome do usuário" label="Nome" />
                                        <ErrorAlert name="nome" component="div" />
                                    </div>

                                    <div >
                                        <MaskedTextField name="cpf" mask="XXX.XXX.XXX-XX" placeholder="Digite o CPF do usuário" label="CPF" />
                                        <ErrorAlert name="cpf" component="div" />
                                    </div>

                                    <div >
                                        <FormikTextField name="senha" type="password" placeholder="Digite a senha de usuário" label="Senha" />
                                        <ErrorAlert name="senha" component="div" />
                                    </div>

                                    <div className="w-full">
                                        <FormikSelectField label="Cargo" options={["Cargo", "gerente", "caixa"]} name="cargo" />
                                        <ErrorAlert name="cargo" component="div" />
                                    </div>
                                    <Button theme="primary" functionName="Confirmar Edição" type="submit" disabled={isSubmitting} />
                                    {SucessMessage && <SuccessAlert SuccessMessage={SucessMessage}/>}
                                </Form>
                            )}
                        </Formik>
                        <div className="mt-5">
                            <Button theme="back" functionName="Fechar" onClick={() => setIsOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}