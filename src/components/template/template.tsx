import React from "react";
import { Sidebar } from "../sidebar";

interface TempateProps {
    children: React.ReactNode
}

export const Template: React.FC<TempateProps> = ({children}) => {
    return (
        <div className="w-full flex h-screen flex-col lg:flex-row gap-4 lg:gap-10 px-6 py-4 lg:py-10 bg-[#f3f3f3]">
            <Sidebar/>
            <main className="w-full bg-white p-5 lg:p-20 rounded-2xl shadow-md flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}