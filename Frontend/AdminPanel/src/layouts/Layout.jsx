import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* SplashCursor removed for admin panel */}
      <div className="">
        <Header />
      </div>

      {/* Main content below header */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="z-50">
          <Sidebar />
        </aside>

        {/* Main content area */}
        <main className="flex-1  py-20 overflow-y-auto h-screen bg-gray-50 p-4">
          <Outlet />
        </main>
        <div className="fixed bottom-0 z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
