import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header/>
       <Outlet/>
      </main>
      {/* footer */}

      <div className="p-10 text-center bg-gray-800">
          Made with Sumeet Dubey
      </div>
    </div>
  )
}

export default AppLayout;