import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FilePlus2,
  FileText,
  GraduationCap,
  Upload,
  UsersRound,
} from "lucide-react";

const stats = [
  {
    label: "Assigned Subjects",
    value: "4",
    description: "Across 2 grade levels",
    icon: BookOpen,
  },
  {
    label: "Total Students",
    value: "128",
    description: "Across your classes",
    icon: UsersRound,
  },
  {
    label: "Pending Submissions",
    value: "18",
    description: "Need your review",
    icon: ClipboardCheck,
  },
  {
    label: "Upcoming Exams",
    value: "3",
    description: "Scheduled this month",
    icon: FileText,
  },
];

const todayClasses = [
  {
    subject: "Mathematics",
    grade: "Grade 10",
    section: "Section A",
    time: "8:00 AM - 9:00 AM",
    room: "Room 12",
    status: "Completed",
  },
  {
    subject: "Mathematics",
    grade: "Grade 10",
    section: "Section B",
    time: "10:00 AM - 11:00 AM",
    room: "Room 14",
    status: "Upcoming",
  },
  {
    subject: "Physics",
    grade: "Grade 11",
    section: "Section A",
    time: "1:30 PM - 2:30 PM",
    room: "Lab 2",
    status: "Upcoming",
  },
];

const recentSubmissions = [
  {
    student: "Hana Bekele",
    assignment: "Quadratic Equations",
    subject: "Mathematics",
    submitted: "10 minutes ago",
    status: "Pending",
  },
  {
    student: "Dawit Alemu",
    assignment: "Newton's Laws",
    subject: "Physics",
    submitted: "35 minutes ago",
    status: "Pending",
  },
  {
    student: "Mekdes Tadesse",
    assignment: "Algebra Practice",
    subject: "Mathematics",
    submitted: "1 hour ago",
    status: "Pending",
  },
  {
    student: "Samuel Girma",
    assignment: "Motion and Force",
    subject: "Physics",
    submitted: "2 hours ago",
    status: "Reviewed",
  },
];

const upcomingExams = [
  {
    title: "Mathematics Mid-Term Examination",
    grade: "Grade 10",
    date: "Sep 12, 2026",
    time: "9:00 AM",
  },
  {
    title: "Physics Unit Examination",
    grade: "Grade 11",
    date: "Sep 16, 2026",
    time: "10:00 AM",
  },
  {
    title: "Mathematics Final Assessment",
    grade: "Grade 11",
    date: "Sep 24, 2026",
    time: "9:00 AM",
  },
];

const quickActions = [
  {
    label: "Create Assignment",
    description: "Give students new work",
    icon: FilePlus2,
  },
  {
    label: "Upload Material",
    description: "Share learning resources",
    icon: Upload,
  },
  {
    label: "Create Examination",
    description: "Prepare a new assessment",
    icon: FileText,
  },
  {
    label: "View Submissions",
    description: "Review student work",
    icon: ClipboardCheck,
  },
];

const TeacherDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Teacher Portal
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Good morning, Teacher
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
              Here is an overview of your classes, student activity,
              and upcoming responsibilities.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays size={17} />
            <span>September 3, 2026</span>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* Main Grid */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Today's Classes */}
        <section className="xl:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">
                Today's Classes
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your teaching schedule for today
              </p>
            </div>

            <CalendarDays
              size={19}
              className="text-slate-400"
            />
          </div>

          <div className="divide-y divide-slate-100">
            {todayClasses.map((item) => (
              <div
                key={`${item.subject}-${item.section}`}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <BookOpen size={17} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-800">
                      {item.subject}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {item.grade} · {item.section} · {item.room}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-5 sm:justify-end">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock3 size={14} />
                    {item.time}
                  </div>

                  {item.status === "Completed" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      <CheckCircle2 size={13} />
                      Completed
                    </span>
                  ) : (
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                      Upcoming
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Common teaching tasks
            </p>
          </div>

          <div className="space-y-2 p-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.label}
                  type="button"
                  className="group flex w-full items-center gap-3 rounded-lg p-3 text-left transition hover:bg-slate-50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-blue-50 group-hover:text-blue-600">
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      {action.label}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {action.description}
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500"
                  />
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Recent Submissions */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">
                Recent Submissions
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Student work waiting for review
              </p>
            </div>

            <ClipboardCheck
              size={19}
              className="text-slate-400"
            />
          </div>

          <div className="divide-y divide-slate-100">
            {recentSubmissions.map((submission) => (
              <div
                key={`${submission.student}-${submission.assignment}`}
                className="flex items-center gap-3 px-5 py-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                  {submission.student.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {submission.student}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {submission.assignment} · {submission.subject}
                  </p>
                </div>

                <div className="hidden text-right sm:block">
                  <p className="text-xs text-slate-500">
                    {submission.submitted}
                  </p>

                  <span
                    className={`mt-1 inline-block text-xs font-medium ${
                      submission.status === "Reviewed"
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-4">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              View all submissions
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

        {/* Upcoming Examinations */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">
                Upcoming Examinations
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your next scheduled assessments
              </p>
            </div>

            <GraduationCap
              size={19}
              className="text-slate-400"
            />
          </div>

          <div className="divide-y divide-slate-100">
            {upcomingExams.map((exam) => (
              <div
                key={exam.title}
                className="flex items-center gap-4 px-5 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <CalendarDays size={15} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {exam.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {exam.grade} · {exam.time}
                  </p>
                </div>

                <p className="shrink-0 text-xs font-medium text-slate-600">
                  {exam.date}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-4">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              Manage examinations
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherDashboard;