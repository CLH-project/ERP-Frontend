'use client'

import { Formik, Form, ErrorMessage } from "formik";
import { TextField, Button, ErrorAlert, FormikTextField, SuccessAlert, NotificationModal } from "@/components";
import { useAuth } from "@/services/usuario/auth/AuthContext";

import React, { useCallback, useState } from "react";
import * as Yup from "yup";

import { useRouter } from "next/navigation";

export const LoginForm: React.FC = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [ErrorMessage, setErrorMessage] = React.useState("")

    const [notificationModal, setNotificationModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        isSuccess: false,
        onConfirmSuccess: undefined as (() => void) | undefined,
    });

    const openNotification = useCallback((title: string, message: string, isSuccess: boolean, onConfirmSuccess?: () => void) => {
        setNotificationModal({ isOpen: true, title, message, isSuccess, onConfirmSuccess });
    }, []);

    const closeNotification = useCallback(() => {
        setNotificationModal(prev => ({ ...prev, isOpen: false }));
    }, []);


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
                        setTimeout(() => { router.push("/inicio"); }, 1000);
                    } else {
                        openNotification("Erro no login", `Detalhes: ${response.data.error}`, false);
                    }
                } catch (error: any) {
                    const errorMessage = error.data?.error
                    openNotification("Erro no login", `Detalhes: ${errorMessage}`, false);
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
                    <NotificationModal
                        isOpen={notificationModal.isOpen}
                        onClose={closeNotification}
                        title={notificationModal.title}
                        message={notificationModal.message}
                        isSuccess={notificationModal.isSuccess}
                        onConfirmSuccess={notificationModal.onConfirmSuccess}
                    />
                </Form>

            )}
        </Formik>

    );

};