import axios from "axios";
import api from "@/services/api/api";

export async function addFornecedor(Fornecedor: { nome: string, cnpj: string, contato: { email: string, telefone: string } }) { 
    try { 
        const response = await api.post("/fornecedores", Fornecedor);

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