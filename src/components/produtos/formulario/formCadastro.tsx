import { Button, CadastroButtonModal, ErrorAlert, SelectField, SuccessAlert, TextField } from "@/components";
import { searchFornecedor } from "@/services/fornecedor/searchFornecedor";
import axios from "axios";
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

export const CadastroProdutoModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [SucessMessage, setSucessMessage] = useState("")

    useEffect(() => {
        setSucessMessage("")
    }, [isOpen])

    return (
        <div>
            <CadastroButtonModal name="Novo produto" onClick={() => {setIsOpen(true)}} urlIcon="/icons/product-icon.svg" />

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center px-5 justify-center bg-black/20">
                    <div className="w-full md:w-3xl bg-[#f3f3f3] rounded-2xl shadow-2xl px-6 py-8 box-border">

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
                                    const getResp: any = await searchFornecedor( "nome" ,values.fornecedor_nome);
                                    
                                    if (getResp.data.fornecedores.length === 0) {
                                        setErrors({ fornecedor_nome: "Erro ao buscar fornecedor." });
                                        return;
                                    }

                                    const fornecedorEncontrado: Fornecedor = getResp.data.fornecedores[0]

                                    if (!fornecedorEncontrado || !fornecedorEncontrado.id) {
                                        console.log(getResp);
                                        setErrors({ fornecedor_nome: getResp.data.erro || "Fornecedor não encontrado." });
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

                                    if (postResponse.status === 201) {
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
                                        <button className="cursor-pointer hover:opacity-20" onClick={() => setIsOpen(false)}><img src="icons/close-button.svg" /></button>
                                    </div>
                                    <div>
                                        <TextField name="nome" type="text" placeholder="Digite o nome do produto" label="Nome"/>
                                        <ErrorAlert name="nome" component="div" />
                                    </div>

                                    <div>
                                        <TextField name="marca" type="text" placeholder="Digite a marca do produto" label="Marca"/>
                                        <ErrorAlert name="marca" component="div" />
                                    </div>

                                    <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                                        <div>
                                            <TextField name="valor_unico" type="number" placeholder="Valor do produto" label="Valor" />
                                            <ErrorAlert name="valor_unico" component="div" />
                                        </div>

                                        <div>
                                            <TextField name="estoque" type="number" placeholder="quantidade" label="Estoque"/>
                                            <ErrorAlert name="estoque" component="div" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
                                        <div className="w-full">
                                            <TextField type="text" name="fornecedor_nome" placeholder="Nome do Fornecedor" label="Fornecedor"/>
                                            <ErrorAlert name="fornecedor_nome" component="div" />
                                        </div>

                                        <div className="w-full">
                                            <SelectField label="Categoria" options={["Categoria", "Alcolico", "Não Alcolico"]} name="categoria" />
                                            <ErrorAlert name="categoria" component="div" />
                                        </div>
                                    </div>
                                    <Button functionName="Adicionar Produto" type="submit" disabled={isSubmitting} />
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