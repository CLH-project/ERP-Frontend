'use client'

import api from "@/services/api/api";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"

import { ReactNode } from "react";


type AuthContextType = {
    token: string | null;
    user: User | null;
    login: (login: string, senha: string) => Promise<void>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    token: null,
    user: null,
    login: async () => { },
    logout: () => { },
});

type User = {
    id: number;
    login: string;
    nome?: string
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;

            try {
                const payload = JSON.parse(atob(savedToken.split('.')[1]));
                setUser({ id: payload.sub, login: payload.login });
            } catch (err) {
                console.error('Token inválido:', err);
                logout();
            }
        }
    }, []);

    const login = async (login: string, senha: string): Promise<any> => {

        try {
            const response = await api.post("/login", { login, senha });
            const { token, usuario } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('usuario', JSON.stringify(usuario));
            setToken(token)
            setUser(usuario)

            return response;
        } catch (error: any) {
            return error.response;
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    return context;
};