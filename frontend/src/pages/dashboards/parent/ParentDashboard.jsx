import {
  Users,
  GraduationCap,
  CalendarCheck,
  ClipboardCheck,
  BookOpen,
  Bell,
  Clock3,
  ArrowUpRight,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
import { Link } from "react-router-dom";

const children = [
  {
    id: "STU-001",
    name: "Abebe Kebede",
    username: "GGSS.STU0001",
    grade: "Grade 12",
    section: "Section A",
    attendance: 94,
    average: 86,
    status: "Good standing",
  },
  {
    id: "STU-002",
    name: "Sara Kebede",
    username: "GGSS.STU0002",
    grade: "Grade 9",
    section: "Section B",
    attendance: 97,
    average: 91,
    status: "Good standing",
  },
];

const upcomingExaminations = [
  {
    id: 1,
    title: "Mathematics Mid Examination",
    child: "Abebe Kebede",
    date: "Oct 15, 2026",
    time: "9:00 AM",
  },
  {
    id: 2,
    title: "English Unit Examination",
    child: "Sara Kebede",
    date: "Oct 17, 2026",
    time: "10:00 AM",
  },
];

const announcements = [
  {
    id: 1,
    title: "Parent-School Meeting",
    description:
      "Parents are invited to attend the upcoming academic progress meeting.",
    date: "Oct 10, 2026",
    type: "School Notice",
  },
  {
    id: 2,
    title: "Examination Preparation",
    description:
      "Students should follow their revision schedules and prepare for upcoming examinations.",
    date: "Oct 9, 2026",
    type: "Academic",
  },
];

const summaryCards = [
  {
    label: "Linked Children",
    value: "2",
    note: "Children connected to your account",
    icon: Users,
    color: "bg-blue-50 text-blue-700",
  },
  {
    label: "Average Performance",
    value: "88.5%",
    note: "Average across your children",
    icon: GraduationCap,
    color: "bg-violet-50 text-violet-700",
  },
  {
    label: "Average Attendance",
    value: "95.5%",
    note: "Combined attendance overview",
    icon: CalendarCheck,
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Upcoming Exams",
    value: "2",
    note: "Scheduled examinations",
    icon: ClipboardCheck,
    color: "bg-amber-50 text-amber-700",
  },
];

const ParentDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-700">
            Parent Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Parent Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor your children's academic progress, attendance,
            and important school updates.
          </p>
        </div>

        <Link
          to="/parent-dashboard/children"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
        >
          <Users size={17} />
          View My Children
        </Link>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.label}
                  </p>

                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    {card.value}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.color}`}
                >
                  <Icon size={21} />
                </div>
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                {card.note}
              </p>
            </div>
          );
        })}
      </section>

      {/* Children Overview */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              My Children
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              A quick overview of your linked students.
            </p>
          </div>

          <Link
            to="/parent-dashboard/children"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-800 hover:text-blue-950"
          >
            View all
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          {children.map((child) => (
            <article
              key={child.id}
              className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-200"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-base font-bold text-blue-900">
                  {child.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-slate-900">
                    {child.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {child.username}
                  </p>

                  <p className="mt-2 text-sm text-slate-600">
                    {child.grade} · {child.section}
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  Active
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Academic average
                  </p>

                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {child.average}%
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Attendance
                  </p>

                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {child.attendance}%
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-700">
                  {child.status}
                </span>

                <Link
                  to="/parent-dashboard/academic"
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-800 hover:text-blue-950"
                >
                  Academic details
                  <ChevronRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Upcoming Exams and Announcements */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Upcoming Examinations */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Upcoming Examinations
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Keep track of your children's exams.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
              <CalendarDays size={20} />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {upcomingExaminations.map((exam) => (
              <div
                key={exam.id}
                className="flex gap-3 px-5 py-4 sm:px-6"
              >
                <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                  <Clock3 size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {exam.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Student: {exam.child}
                  </p>

                  <p className="mt-2 text-xs font-medium text-slate-600">
                    {exam.date} · {exam.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
            <Link
              to="/parent-dashboard/examinations"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-800 hover:text-blue-950"
            >
              View examination results
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Announcements */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                School Announcements
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Important notices from the school.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
              <Bell size={20} />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {announcements.map((announcement) => (
              <article
                key={announcement.id}
                className="px-5 py-4 sm:px-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {announcement.title}
                  </h3>

                  <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {announcement.type}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {announcement.description}
                </p>

                <p className="mt-3 text-xs text-slate-400">
                  {announcement.date}
                </p>
              </article>
            ))}
          </div>

          <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
            <Link
              to="/parent-dashboard/announcements"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-800 hover:text-blue-950"
            >
              View all announcements
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Academic Reminder */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-800">
            <BookOpen size={20} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-blue-950">
              Stay involved in your children's education
            </h2>

            <p className="mt-1 text-sm leading-6 text-blue-900/80">
              Regularly review attendance, assignments, and examination
              results. Contact the school when you need clarification
              about your child's academic progress.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParentDashboard;