export async function loginUser({username, password}: { username: string; password: string }) {
        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                    headers: {"Content-Type": "application/json"},  
                    body: JSON.stringify({username, password}),
                });

                return response;
            
        } catch (err: any) {
            throw new Error("Erro ao conectar com o servidor");
        }
}