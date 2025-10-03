import api from "@/services/api/api";

export async function addUsuario(Usuario: { nome: string, cpf: string, senha: string, cargo: string }) {
    try {
        const response = await api.post("/usuarios", Usuario)

        return {
            status: response.status,
            data: response.data
        }
        
    } catch (error: any) {
            throw error;
    }
}