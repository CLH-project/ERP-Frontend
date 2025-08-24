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
                className="w-full bg-gray-400 rounded-2xl text-white font-bold py-2 px-4 hover:cursor-pointer hover:bg-gray-500 transition-colors duration-300"
                disabled={disabled} onClick={onClick}
            > {functionName}
        </button>
    )
}