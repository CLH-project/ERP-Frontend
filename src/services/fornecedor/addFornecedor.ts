import axios from "axios";

export async function addFornecedor(Fornecedor: { nome: string, cnpj: string, contato: { email: string, telefone: string } }) { 
    try { 
        const response = await axios.post("http://localhost:8080/fornecedores", Fornecedor);

        return {
            status: response.status,
            data: response.data,
        }

    } catch (error: any) {
        if (error.response) {
            return {
                status: error.response.status,
                message: error.response.data.message,
            }
        }
    }
}