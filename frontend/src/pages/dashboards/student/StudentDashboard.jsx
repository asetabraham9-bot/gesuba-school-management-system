import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

const summaryCards = [
  {
    title: "Current Grade",
    value: "Grade 10",
    description: "Section A",
    icon: GraduationCap,
  },
  {
    title: "My Subjects",
    value: "8",
    description: "Active subjects",
    icon: BookOpen,
  },
  {
    title: "Pending Assignments",
    value: "3",
    description: "Need your attention",
    icon: ClipboardList,
  },
  {
    title: "Average Result",
    value: "87%",
    description: "Current academic average",
    icon: TrendingUp,
  },
];

const recentLessons = [
  {
    subject: "Mathematics",
    title: "Quadratic Equations",
    time: "2 hours ago",
  },
  {
    subject: "Physics",
    title: "Motion and Force",
    time: "Yesterday",
  },
  {
    subject: "English",
    title: "Reading Comprehension",
    time: "Yesterday",
  },
];

const assignments = [
  {
    subject: "Mathematics",
    title: "Quadratic Equations Exercise",
    due: "Sep 04, 2026",
    status: "Pending",
  },
  {
    subject: "Physics",
    title: "Motion and Force Report",
    due: "Sep 06, 2026",
    status: "Pending",
  },
  {
    subject: "English",
    title: "Reading Assignment",
    due: "Sep 08, 2026",
    status: "Submitted",
  },
];

const StudentDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Page heading */}
      <section>
        <p className="text-sm font-semibold text-blue-800">
          Student Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back, Student
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Here is a quick overview of your academic activity,
          learning progress, and assignments.
        </p>
      </section>

      {/* Summary cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                    {card.value}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                {card.description}
              </p>
            </article>
          );
        })}
      </section>

      {/* Main dashboard content */}
      <section className="grid gap-6 xl:grid-cols-3">
        {/* Recent lessons */}
        <article className="rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">
                Recent Lessons
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Continue learning from your recent lessons.
              </p>
            </div>

            <a
              href="/student-dashboard/lessons"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-800 hover:text-blue-900"
            >
              View all
              <ArrowRight size={15} />
            </a>
          </div>

          <div className="divide-y divide-slate-100">
            {recentLessons.map((lesson) => (
              <div
                key={`${lesson.subject}-${lesson.title}`}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <BookOpen size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {lesson.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {lesson.subject}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 text-xs text-slate-400">
                  {lesson.time}
                </span>
              </div>
            ))}
          </div>
        </article>

        {/* Academic snapshot */}
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
              <TrendingUp size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Academic Progress
              </h2>

              <p className="text-xs text-slate-500">
                Current performance
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-slate-900">
                87%
              </span>

              <span className="text-sm font-medium text-emerald-600">
                +4.2%
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-900"
                style={{ width: "87%" }}
              />
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Your current average is based on available academic
              results.
            </p>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <a
              href="/student-dashboard/progress"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-800 hover:text-blue-900"
            >
              View academic progress
              <ArrowRight size={15} />
            </a>
          </div>
        </article>
      </section>

      {/* Assignments */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Assignment Activity
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Keep track of your assignments and submission status.
            </p>
          </div>

          <a
            href="/student-dashboard/assignments"
            className="inline-flex w-fit items-center gap-1 text-sm font-medium text-blue-800 hover:text-blue-900"
          >
            View assignments
            <ArrowRight size={15} />
          </a>
        </div>

        <div className="divide-y divide-slate-100">
          {assignments.map((assignment) => (
            <div
              key={`${assignment.subject}-${assignment.title}`}
              className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  {assignment.status === "Submitted" ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <ClipboardList size={18} />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {assignment.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {assignment.subject}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 sm:shrink-0">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <CalendarDays size={15} />
                  Due {assignment.due}
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    assignment.status === "Submitted"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {assignment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="text-sm font-semibold text-slate-900">
          Quick Access
        </h2>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="/student-dashboard/lessons"
            className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
          >
            <BookOpen
              size={20}
              className="text-blue-900"
            />

            <p className="mt-3 text-sm font-semibold text-slate-900">
              Browse Lessons
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Continue your learning.
            </p>
          </a>

          <a
            href="/student-dashboard/materials"
            className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
          >
            <FileTextIcon />

            <p className="mt-3 text-sm font-semibold text-slate-900">
              Study Materials
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Access your learning resources.
            </p>
          </a>

          <a
            href="/student-dashboard/assignments"
            className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
          >
            <ClipboardList
              size={20}
              className="text-blue-900"
            />

            <p className="mt-3 text-sm font-semibold text-slate-900">
              Assignments
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Review pending assignments.
            </p>
          </a>

          <a
            href="/student-dashboard/results"
            className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
          >
            <TrendingUp
              size={20}
              className="text-blue-900"
            />

            <p className="mt-3 text-sm font-semibold text-slate-900">
              View Results
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Check your academic performance.
            </p>
          </a>
        </div>
      </section>
    </div>
  );
};

const FileTextIcon = () => {
  return (
    <div className="flex h-5 w-5 items-center justify-center text-blue-900">
      <span className="text-sm font-semibold">M</span>
    </div>
  );
};

export default StudentDashboard;

