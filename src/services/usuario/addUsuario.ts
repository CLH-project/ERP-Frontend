import axios from "axios";

export async function addUsuario(Usuario: { nome: string, cpf: string, senha: string, cargo: string }) {
    try {

        const response = await axios.post("http://localhost:8080/usuarios", Usuario)

        return {
            status: response.status,
            data: response.data
        }
        
    } catch (error: any) {

        if (error.response) {
            return {
                status: error.response.status,
                error: error.response.status,
                messages: error.response.data.messages || {}
            }
        }

        return {
            status: 500,
            error: 500,
            messages: { geral: "Erro inesperado. Tente novamente mais tarde." }
        }
    }
}