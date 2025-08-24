'use client'

import React, { useState } from "react";
import { Formik, Form } from "formik";
import { TextField, Button, ErrorMessagePop, MaskedTextField } from "@/components";
import * as Yup from "yup";
import axios from "axios";

export const FornecedorCadastroForm: React.FC = () => {

    const [SucessMessage, setSucessMessage] = useState("")

    return (
        <Formik
            initialValues={{ nome: "",
                             cnpj: "", 
                             contato: {
                                email: "",
                                telefone: ""
                             }
                            }}
            validationSchema={Yup.object({
                nome: Yup.string().required(),
                cnpj: Yup.string().required(),
                contato: Yup.object({
                    email: Yup.string().required(),
                    telefone: Yup.string().required()
                })
            })}

             onSubmit={
            async (values, { setSubmitting, setErrors }) => {
                console.log(values)
                    axios.post("http://localhost:8080/fornecedor", values)
                        .then((response) => {
                            
                                console.log(response.data.validation_errors)
                            
                            setSubmitting(false);
                        })
                        .catch((error) => {

                            if (error.response && error.response.status === 400 && error.response.data && error.response.data.validation_errors) {
                                const message = error.response.data.validation_errors;
                                const fieldErrors = {nome: "", cnpj: "", contato: { email: "",telefone: ""} };

                                if(message.nome) {fieldErrors.nome = message.nome;}
                                if(message.cnpj) {fieldErrors.cnpj = message.cnpj;}

                                if(message.contato.email) {fieldErrors.contato.email = message.contato.email;}
                                if(message.contato.telefone) {fieldErrors.contato.telefone = message.contato.telefone;}

                                setErrors(fieldErrors);
                            }
                            setSubmitting(false);
                        });
                }}
                >
            {({ isSubmitting }) => (
                <Form className="flex flex-col gap-5">
                    <div >
                        <label htmlFor="nome">Nome do Fornecedor</label>
                        <TextField name="nome" type="text" placeholder="Digite o nome do fornecedor" />
                        <ErrorMessagePop name="nome" component="div" />
                    </div>

                    <div >
                        <label htmlFor="cnpj">CNPJ do Fornecedor</label>
                        <MaskedTextField name="cnpj" mask="XX.XXX.XXX/XXXX-XX" placeholder="Digite o CNPJ do fornecedor" />
                        <ErrorMessagePop name="cnpj" component="div" />
                    </div>

                    <div>
                        <label htmlFor="contato.email">Email do Fornecedor</label>
                        <TextField name="contato.email" placeholder="Digite o email do fornecedor" />
                        <ErrorMessagePop name="contato.email" component="div" />
                    </div>

                    <div>
                        <label htmlFor="contato.telefone">Telefone do Fornecedor</label>
                        <MaskedTextField name="contato.telefone" mask="(XX) XXXXX-XXXX" placeholder="Digite o telefone do fornecedor" />
                        <ErrorMessagePop name="contato.telefone" component="div" />
                    </div>
                    <Button functionName="Adicionar Fornecedor" type="submit" disabled={isSubmitting} />
                    {SucessMessage && <div className="text-center p-4 rounded-2xl bg-green-200 text-green-800">{SucessMessage}</div>}
                </Form>
            )}
        </Formik>
    )
}
