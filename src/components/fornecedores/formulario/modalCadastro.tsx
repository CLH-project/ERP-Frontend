import React, { useState } from "react";
import { Formik, Form } from "formik";
import { TextField, Button, MaskedTextField, ErrorAlert, SuccessAlert, CadastroButtonModal } from "@/components";
import * as Yup from "yup";
import axios from "axios";
export const CadastroFornecedorModal: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [SucessMessage, setSucessMessage] = useState("")

    return (
        <div>
            <CadastroButtonModal name="Novo fornecedor" onClick={() => {setIsOpen(true)}} urlIcon="/icons/supplier-icon.svg"/>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center px-5 justify-center bg-black/20">
                    <div className="w-full md:w-3xl bg-[#f3f3f3] rounded-2xl shadow-2x px-6 py-8">
                        <Formik

                            initialValues={{
                                nome: "",
                                cnpj: "",
                                contato: {
                                    email: "",
                                    telefone: ""
                                }
                            }}

                            validationSchema={Yup.object({
                                nome: Yup.string().required("Campo de nome da empresa obrigatório"),
                                cnpj: Yup.string().required("Campo de CNPJ obrigatório"),
                                contato: Yup.object({
                                    email: Yup.string().email("Digite um email válido").required("Campo de email obrigatório"),
                                    telefone: Yup.string().min(15, "Digite um telefone válido").required("Campo de telefone obrigatório")
                                })
                            })}

                            onSubmit={
                                async (values, { setSubmitting, setErrors }) => {
                                    axios.post("http://localhost:8080/fornecedores", values)

                                        .then((response) => {

                                            if (response.status === 201) {
                                                setSucessMessage(response.data.message);
                                            }

                                            setSubmitting(false);
                                        })
                                        .catch((error) => {


                                            if (error.response.status === 400) {

                                                const rawErrors = error.response.data;
                                                const fieldErrors: Record<string, string> = {};

                                                rawErrors.forEach((errorObj: Record<string, string>) => {
                                                    Object.entries(errorObj).forEach(([field, message]) => {

                                                        const mappedField =
                                                            field === "email" || field === "telefone"
                                                                ? `contato.${field}`
                                                                : field;

                                                        fieldErrors[mappedField] = message;
                                                    });
                                                });
                                                setErrors(fieldErrors);
                                            }
                                            setSubmitting(false);
                                        });
                                }}>
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col gap-5">
                                    <div className="flex justify-between mb-5">
                                        <h1 className="text-xl font-bold">Novo Cliente</h1>
                                        <button className="cursor-pointer hover:opacity-20" onClick={() => setIsOpen(false)}><img src="icons/close-button.svg" /></button>
                                    </div>
                                    <div >
                                        <TextField name="nome" type="text" placeholder="Digite o nome do fornecedor" label="Nome"/>
                                        <ErrorAlert name="nome" component="div" />
                                    </div>

                                    <div >
                                        <MaskedTextField name="cnpj" mask="XX.XXX.XXX/XXXX-XX" placeholder="Digite o CNPJ do fornecedor" label="CNPJ" />
                                        <ErrorAlert name="cnpj" component="div" />
                                    </div>

                                    <div>
                                        <TextField name="contato.email" placeholder="Digite o email do fornecedor" label="Email"/>
                                        <ErrorAlert name="contato.email" component="div" />
                                    </div>

                                    <div>
                                        <MaskedTextField name="contato.telefone" mask="(XX) XXXXX-XXXX" placeholder="Digite o telefone do fornecedor" label="Telefone" />
                                        <ErrorAlert name="contato.telefone" component="div" />
                                    </div>
                                    <Button functionName="Adicionar Fornecedor" type="submit" disabled={isSubmitting} />
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