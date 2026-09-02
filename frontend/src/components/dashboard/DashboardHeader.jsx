import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

const DashboardHeader = ({
  onMenuClick,
  userName = "Student",
  userRole = "Student",
}) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Left side */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          aria-label="Open dashboard menu"
        >
          <Menu size={21} />
        </button>

        <div className="hidden sm:flex sm:items-center sm:gap-2">
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="search"
            placeholder="Search..."
            className="w-40 border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0 md:w-56"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Notifications"
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-600" />
        </button>

        <div className="hidden h-6 w-px bg-slate-200 sm:block" />

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {userName}
            </p>

            <p className="text-xs text-slate-500">
              {userRole}
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-900 text-sm font-semibold text-white">
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

