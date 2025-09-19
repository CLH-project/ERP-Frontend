'use client'

import { Formik, Form, ErrorMessage } from "formik";
import { TextField, Button, ErrorAlert, FormikTextField } from "@/components";

import React from "react";
import * as Yup from "yup";

import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService"; 

export const LoginForm: React.FC = () => {
    const router = useRouter();

    const validationSchema = Yup.object(
        {
            username: Yup.string().required("Digite o nome de usuário"),
            password: Yup.string().required("Digite a senha"),
        }
    )

    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}

            onSubmit={ async (values, { setSubmitting, setErrors},) => {
                router.push("/inicio");
                try {

                    const response = await loginUser({
                                                  username:values.username,
                                                  password:values.password
                                                });

                    const data = await response?.json();

                    localStorage.setItem("token", data?.access_token || "");
                    router.push("/inicio");

                } catch (err: any) {

                    // Retorna o erro do servidor, caso disponível >>>>> Verificar ao conectar com o backend
                    const errorData = err?.response?.data || {};

                    // Verifica se o erro tem os campos e mensagem esperados para poder definir Error do forkmik
                    if (errorData?.field && errorData?.message) { 
                        setErrors({ [errorData.field]: errorData.message });
                    } else {
                       alert("Erro ao conectar com o servidor. Por favor, tente novamente mais tarde.");
                    }
                    
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, handleSubmit }) => (    
                <Form className="flex flex-col gap-5"> 
                    <div >
                        <FormikTextField name="username" type="text" placeholder="Digite seu usuário" />
                        <ErrorAlert name="username" component="div"/>
                    </div>

                    <div>
                        <FormikTextField  name="password" type="password" placeholder="Digite sua senha"/>
                        <ErrorAlert name="password" component="div"/>
                    </div>

                    <Button functionName="login" type="submit" disabled={isSubmitting}/>       
                </Form>
            )}
        </Formik>
    );
};