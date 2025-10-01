import axios from "axios";

export async function addUsuario(Usuario: { nome: string, cpf: string, senha: string, cargo: string }) {
    try {
        const response = await axios.post("http://localhost:8080/usuarios", Usuario)

        return {
            status: response.status,
            data: response.data
        }
        
    } catch (error: any) {
            throw error;
    }
}