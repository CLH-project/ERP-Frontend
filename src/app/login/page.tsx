'use client'

import { LoginForm } from "@/components"

export default function login() {

       return (
        <div className=" min-h-screen flex flex-col items-center justify-between bg-gray-100" >
            <div className=" flex flex-col items-center justify-center mb-8">
                <div className="mt-10 mb-5">
                    <img src="image/logo-image.svg" alt="" />
                </div>
                
                <div>
                    <h2 className="text-2xl font-bold">Se beber, não dirija</h2>
                </div>
            </div>

            <div className="rounded-4xl px-8 bg-white w-full py-20 sm:px-8 md:px-16 lg:px-32">
                <h1 className="text-3xl font-bold mb-6">Bem vindo!</h1>
                <LoginForm />
            </div>
        </div>
       )
}