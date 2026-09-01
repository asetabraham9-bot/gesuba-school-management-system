import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  LogIn,
  Menu,
  School,
  UserPlus,
  X,
} from "lucide-react";

const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Clubs", to: "/clubs" },
  { label: "Laboratory", to: "/laboratory" },
  { label: "Study Materials", to: "/study-materials" },
  { label: "Online Exam", to: "/online-exam" },
  { label: "Contact", to: "/contact" },
];

const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-6">
          
          {/* Brand */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-900 text-white">
              <School size={21} strokeWidth={2} />
            </div>

            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-bold tracking-tight text-slate-900">
                Gesuba General Secondary School
              </p>

              <p className="text-xs text-slate-500">
                School Management System
              </p>
            </div>

            <span className="text-base font-bold text-slate-900 sm:hidden">
              GGSS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "rounded-lg px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-blue-50 text-blue-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <LogIn size={16} />
              Login
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              <UserPlus size={16} />
              Parent Sign Up
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t border-slate-200 py-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    [
                      "rounded-lg px-3 py-2.5 text-sm font-medium transition",
                      isActive
                        ? "bg-blue-50 text-blue-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="mt-3 grid gap-2 border-t border-slate-200 pt-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
                >
                  <LogIn size={16} />
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <UserPlus size={16} />
                  Parent Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicNavbar;