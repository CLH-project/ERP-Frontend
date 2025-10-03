import { CadastroButtonModal, Button, MaskedTextField, SuccessAlert, ErrorAlert, FormikTextField, CloseButton } from "@/components"
import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { addCliente } from "@/services/cliente/addCliente";

export const CadastroClienteModal: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [SucessMessage, setSucessMessage] = useState("")

    return (
        <div>
            <CadastroButtonModal onClick={() => { setIsOpen(true) }} name="Novo cliente" urlIcon="/icons/customer-icon.svg" />

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center px-5 justify-center bg-black/20">
                    <div className="w-full md:w-3xl bg-[#F3F3F3] rounded-2xl shadow-2xl px-6 py-8">
                        <Formik
                            initialValues={{ nome: "", cpf: "", telefone: "" }}
                            validationSchema={Yup.object({
                                nome: Yup.string().required("Campo de nome obrigatório"),
                                cpf: Yup.string().required("Campo de cpf obrigatório"),
                                telefone: Yup.string().min(15, "Digite um telefone válido").required("Campo de telefone obrigatório")
                            })}

                            onSubmit={
                                async (values, { setSubmitting, setErrors }) => {
                                    setSubmitting(true);
                                    try {
                                        const response = await addCliente( values )

                                        if (response.status === 201) {
                                            setSucessMessage(response.data.message);
                                            setTimeout(() => { setIsOpen(false) }, 2000);
                                            window.location.reload(); 
                                            return;
                                        }

                                        if (response.status === 400) {
                                            const { messages } = response.data;
                                            const fieldErrors: Record<string, string> = {};

                                            if (messages.nome) fieldErrors.nome = messages.nome;
                                            if (messages.cpf) fieldErrors.cpf = messages.cpf;
                                            if (messages.telefone) fieldErrors.telefone = messages.telefone;

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
                                        <CloseButton onClick={() => setIsOpen(false)} />
                                    </div>
                                    <div >
                                        <FormikTextField name="nome" type="text" placeholder="Digite o nome do cliente" label="Nome"/>
                                        <ErrorAlert name="nome" component="div" />
                                    </div>

                                    <div >
                                        <MaskedTextField name="cpf" mask="XXX.XXX.XXX-XX" placeholder="Digite o CPF do cliente" label="CPF"/>
                                        <ErrorAlert name="cpf" component="div" />
                                    </div>

                                    <div>
                                        <MaskedTextField name="telefone" mask="(XX) XXXXX-XXXX" placeholder="Digite o telefone do cliente" label="Telefone" />
                                        <ErrorAlert name="telefone" component="div" />
                                    </div>
                                    <Button functionName="Adicionar Cliente" theme="primary" type="submit" disabled={isSubmitting} />
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