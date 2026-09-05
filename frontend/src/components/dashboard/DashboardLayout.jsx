import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("ggss_token");
    localStorage.removeItem("ggss_user");

    sessionStorage.removeItem("ggss_token");
    sessionStorage.removeItem("ggss_user");

    setIsSidebarOpen(false);

    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <DashboardSidebar
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
          onLogout={handleLogout}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader
            onMenuClick={handleOpenSidebar}
          />

          <DashboardContent>
            <Outlet />
          </DashboardContent>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;