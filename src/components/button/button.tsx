interface ButtonProps {
    functionName: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ functionName, type , disabled}) => {
    return (
        <button 
        type={type}
            className="bg-gray-400 rounded-2xl text-white font-bold py-2 px-4 rounded hover:cursor-pointer hover:bg-gray-500 transition-colors duration-300"
            disabled={disabled}
        > {functionName}
        </button>
    )
}