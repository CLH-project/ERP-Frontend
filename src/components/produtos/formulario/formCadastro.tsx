import { useState } from "react"

export const FormCadastroProduto: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => { setIsOpen(true) }} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Novo produto
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
                    <div className="bg-white p-6 rounded-2xl shadow-md">

                        <button onClick={() => setIsOpen(false)}className="text-white bg-red-600 px-4 py-2 rounded">
                            Fechar
                        </button>

                        
                    </div>
                </div>
            )}
        </div>
    )
}