
import {
  Users,
  GraduationCap,
  School,
  CalendarCheck,
  //ClipboardList,
  Megaphone,
  ArrowUpRight,
  Clock,
  BookOpen,
} from "lucide-react";

const summaryCards = [
  {
    title: "Total Students",
    value: "1,248",
    description: "Across all grades",
    icon: Users,
  },
  {
    title: "Total Teachers",
    value: "48",
    description: "Registered teaching staff",
    icon: GraduationCap,
  },
  {
    title: "Grades & Sections",
    value: "12 / 24",
    description: "Grades and active sections",
    icon: School,
  },
  {
    title: "Attendance Rate",
    value: "94.6%",
    description: "Illustrative daily average",
    icon: CalendarCheck,
  },
];

const upcomingEvents = [
  {
    title: "Grade 12 Mathematics Examination",
    date: "Oct 25, 2026",
    type: "Examination",
  },
  {
    title: "Grade 9 English Unit Examination",
    date: "Oct 27, 2026",
    type: "Examination",
  },
  {
    title: "Midterm Academic Review",
    date: "Oct 30, 2026",
    type: "Academic",
  },
];

const recentActivities = [
  {
    title: "New student record created",
    description: "Grade 9, Section B",
    time: "Today",
  },
  {
    title: "Teacher assignment updated",
    description: "Grade 12 Mathematics",
    time: "Today",
  },
  {
    title: "School announcement published",
    description: "Upcoming examination schedule",
    time: "Yesterday",
  },
];

const announcements = [
  {
    title: "Upcoming Examination Schedule",
    audience: "Students and teachers",
    date: "Oct 20, 2026",
  },
  {
    title: "Academic Progress Review",
    audience: "Teaching staff",
    date: "Oct 19, 2026",
  },
];

const SchoolAdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            School Administration
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            School Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor school operations, academic activities, and important updates.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
          <p className="text-xs text-slate-500">Academic Year</p>
          <p className="mt-1 text-sm font-semibold text-slate-800">
            2026 / 2027
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>
                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    {card.value}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                  <Icon size={21} />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                {card.description}
              </p>
            </article>
          );
        })}
      </section>

      {/* Main dashboard content */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent activity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 xl:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Recent School Activity
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                A snapshot of recent administrative activity.
              </p>
            </div>

            <Clock size={20} className="text-slate-400" />
          </div>

          <div className="mt-5 divide-y divide-slate-100">
            {recentActivities.map((activity) => (
              <div
                key={activity.title}
                className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
                    <ArrowUpRight size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {activity.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {activity.description}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 text-xs text-slate-400">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming events */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <CalendarCheck size={20} className="text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Upcoming Events
            </h2>
          </div>

          <div className="mt-5 space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="rounded-xl border border-slate-100 p-3"
              >
                <p className="text-sm font-medium text-slate-800">
                  {event.title}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  {event.date}
                </p>
                <span className="mt-2 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements and quick overview */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <Megaphone size={20} className="text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Announcements
            </h2>
          </div>

          <div className="mt-4 space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.title}
                className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
              >
                <p className="text-sm font-medium text-slate-800">
                  {announcement.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {announcement.audience} · {announcement.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Academic Oversight
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Examinations</p>
              <p className="mt-2 text-xl font-bold text-slate-900">3</p>
              <p className="mt-1 text-xs text-slate-500">
                Upcoming in this sample
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Recent Announcements</p>
              <p className="mt-2 text-xl font-bold text-slate-900">2</p>
              <p className="mt-1 text-xs text-slate-500">
                Displayed in this sample
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            This overview is for administrative monitoring. Examination marks
            remain under the responsibility of authorized teachers.
          </p>
        </div>
      </section>

      <p className="text-xs text-slate-400">
        Demonstration data only. Statistics and activities are not connected to
        the database.
      </p>
    </div>
  );
};

export default SchoolAdminDashboard;
