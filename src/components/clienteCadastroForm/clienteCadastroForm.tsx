import { Formik, Form } from "formik";
import { TextField, Button, ErrorMessagePop, MaskedTextField } from "@/components";
import * as Yup from "yup";

export const ClienteCadastroForm: React.FC = () => {
    
    return (
        <Formik 
        initialValues={{ nome: "", cpf: "", telefone: "" }}
        validationSchema={Yup.object({
            nome: Yup.string().required(),
            cpf: Yup.string().required(),
            telefone: Yup.string().required(), 
        })}        

        onSubmit={
            async (values, { setSubmitting, setErrors }) => {
                try {
                    const response = await fetch("localhost:8080/clientes", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                    });     
                }
                catch (err: any) {
                    alert("Erro ao cadastrar cliente. Por favor, tente novamente mais tarde.");
                } finally {
                    setSubmitting(false);
                }
            }
        }
        >
            {({ isSubmitting }) => (    
                <Form className="flex flex-col gap-5"> 
                    <div >
                        <label htmlFor="nome">Nome do Cliente</label>
                        <TextField name="nome" type="text" placeholder="Digite o nome do cliente" />
                        <ErrorMessagePop name="nome" component="div" />
                    </div>
                    
                    <div >
                        <label htmlFor="cpf">CPF do Cliente</label>
                        <MaskedTextField name="cpf" mask="XXX.XXX.XXX-XX" placeholder="Digite o CPF do cliente"/>
                        <ErrorMessagePop name="cpf" component="div" />
                    </div>

                    <div>
                        <label htmlFor="nome">Telefone do Cliente</label>
                        <MaskedTextField name="telefone" mask="(XX) XXXXX-XXXX" placeholder="Digite o telefone do cliente"/>
                        <ErrorMessagePop name="telefone" component="div"/>
                    </div>
                    <Button functionName="Adicionar Cliente" type="submit" disabled={isSubmitting}/>
                </Form>
            )}

        </Formik>
    )
}