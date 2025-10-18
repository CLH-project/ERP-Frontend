'use client'

import { CadastroButtonModal, Button, MaskedTextField, SuccessAlert, ErrorAlert, FormikTextField, CloseButton } from "@/components"
import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { FormikSelectField } from "@/components/field/field";
import { addUsuario } from "@/services/usuario/addUsuario";
import { AxiosError } from "axios";

export const CadastroUsuarioModal: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [SucessMessage, setSucessMessage] = useState("")

    return (
        <div>
            <CadastroButtonModal onClick={() => { setIsOpen(true) }} name="Novo usuário" urlIcon="/icons/adm-icon.svg" />

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center px-5 justify-center bg-black/20">
                    <div className="w-full md:w-3xl bg-[#F3F3F3] rounded-2xl shadow-2xl px-6 py-8">
                        <Formik
                            initialValues={{ nome: "", login: "", cpf: "", senha: "", cargo: "" }}
                            validationSchema={Yup.object({
                                nome: Yup.string().required("Campo de nome obrigatório"),
                                login: Yup.string().required("Campo de nome obrigatório"),
                                cpf: Yup.string().required("Campo de cpf obrigatório"),
                                senha: Yup.string().min(8, "Digite uma senha válida").required("Campo de senha obrigatório"),
                                cargo: Yup.string().required("Cargo obrigatório"),
                            })}

                            onSubmit={
                                async (values, { setSubmitting, setErrors }) => {
                                    setSubmitting(true);
                                    try {
                                        const response = await addUsuario(values);

                                        if (response.status === 201) {
                                            setSucessMessage(response.data.message);
                                            setTimeout(() => { setIsOpen(false) }, 2000);
                                            window.location.reload();
                                        }
                                    } catch (error: any) {
                                        if (error instanceof AxiosError && error.response) {
                                            setErrors(error.response.data.errors || {});
                                        }
                                    } finally {
                                        setSubmitting(false);
                                    }
                                }}>
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col gap-5">
                                    <div className="flex justify-between mb-5">
                                        <h1 className="text-xl font-bold">Cadastrar Usuário</h1>
                                        <CloseButton onClick={() => setIsOpen(false)} />
                                    </div>
                                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 auto-rows-min">
                                        <div className="flex flex-col justify-between h-full">
                                            <FormikTextField name="nome" type="text" placeholder="Digite o nome do usuário" label="Nome" />
                                            <ErrorAlert name="nome" component="div" />
                                        </div>

                                        <div className="flex flex-col justify-between h-full" >
                                            <FormikTextField name="login" type="text" placeholder="Digite o login de acesso" label="Login" />
                                            <ErrorAlert name="login" component="div" />
                                        </div>

                                        <div className="flex flex-col justify-between h-full">
                                            <MaskedTextField name="cpf" mask="XXX.XXX.XXX-XX" placeholder="Digite o CPF do usuário" label="CPF" />
                                            <ErrorAlert name="cpf" component="div" />
                                        </div>

                                        <div className="flex flex-col justify-between h-full">
                                            <FormikTextField name="senha" type="password" placeholder="Digite a senha do usuário" label="Senha" />
                                            <ErrorAlert name="senha" component="div" />
                                        </div>

                                        <div className="flex flex-col justify-between h-full">
                                            <FormikSelectField label="Cargo" options={["Cargo", "gerente", "caixa"]} name="cargo" />
                                            <ErrorAlert name="cargo" component="div" />
                                        </div>

                                    </div>
                                    <div className="flex flex-col gap-3 md:grid-cols-2 md:grid">
                                        <Button functionName="Adicionar Usuário" theme="primary" type="submit" disabled={isSubmitting} />
                                        <Button functionName="Fechar" theme="back" onClick={() => setIsOpen(false)} />
                                    </div>
                                    {SucessMessage && <SuccessAlert SuccessMessage={SucessMessage} />}
                                </Form>
                            )}
                        </Formik>

                    </div>
                </div>
            )}
        </div>
    )
}