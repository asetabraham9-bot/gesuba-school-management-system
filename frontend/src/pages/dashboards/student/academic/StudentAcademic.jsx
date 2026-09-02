import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  Layers3,
  UsersRound,
} from "lucide-react";

const academicInfo = [
  {
    label: "Academic Year",
    value: "2026/27",
    description: "Current academic year",
    icon: CalendarDays,
  },
  {
    label: "Grade",
    value: "Grade 10",
    description: "Current grade level",
    icon: GraduationCap,
  },
  {
    label: "Section",
    value: "10-A",
    description: "Current class section",
    icon: UsersRound,
  },
  {
    label: "Subjects",
    value: "6",
    description: "Currently enrolled subjects",
    icon: BookOpen,
  },
];

const StudentAcademic = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <GraduationCap size={17} />

          <span>Student Portal</span>

          <span>/</span>

          <span>Academic</span>
        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Academic Overview
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          View your current academic information, subjects,
          section, and learning relationships.
        </p>
      </div>

      {/* Academic Summary */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {academicInfo.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.label}
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {item.value}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.description}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                  <Icon size={20} />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Enrollment Information */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
            <Layers3 size={21} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Current Enrollment
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Your current academic enrollment connects you to
              Grade 10, Section 10-A, your assigned subjects, and
              the teachers responsible for those subjects.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Academic Year
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              2026/27
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Grade & Section
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              Grade 10 - 10-A
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Enrollment Status
            </p>

            <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              Active
            </span>
          </div>
        </div>
      </section>

      {/* Academic Relationship */}
      <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
            <BookOpen size={19} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Your academic structure
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Student academic information will later be loaded
              directly from the backend enrollment, grade, section,
              subject, and teacher relationships.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentAcademic;

