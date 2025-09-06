'use client'

import React, { useState } from "react";
import { Formik, Form } from "formik";
import { TextField, Button, MaskedTextField, SuccessAlert, ErrorAlert} from "@/components";
import * as Yup from "yup";
import axios from "axios";

export const FormCadastroCliente: React.FC = () => {

    const [SucessMessage, setSucessMessage] = useState("")

    return (
        <Formik
            initialValues={{ nome: "", cpf: "", telefone: "" }}
            validationSchema={Yup.object({
                nome: Yup.string().required("Campo de nome obrigatório"),
                cpf: Yup.string().required("Campo de cpf obrigatório"),
                telefone: Yup.string().min(15, "Digite um telefone válido").required("Campo de telefone obrigatório")
            })}

            onSubmit={
                async (values, { setSubmitting, setErrors }) => {


                    axios.post("http://localhost:8080/clientes", values)
                        .then((response) => {
                            if (response.status === 201) {
                                setSucessMessage(response.data.message);
                            }
                            setSubmitting(false);
                        })
                        .catch((error) => {

                            if (error.status === 400) {
                                const message = error.response.data.messages;
                                const fieldErrors = { nome: "", cpf: "", telefone: "" };

                                if (message.nome) { fieldErrors.nome = message.nome; }
                                if (message.cpf) { fieldErrors.cpf = message.cpf; }
                                if (message.telefone) { fieldErrors.telefone = message.telefone; }

                                setErrors(fieldErrors);
                                setSucessMessage("")
                            }
                            setSubmitting(false);
                        });
                }
            }
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col gap-5">
                    <div >
                        <label htmlFor="nome">Nome do Cliente</label>
                        <TextField name="nome" type="text" placeholder="Digite o nome do cliente" />
                        <ErrorAlert name="nome" component="div"/>
                    </div>

                    <div >
                        <label htmlFor="cpf">CPF do Cliente</label>
                        <MaskedTextField name="cpf" mask="XXX.XXX.XXX-XX" placeholder="Digite o CPF do cliente" />
                        <ErrorAlert name="cpf" component="div"/>
                    </div>

                    <div>
                        <label htmlFor="nome">Telefone do Cliente</label>
                        <MaskedTextField name="telefone" mask="(XX) XXXXX-XXXX" placeholder="Digite o telefone do cliente" />
                        <ErrorAlert name="telefone" component="div"/>
                    </div>
                    <Button functionName="Adicionar Cliente" type="submit" disabled={isSubmitting} />
                    {SucessMessage && <SuccessAlert SuccessMessage={SucessMessage}/>}
                </Form>

            )}

        </Formik>

    )
}
