import { CadastroButtonModal, TextField, Button, MaskedTextField, SuccessAlert, ErrorAlert, FormikTextField } from "@/components"
import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { addCliente } from "@/services/cliente/addCliente";
import { FormikSelectField } from "@/components/field/field";
import axios from "axios";
import { addUsuario } from "@/services/usuario/addUsuario";

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
                            initialValues={{ nome: "", cpf: "", senha: "", cargo: "" }}
                            validationSchema={Yup.object({
                                nome: Yup.string().required("Campo de nome obrigatório"),
                                cpf: Yup.string().required("Campo de cpf obrigatório"),
                                senha: Yup.string().min(8, "Digite uma senha válida").required("Campo de senha obrigatório"),
                                cargo: Yup.string().required("Cargo obrigatório"),
                            })}

                            onSubmit={
                                async (values, { setSubmitting, setErrors, resetForm }) => {
                                    setSubmitting(true);
                                    try {
                                       const response = await addUsuario(values);

                                        if (response.status === 201) {
                                            setSucessMessage(response.data.message);
                                            setTimeout(() => { setIsOpen(false); setSucessMessage(""); resetForm(); }, 2000);
                                            return;
                                        }

                                        if (response.status === 400 && response.error === 400) {
                                            const { messages } = response;
                                            const fieldErrors: Record<string, string> = {};

                                            if (messages.nome) fieldErrors.nome = messages.nome;
                                            if (messages.cpf) fieldErrors.cpf = messages.cpf;
                                            if (messages.senha) fieldErrors.senha = messages.senha;

                                            setErrors(fieldErrors);
                                        }
                                    } catch (error: any) {
                                        setErrors(error.messages || { geral: "Erro inesperado. Tente novamente mais tarde." });
                                    } finally {
                                        setSubmitting(false);
                                    }
                                }}>
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col gap-5">
                                    <div className="flex justify-between mb-5">
                                        <h1 className="text-xl font-bold">Novo Cliente</h1>
                                        <button className="cursor-pointer hover:opacity-20" onClick={() => setIsOpen(false)}><img src="icons/close-button.svg" /></button>
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
                                        <FormikTextField name="senha" type="password" placeholder="Digite o nome do usuário" label="Senha" />
                                        <ErrorAlert name="senha" component="div" />
                                    </div>

                                    <div className="w-full">
                                        <FormikSelectField label="Cargo" options={["Cargo", "gerente", "caixa"]} name="cargo" />
                                        <ErrorAlert name="cargo" component="div" />
                                    </div>
                                    <Button functionName="Adicionar Usuário" theme="primary" type="submit" disabled={isSubmitting} />
                                    {SucessMessage && <SuccessAlert SuccessMessage={SucessMessage} />}
                                </Form>
                            )}
                        </Formik>
                        <div className="mt-5">
                            <Button functionName="Fechar" theme="back" onClick={() => setIsOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}