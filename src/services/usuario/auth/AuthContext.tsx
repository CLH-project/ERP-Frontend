'use client'

import axios from "axios";
import { createContext, useContext, useState } from "react"

import { ReactNode } from "react";

type AuthContextType = {
    usuario: any;
    login: (login: string, senha: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState(null);

    const login = async (login: string, senha: string) => {
        const response = await axios.post("http://localhost:8080/login", { login, senha }, { withCredentials: true });
        setUsuario(response.data.usuario);
    }

    const logout = async () => {
        const response = await axios.post("http://localhost:8080/logout", {}, { withCredentials: true });
        setUsuario(null);
    }
    
    return (
        <AuthContext.Provider value={{usuario, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};