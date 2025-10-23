import { Sidebar } from "@/components"

export const Header = () => {
    return (
        <div className="lg:flex-row-reverse w-full flex justify-between items-center shadow-md bg-[#3d2422]">
            <Sidebar />
            <div className="lg:hidden">
                <img className="w-10" src="/image/logo-small.svg" alt="" />
            </div>
        </div>
    )
}