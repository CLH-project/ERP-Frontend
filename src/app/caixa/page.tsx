import { Header, VendaForm } from "@/components";

export default function Caixa() {
    return (
        <div className="w-full h-screen flex flex-col" >
            <Header />
            <div className="mt-10 flex flex-col px-5 md:px-24 md:justify-center">
                <div className="text-2xl font-bold mb-5">
                    <h1>Clientes</h1>
                </div>
                <VendaForm />
            </div>
        </div>
    )
}