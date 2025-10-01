import axios from "axios";
import { useAuth } from "../usuario/auth/AuthContext";

export async function searchFornecedor(filter:string ,value: string) {
    try { 
        const getResp = await axios.get(`http://localhost:8080/fornecedores/filter/${value}`, {withCredentials: true})
        return getResp;
    } catch (error) {
        return error;
    }
}