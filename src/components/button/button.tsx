const themes = {
    back: "bg-[#B23C3C] text-white",
    primary: "bg-[#116343] text-[#FFF9ED]",
    red: "bg-[#C4505C] text-[#FFF9ED]",
    brown: "bg-[#BC8C4A] text-[#FFF9ED]",
}

interface ButtonProps {
    functionName: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
    theme?: "primary" | "back" | "red" | "brown";
}

export const Button: React.FC<ButtonProps> = ({theme = "primary", onClick, functionName, type, disabled }) => {
    const baseTheme = 'w-full group shadow-md px-5 py-3 rounded-2xl transition-colors duration-300 font-semibold cursor-pointer';
    const selectedTheme = themes[theme] || themes.red;

    return (
        <button
            type={type}
            className={`${baseTheme} ${selectedTheme}`}
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
    return <button onClick={onClick} className=" group flex gap-2 border-2 border-[#725743] text-[#725743] font-semibold rounded-2xl py-2 px-4 cursor-pointer transition-colors hover:bg-[#725743] hover:text-white bg-white shadow-md" type="button">
        <img className="group-hover:invert group-hover:brightness-0 transition-colors" src={urlIcon} alt="" />{name}
    </button>
}