import { useRouter } from "next/navigation";

// ButtonNormal
interface ButtonProps {
    functionName: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
    theme?: "primary" | "back" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({ theme = "primary", onClick, functionName, type, disabled }) => {
    const themes = {
        primary: "bg-[#725743] text-[#FFF9ED] hover:border-[#725743] text-lg hover:bg-[#FFF9ED] hover:text-[#725743]  border-2 hover:border-[#725743]",
        secondary: "bg-white text-[#725743] border-2 border-[#725743] text-lg hover:text-white hover:bg-[#725743]",
        back: "bg-[#B23C3C] text-white hover:bg-white hover:text-[#B23C3C] border-2 border-[#B23C3C]",   
    }

    const baseTheme = 'w-full group shadow-md px-5 py-3 rounded-2xl transition-colors duration-300 font-semibold cursor-pointer';
    const selectedTheme = themes[theme] || themes.primary;

    return (
        <button
            type={type}
            className={`${baseTheme} ${selectedTheme}`}
            disabled={disabled} onClick={onClick}
        > {functionName}
        </button>
    )
}

//CadastroButton
interface CadastroButtonModalProps {
    name?: string,
    urlIcon?: string,
    onClick?: () => void;
}

export const CadastroButtonModal: React.FC<CadastroButtonModalProps> = ({ name, urlIcon, onClick }) => {
    return <button onClick={onClick} className=" group flex gap-2 border-2 border-[#725743] text-[#725743] font-semibold rounded-2xl py-2 px-4 cursor-pointer transition-colors hover:bg-[#725743] hover:text-white bg-white shadow-md" type="button">
        <img className="group-hover:invert group-hover:brightness-0 transition-colors" src={urlIcon} alt="" />{name}
    </button>
}

// PaginateButton
interface PaginateButtonProps {
    disabled?: boolean,
    direction?: "next" | "previous",
    onClick?: () => void,
}

export const PaginateButton: React.FC<PaginateButtonProps> = ({ onClick, disabled, direction = "next" }) => {

    const directions = {
        next: {
            url: "/icons/next-icon.svg",
            text: "Próxima"
        },
        previous: {
            url: "/icons/previous-icon.svg",
            text: "Anterior",
        }
    }

    const selectedUrl = directions[direction].url || directions.next.url;
    const selectedText = directions[direction].text || directions.next.text;

    return (
        <button className="group flex gap-2 px-4 py-2 border-2 text-sm border-[#725743] rounded-2xl cursor-pointer hover:bg-[#725743] hover:text-white" onClick={onClick} disabled={disabled}>
            <img className="group-hover:invert group-hover:brightness-0 transition-colors" src={selectedUrl} alt={selectedText} /> {selectedText}
        </button>
    )
}

//SidebarButton 
interface SidebarButtonProps {
    onClick?: () => void;
    name?: string
    iconUrl?: string
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({ iconUrl, name, onClick }) => {
    const router = useRouter();

    return <button onClick={onClick}
        className="gap-2 mb-4 w-full text-[#131313] text-left px-2 py-3 hover:bg-[#FFEEE2] rounded-2xl flex items-center hover:cursor-pointer transition-colors">
        <img src={iconUrl} alt="" />{name}
    </button>
}