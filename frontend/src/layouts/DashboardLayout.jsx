import DashboardShell from "../components/layout/DashboardShell";

const DashboardLayout = ({ children }) => {
  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
};

export default DashboardLayout;