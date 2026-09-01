import {
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
} from "lucide-react";

const stats = [
  {
    title: "Students",
    value: "1,240",
    description: "Currently registered",
    icon: GraduationCap,
  },
  {
    title: "Teachers",
    value: "86",
    description: "Active teachers",
    icon: Users,
  },
  {
    title: "Subjects",
    value: "42",
    description: "Available subjects",
    icon: BookOpen,
  },
  {
    title: "Assignments",
    value: "128",
    description: "Published assignments",
    icon: ClipboardList,
  },
];

const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">
          Overview
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
          Welcome to Gesuba General Secondary School
          Management System.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-100 p-2.5 text-slate-700">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <h2 className="text-base font-semibold text-slate-900">
            School Overview
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Your school management workspace will
            appear here as we connect the dashboard
            to the GGSS backend.
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-base font-semibold text-slate-900">
            Recent Activity
          </h2>

          <div className="mt-4 space-y-4">
            <p className="text-sm text-slate-500">
              No recent activity yet.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;