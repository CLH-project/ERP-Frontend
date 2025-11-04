import { Header, Template, VendaForm } from "@/components";

export default function Caixa() {
    return (
        <Template>
            <div className="w-full">
                <div className="text-3xl md:text-4xl lg:text-5xl mb-10">
                    <h1>Clientes</h1>
                </div>
                <VendaForm />
            </div>
        </Template>
    )
}