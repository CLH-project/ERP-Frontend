'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        if(!localStorage.getItem("token") || !localStorage.getItem("usuario")) {
            router.push("/login");
        }
    })

    return <>{children}</>;
}

