'use client'

import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const {token} = useAuth();
    const router = useRouter()

    useEffect(() => {
        if(!token) {
            router.push("/login");
        }
    })

    return <>{children}</>;
}

