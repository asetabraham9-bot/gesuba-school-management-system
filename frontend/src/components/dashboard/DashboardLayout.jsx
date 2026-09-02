import { Outlet } from "react-router-dom";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <DashboardHeader />

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

