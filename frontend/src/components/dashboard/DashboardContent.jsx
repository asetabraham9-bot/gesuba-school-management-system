const DashboardContent = ({ children }) => {
  return (
    <main className="flex-1 overflow-y-auto bg-slate-50">
      <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </main>
  );
};

export default DashboardContent;
