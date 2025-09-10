import axios from "axios";

export async function searchFornecedor(fornecedor_nome: string) {
    try { 
        const getResp = await axios.get('http://localhost:8080/fornecedores/filter', {
            params: { nome: fornecedor_nome },
        });

        return getResp;
    } catch (error) {
        return error;
    }
}