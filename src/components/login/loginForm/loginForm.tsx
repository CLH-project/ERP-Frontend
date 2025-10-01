'use client'

import { Formik, Form, ErrorMessage } from "formik";
import { TextField, Button, ErrorAlert, FormikTextField } from "@/components";
import { useAuth } from "@/services/usuario/auth/AuthContext";

import React from "react";
import * as Yup from "yup";

import { useRouter } from "next/navigation";

export const LoginForm: React.FC = () => {
    const router = useRouter();
    const {login} = useAuth();

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

            onSubmit={async (values, { setSubmitting, setErrors },) => {
                
                try {
                    await login(values.login, values.senha)

                    
                    router.push("/inicio");
                } catch (error: any) {

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
                </Form>
            )}
        </Formik>
    );
};