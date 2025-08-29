'use client'

import { LoginForm } from "@/components"

export default function login() {

       return (
        <div className=" min-h-screen flex flex-col items-center justify-between bg-[#240D13]
                         lg:flex-row lg:justify-around "
            >
            
            <div className=" flex flex-col items-center justify-center mb-8">
                <div className="lg:w-[32rem]">
                    <img src="image/logo-image.svg" alt="Logo CLH Bebidas em geral" />
                </div>
                
                <div>
                    <h2 className="text-3xl font-bold text-[#E6E6E6]">Se beber, não dirija</h2>
                </div>
            </div>

            <div className="rounded-4xl px-8 bg-white w-full py-25 
                            sm:px-8 
                            md:px-16 
                            lg:w-[40rem]"
            >
                <h1 className="text-3xl font-bold mb-10 text-[#333333]">Bem vindo!</h1>
                <LoginForm />
            </div>
        </div>
       )
}