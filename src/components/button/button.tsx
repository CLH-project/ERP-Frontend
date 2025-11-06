// ButtonNormal
interface ButtonProps {
    functionName: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
    theme?: "primary" | "back" | "secondary" | "confirm";
}

export const Button: React.FC<ButtonProps> = ({ theme = "primary", onClick, functionName, type, disabled }) => {
    const themes = {
        primary: "bg-[#725743] text-[#FFF9ED] hover:border-[#725743] text-lg hover:bg-[#FFF9ED] hover:text-[#725743] border-2 border-[#725743]",
        secondary: "bg-white text-[#725743] border-2 border-[#725743] text-lg hover:text-white hover:bg-[#725743]",
        back: "bg-[#B23C3C] text-white hover:bg-white hover:text-[#B23C3C] border-2 border-[#B23C3C]",
        confirm: "bg-[#05674B] text-white hover:bg-white hover:text-[#05674B] border-2 border-[#05674B]"
    }

    const baseTheme = 'w-full h-14 group shadow-md py-4 px-5 rounded-2xl transition-colors duration-300 font-semibold cursor-pointer';
    const selectedTheme = themes[theme] || themes.primary;

    return (
        <button
            type={type}
            className={`${baseTheme} ${selectedTheme}`}
            disabled={disabled} onClick={onClick}>
            {functionName}
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
    return <button onClick={onClick} className=" group flex gap-2 border-2 border-[#725743] bg-[#725743] text-[#FFF9ED] justify-center font-semibold rounded-2xl py-4 px-5 w-full h-14 cursor-pointer transition-colors hover:bg-white hover:text-[#725743]  shadow-md" type="button">
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
            text: "Próxima"
        },
        previous: {
            text: "Anterior",
        }
    }

    const selectedText = directions[direction].text || directions.next.text;

    return (
        <button className="group flex gap-2 px-4 py-2 text-lg font-medium text-[#725743] cursor-pointer hover:opacity-80" onClick={onClick} disabled={disabled}>
            {selectedText}
        </button>
    )
}

interface SidebarButtonProps {
    onClick?: () => void;
    name?: string
    iconUrl?: string
}

interface SidebarButtonProps {
    onClick?: () => void;
    name?: string
    iconUrl?: string
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({ iconUrl, name, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex w-full px-6 py-3 gap-4 rounded-2xl text-sm text-[#725743] text-left font-medium hover:bg-[#FFEEE2] transition-colors cursor-pointer lg:text-lg">

            <img src={iconUrl} alt="" className="w-5 h-5 lg:w-6 lg:h-6" />
            <span className="">
                {name}
            </span>
        </button>
    );
};

interface CloseButtonProps {
    onClick?: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
    return <button type="button" onClick={onClick}
        className="cursor-pointer top-3 end-2.5 text-[#725743] bg-transparent hover:bg-[#725743] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:text-white">
        <svg className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14">

            <path stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
    </button>
}