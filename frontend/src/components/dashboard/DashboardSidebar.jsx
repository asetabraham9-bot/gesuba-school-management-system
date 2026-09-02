import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Megaphone,
  //Settings as SettingsIcon,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

const studentNavigation = [
  {
    label: "Overview",
    path: "/student-dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "My Academics",
    icon: GraduationCap,
    children: [
      {
        label: "Academic Overview",
        path: "/student-dashboard/academic",
      },
      {
        label: "My Subjects",
        path: "/student-dashboard/subjects",
      },
      {
        label: "My Teachers",
        path: "/student-dashboard/teachers",
      },
    ],
  },

  {
    label: "Learning",
    icon: BookOpen,
    children: [
      {
        label: "Lessons",
        path: "/student-dashboard/lessons",
      },
      {
        label: "Study Materials",
        path: "/student-dashboard/materials",
      },
      {
        label: "Assignments",
        path: "/student-dashboard/assignments",
      },
    ],
  },

  {
    label: "My Submissions",
    path: "/student-dashboard/submissions",
    icon: ClipboardCheck,
  },

  {
    label: "Examinations",
    path: "/student-dashboard/examinations",
    icon: FileText,
    disabled: true,
  },

  {
    label: "Attendance",
    path: "/student-dashboard/attendance",
    icon: CalendarDays,
    disabled: true,
  },

  {
    label: "Announcements",
    path: "/student-dashboard/announcements",
    icon: Megaphone,
    disabled: true,
    
  },

  {
    label: "Account",
    icon: UserRound,
    children: [
      {
        label: "My Profile",
        path: "/student-dashboard/profile",
      },
      {
        label: "Settings",
        path: "/student-dashboard/settings",
      },
    ],
  },
];

const DashboardSidebar = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close dashboard menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="GGSS"
              className="h-9 w-9 rounded-lg object-cover"
            />

            <div>
              <p className="text-sm font-bold text-slate-900">
                GGSS
              </p>

              <p className="text-xs text-slate-500">
                Student Portal
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close dashboard menu"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-1">
            {studentNavigation.map((item) => {
              const Icon = item.icon;

              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="pt-4 first:pt-0"
                  >
                    <div className="flex items-center gap-3 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      <Icon size={16} />

                      <span>{item.label}</span>
                    </div>

                    <div className="mt-1 space-y-1">
                      {item.children.map(
                        (child) => (
                          <a
                            key={child.path}
                            href={child.path}
                            onClick={onClose}
                            className="block rounded-lg px-3 py-2 pl-11 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                          >
                            {child.label}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div key={item.label}>
                  <a
                    href={item.disabled ? undefined : item.path}
                    onClick={
                      item.disabled
                        ? (event) =>
                            event.preventDefault()
                        : onClose
                    }
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      item.disabled
                        ? "cursor-not-allowed text-slate-300"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon size={18} />

                    <span>{item.label}</span>

                    {item.disabled && (
                      <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-400">
                        Soon
                      </span>
                    )}
                  </a>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-slate-200 p-3">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <UsersRound size={18} />

            <span>Help & Support</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />

            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;

