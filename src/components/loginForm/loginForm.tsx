import { Formik, Form, ErrorMessage } from "formik";
import { TextField, Button } from "@/components";
import React from "react";
import * as Yup from "yup";


export const LoginForm: React.FC = () => {

    const validationSchema = Yup.object(
        {
            username: Yup.string().required(),
            password: Yup.string().required(),
        }
    )

    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}

            onSubmit={ async (values, { setSubmitting, setErrors },) => {

                const response = await fetch("http://localhost:8000/api/login", {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    },  
                });

                const data = await response.json();

                if (!response.ok) {
                    setErrors({[data.field]: data.message});
                    setSubmitting(false);
                    return;
                } else {
                    // Login realizado com sucesso
                    console.log("Login realizado com sucesso", data);
                    setSubmitting(false);
                }  
            }}
        >
            {({ isSubmitting, handleSubmit }) => (    
                <Form className="flex flex-col gap-5"> 
                    <div >
                        <TextField name="username" type="text" placeholder="Digite seu usuário" />
                        <ErrorMessage name="username" component="div" />
                    </div>

                    <div>
                        <TextField name="password" type="password" placeholder="Digite sua senha"></TextField>
                        <ErrorMessage name="password" component="div" />
                    </div>

                    <Button
                        functionName="login"
                        type="submit"
                        disabled={isSubmitting}
                    />       
                </Form>
            )}
        </Formik>
    );
};