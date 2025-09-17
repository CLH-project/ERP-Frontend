import axios from "axios";

export async function searchFornecedor(filter:string ,value: string) {
    try { 
        const getResp = await axios.get(`http://localhost:8080/fornecedores/filter/${value}`)
        return getResp;
    } catch (error) {
        return error;
    }
}