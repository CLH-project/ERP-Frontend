interface ButtonProps {
    functionName: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({onClick, functionName, type , disabled}) => {
    return (
        <button 
            type={type}
                className="w-full text-md bg-[#725743] rounded-2xl text-white font-bold py-3 hover:cursor-pointer hover:opacity-90 transition-colors duration-300"
                disabled={disabled} onClick={onClick}
            > {functionName}
        </button>
    )
}