import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
};

export default PublicLayout;