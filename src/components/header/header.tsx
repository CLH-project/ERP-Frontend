import { Sidebar } from "@/components"

export const Header = () => {
    return (
        <div className="w-full flex justify-between items-center p-2">
          <Sidebar />
        <img className="w-10" src="/image/logo-image.svg" alt="" />
      </div>
    )
}