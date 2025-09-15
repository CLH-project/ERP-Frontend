import { useState } from "react";

export const CadastroFornecedorModal: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [SucessMessage, setSucessMessage] = useState("")

    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center px-5 justify-center bg-black/20">
                    <div className="w-full md:w-3xl bg-gray-50 rounded-2xl shadow-md px-6 py-8">

                    </div>
                </div>
            )}
        </div>
    )
}