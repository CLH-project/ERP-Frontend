import api from "@/services/api/api";

export async function searchFornecedor(filter:string ,value: string) {
    try { 
        const response = await api.get(`/fornecedores/filter/${value}`)
        return response;
    } catch (error) {
        return error;
    }
}