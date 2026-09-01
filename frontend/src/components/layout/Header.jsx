import {
  Menu,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="search"
            placeholder="Search..."
            className="w-48 bg-transparent text-sm outline-none placeholder:text-slate-400 lg:w-64"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2.5 text-slate-600 hover:bg-slate-100"
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <div className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" />

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            A
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-slate-900">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              School Administrator
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 sm:block"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;