interface ButtonProps {
    functionName: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ onClick, functionName, type, disabled }) => {
    return (
        <button
            type={type}
            className="w-full text-md bg-[#725743] rounded-2xl text-white font-bold py-3 hover:cursor-pointer hover:opacity-90 transition-colors duration-300"
            disabled={disabled} onClick={onClick}
        > {functionName}
        </button>
    )
}


interface CadastroButtonModalProps {
    name?:string,
    urlIcon?: string,
    onClick?: () => void;
}

export const CadastroButtonModal: React.FC<CadastroButtonModalProps> = ({ name, urlIcon, onClick}) => {
    return <button onClick={onClick} className="flex gap-2 border-2 border-[#725743] text-[#725743] font-semibold rounded-2xl py-2 px-4 cursor-pointer hover:opacity-80 bg-white shadow-md" type="button">
        <img src={urlIcon} alt="" />{name}
    </button>
}