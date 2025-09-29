import { Sidebar } from "@/components"

export const Header = () => {
    return (
        <div className="w-full flex justify-between items-center p-3 bg-[#3D2422]">
          <Sidebar />
        <img className="w-10" src="/image/logo-small.svg" alt="" />
      </div>
    )
}