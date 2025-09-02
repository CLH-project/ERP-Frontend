'use client'

import React, { useState } from "react";
import { Formik, Form } from "formik";
import { TextField, Button, MaskedTextField, ErrorAlert, SuccessAlert } from "@/components";
import * as Yup from "yup";
import axios from "axios";

export const FornecedorCadastroForm: React.FC = () => {

    const [SucessMessage, setSucessMessage] = useState("")


    return (
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
                    axios.post("http://localhost:8080/fornecedor", values)

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
                    <div >
                        <label htmlFor="nome">Nome do Fornecedor</label>
                        <TextField name="nome" type="text" placeholder="Digite o nome do fornecedor" />
                        <ErrorAlert name="nome" component="div" />
                    </div>

                    <div >
                        <label htmlFor="cnpj">CNPJ do Fornecedor</label>
                        <MaskedTextField name="cnpj" mask="XX.XXX.XXX/XXXX-XX" placeholder="Digite o CNPJ do fornecedor" />
                        <ErrorAlert name="cnpj" component="div" />
                    </div>

                    <div>
                        <label htmlFor="contato.email">Email do Fornecedor</label>
                        <TextField name="contato.email" placeholder="Digite o email do fornecedor" />
                        <ErrorAlert name="contato.email" component="div" />
                    </div>

                    <div>
                        <label htmlFor="contato.telefone">Telefone do Fornecedor</label>
                        <MaskedTextField name="contato.telefone" mask="(XX) XXXXX-XXXX" placeholder="Digite o telefone do fornecedor" />
                        <ErrorAlert name="contato.telefone" component="div" />
                    </div>
                    <Button functionName="Adicionar Fornecedor" type="submit" disabled={isSubmitting} />
                    {SucessMessage && <SuccessAlert SuccessMessage={SucessMessage} />}
                </Form>
            )}
        </Formik>
    )
}
