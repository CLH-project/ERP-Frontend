import { Button, ErrorAlert, SuccessAlert, TextField } from "@/components";
import axios from "axios";
import { error } from "console";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react"
import * as Yup from "yup";

interface Fornecedor {
    id: string;
    nome: string;
    cnpj: string;
    email: string;
    telefone: string;
}

export const FormCadastroProduto: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [SucessMessage, setSucessMessage] = useState("")

    return (
        <div>
            <button onClick={() => { setIsOpen(true) }} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Novo produto
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center px-5 justify-center bg-black/20">
                    <div className="bg-gray-50 rounded-2xl shadow-md px-4 py-6">

                        <Formik
                            initialValues={{
                                nome: "",
                                marca: "",
                                valor_unico: 0,
                                estoque: 0,
                                categoria: "",
                                fornecedor_id: "",
                                fornecedor_nome: "",
                            }}

                            validationSchema={Yup.object({
                                nome: Yup.string().required("Nome do produto é obrigatório"),
                                marca: Yup.string().required("Nome da marca é obrigatório"),
                                valor_unico: Yup.number().required("Valor do produto obrigatório"),
                                estoque: Yup.number().required("Quantidade de estoque necessário"),
                                fornecedor_nome: Yup.string().required("Nome do fornecedor obrigatório"),
                            })}

                            onSubmit={async (values, { setSubmitting, setErrors }) => {
                                try {
                                    const getResp = await axios.get('http://localhost:8080/fornecedor/filter', {
                                        params: { nome: values.fornecedor_nome },
                                    });

                                    const fornecedorEncontrado: Fornecedor = getResp.data.data[0]
                                    // Recebendo do backend um array contendo um objeto que é o que foi encontrado

                                    if (!fornecedorEncontrado || fornecedorEncontrado.id === "") {
                                        setErrors({ fornecedor_nome: getResp.data.erro });
                                        return;
                                    }

                                    const produtoBody = {
                                        nome: values.nome,
                                        marca: values.marca,
                                        valor_unico: values.valor_unico,
                                        estoque: values.estoque,
                                        categoria: values.categoria,
                                        fornecedor_id: fornecedorEncontrado.id,
                                    };

                                    const postResponse = await axios.post('http://localhost:8080/produtos', produtoBody);

                                    if (postResponse.status === 200) {
                                        setSucessMessage(postResponse.data.message)
                                    }

                                } catch (error: any) {
                                    if (error.response?.status === 400 && error.response.data?.errors) {
                                        setErrors(error.response.data.errors);
                                    } else {
                                        alert('Erro inesperado: ');
                                    }
                                } finally {
                                    setSubmitting(false)
                                }
                            }}>
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col gap-5 ">
                                    <div className="flex justify-between mb-5">
                                        <h1 className="text-xl font-bold">Novo Produto</h1>
                                        <button className="cursor-pointer hover:opacity-20" onClick={()=> setIsOpen(false)}><img src="icons/close-button.svg"/></button>
                                    </div>
                                    <div>
                                        <TextField name="nome" type="text" placeholder="Digite o nome do produto" />
                                        <ErrorAlert name="nome" component="div" />
                                    </div>

                                    <div>
                                        <TextField name="marca" type="text" placeholder="Digite a marca do produto" />
                                        <ErrorAlert name="marca" component="div" />
                                    </div>

                                    <div className="flex gap-3">
                                        <div>
                                            <TextField name="valor_unico" type="number" placeholder="Valor do produto" />
                                            <ErrorAlert name="valor_unico" component="div" />
                                        </div>

                                        <div>
                                            <TextField name="estoque" type="number" placeholder="quantidade" />
                                            <ErrorAlert name="estoque" component="div" />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 items-center justify-center">
                                        <div className="w-full">
                                            <TextField type="text" name="fornecedor_nome" placeholder="Nome Fornecedor" />
                                            <ErrorAlert name="fornecedor_nome" component="div" />
                                        </div>

                                        <div className="w-full">
                                            <Field className="text-center bg-white border shadow-md border-[#CDCDCD] rounded-3xl py-4 w-full focus:outline-none" as="select" name="categoria">
                                                <option value="">Categoria</option>
                                                <option value="Alcolico">Alcolico</option>
                                                <option value="Não Alcolico">Não Alcolico</option>
                                            </Field>
                                            <ErrorAlert name="categoria" component="div" />
                                        </div>
                                    </div>
                                    <Button functionName="Adicionar Produto" type="submit" disabled={isSubmitting} />
                                    {SucessMessage && <SuccessAlert SuccessMessage={SucessMessage} />}
                                </Form>
                            )}
                        </Formik>
                        <div className="mt-5">
                            <Button functionName="Fechar" onClick={() => setIsOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}