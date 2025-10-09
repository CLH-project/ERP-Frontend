'use client'

import { Formik, Form, ErrorMessage } from "formik";
import { TextField, Button, ErrorAlert, FormikTextField, SuccessAlert } from "@/components";
import { useAuth } from "@/services/usuario/auth/AuthContext";

import React from "react";
import * as Yup from "yup";

import { useRouter } from "next/navigation";

export const LoginForm: React.FC = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [SucessMessage, setSucessMessage] = React.useState("")
    const [ErrorMessage, setErrorMessage] = React.useState("")

    const validationSchema = Yup.object(
        {
            login: Yup.string().required("Digite o nome de usuário"),
            senha: Yup.string().required("Digite a senha"),
        }
    )

    return (
        <Formik
            initialValues={{ login: "", senha: "" }}
            validationSchema={validationSchema}

            onSubmit={async (values, { setSubmitting },) => {

                try {
                    const response: any = await login(values.login, values.senha)

                    if (response?.status === 200) {
                        setSucessMessage("Login realizado com sucesso!");
                        setTimeout(() => { router.push("/inicio"); }, 1000);
                    } else {
                        setErrorMessage(response.data.error);
                    }
                } catch (error: any) {
                    setErrorMessage(error.data?.error);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, handleSubmit }) => (
                <Form className="flex flex-col gap-5">
                    <div >
                        <FormikTextField label="Usuário" name="login" type="text" placeholder="Digite seu usuário" />
                        <ErrorAlert name="login" component="div" />
                    </div>

                    <div>
                        <FormikTextField label="Senha" name="senha" type="password" placeholder="Digite sua senha" />
                        <ErrorAlert name="senha" component="div" />
                    </div>

                    <Button theme="primary" functionName="login" type="submit" disabled={isSubmitting} />
                    {ErrorMessage && <SuccessAlert SuccessMessage={ErrorMessage} />}
                    {SucessMessage && <SuccessAlert SuccessMessage={SucessMessage} />}
                </Form>
            )}
        </Formik>
    );
};