import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Filter,
  Percent,
  Search,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

const attendanceRecords = [
  {
    id: 1,
    date: "September 2, 2026",
    day: "Wednesday",
    subject: "Mathematics",
    status: "Present",
    remark: "On time",
  },
  {
    id: 2,
    date: "September 1, 2026",
    day: "Tuesday",
    subject: "English",
    status: "Present",
    remark: "On time",
  },
  {
    id: 3,
    date: "August 31, 2026",
    day: "Monday",
    subject: "Biology",
    status: "Late",
    remark: "Arrived 10 minutes late",
  },
  {
    id: 4,
    date: "August 29, 2026",
    day: "Saturday",
    subject: "Physics",
    status: "Present",
    remark: "On time",
  },
  {
    id: 5,
    date: "August 28, 2026",
    day: "Friday",
    subject: "Chemistry",
    status: "Absent",
    remark: "No explanation provided",
  },
  {
    id: 6,
    date: "August 27, 2026",
    day: "Thursday",
    subject: "Mathematics",
    status: "Present",
    remark: "On time",
  },
  {
    id: 7,
    date: "August 26, 2026",
    day: "Wednesday",
    subject: "English",
    status: "Excused",
    remark: "Approved absence",
  },
  {
    id: 8,
    date: "August 25, 2026",
    day: "Tuesday",
    subject: "Biology",
    status: "Present",
    remark: "On time",
  },
  {
    id: 9,
    date: "August 24, 2026",
    day: "Monday",
    subject: "Physics",
    status: "Present",
    remark: "On time",
  },
  {
    id: 10,
    date: "August 22, 2026",
    day: "Saturday",
    subject: "Chemistry",
    status: "Present",
    remark: "On time",
  },
];

const attendanceSummary = {
  total: 120,
  present: 110,
  absent: 6,
  late: 3,
  excused: 1,
};

const monthlyAttendance = [
  { month: "May", percentage: 94 },
  { month: "June", percentage: 91 },
  { month: "July", percentage: 96 },
  { month: "August", percentage: 89 },
  { month: "September", percentage: 100 },
];

const statusStyles = {
  Present: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    icon: CheckCircle2,
    iconClass: "text-emerald-600",
  },
  Absent: {
    badge: "bg-red-50 text-red-700 ring-red-200",
    icon: XCircle,
    iconClass: "text-red-600",
  },
  Late: {
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    icon: Clock3,
    iconClass: "text-amber-600",
  },
  Excused: {
    badge: "bg-blue-50 text-blue-700 ring-blue-200",
    icon: FileCheck2,
    iconClass: "text-blue-600",
  },
};

const StudentAttendance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const subjects = useMemo(() => {
    return ["All", ...new Set(attendanceRecords.map((record) => record.subject))];
  }, []);

  const filteredRecords = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    return attendanceRecords.filter((record) => {
      const matchesSearch =
        !normalizedSearch ||
        record.subject.toLowerCase().includes(normalizedSearch) ||
        record.date.toLowerCase().includes(normalizedSearch) ||
        record.remark.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" || record.status === statusFilter;

      const matchesSubject =
        subjectFilter === "All" || record.subject === subjectFilter;

      return matchesSearch && matchesStatus && matchesSubject;
    });
  }, [searchTerm, statusFilter, subjectFilter]);

  const attendancePercentage = Math.round(
    (attendanceSummary.present / attendanceSummary.total) * 100
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays className="h-4 w-4" />
            <span>Student Attendance</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Attendance
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500 sm:text-base">
            Monitor your attendance records, attendance rate, and recent
            attendance activity.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <Percent className="h-5 w-5 text-blue-600" />

          <div>
            <p className="text-xs font-medium text-slate-500">
              Overall Attendance
            </p>
            <p className="text-lg font-bold text-slate-900">
              {attendancePercentage}%
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Present"
          value={attendanceSummary.present}
          description="Days attended"
          icon={CheckCircle2}
          iconClass="text-emerald-600"
          iconBackground="bg-emerald-50"
        />

        <SummaryCard
          title="Absent"
          value={attendanceSummary.absent}
          description="Days absent"
          icon={XCircle}
          iconClass="text-red-600"
          iconBackground="bg-red-50"
        />

        <SummaryCard
          title="Late"
          value={attendanceSummary.late}
          description="Late arrivals"
          icon={Clock3}
          iconClass="text-amber-600"
          iconBackground="bg-amber-50"
        />

        <SummaryCard
          title="Excused"
          value={attendanceSummary.excused}
          description="Approved absences"
          icon={FileCheck2}
          iconClass="text-blue-600"
          iconBackground="bg-blue-50"
        />
      </div>

      {/* Attendance Rate */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Attendance Rate
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your overall attendance performance for the academic period.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-3xl font-bold text-slate-900">
              {attendancePercentage}%
            </p>
            <p className="text-xs text-slate-500">
              {attendanceSummary.present} of {attendanceSummary.total} days
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>0%</span>
            <span>Minimum recommended: 75%</span>
            <span>100%</span>
          </div>
        </div>
      </section>

      {/* Monthly Overview */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Monthly Overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Attendance percentage by month.
          </p>
        </div>

        <div className="mt-6 space-y-5">
          {monthlyAttendance.map((item) => (
            <div key={item.month}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  {item.month}
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {item.percentage}%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Attendance Records */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Attendance Records
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review your recent attendance activity.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Filter className="h-4 w-4" />
              <span>{filteredRecords.length} records</span>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="relative md:col-span-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search attendance..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <select
              value={subjectFilter}
              onChange={(event) => setSubjectFilter(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject === "All" ? "All Subjects" : subject}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Statuses</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              <option value="Excused">Excused</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Remark
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((record) => (
                <AttendanceRow key={record.id} record={record} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-slate-200 md:hidden">
          {filteredRecords.map((record) => (
            <AttendanceMobileCard key={record.id} record={record} />
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <div className="px-6 py-12 text-center">
            <Search className="mx-auto h-8 w-8 text-slate-300" />

            <h3 className="mt-3 text-sm font-semibold text-slate-900">
              No attendance records found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filter options.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

const SummaryCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
  iconBackground,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>

          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>

        <div className={`rounded-xl p-3 ${iconBackground}`}>
          <Icon className={`h-5 w-5 ${iconClass}`} />
        </div>
      </div>
    </div>
  );
};

const AttendanceRow = ({ record }) => {
  const style = statusStyles[record.status];
  const StatusIcon = style.icon;

  return (
    <tr className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70">
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-slate-900">{record.date}</p>
          <p className="mt-0.5 text-xs text-slate-500">{record.day}</p>
        </div>
      </td>

      <td className="px-6 py-4 text-sm font-medium text-slate-700">
        {record.subject}
      </td>

      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${style.badge}`}
        >
          <StatusIcon className={`h-3.5 w-3.5 ${style.iconClass}`} />
          {record.status}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-slate-500">{record.remark}</td>
    </tr>
  );
};

const AttendanceMobileCard = ({ record }) => {
  const style = statusStyles[record.status];
  const StatusIcon = style.icon;

  return (
    <div className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {record.subject}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {record.date} · {record.day}
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${style.badge}`}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          {record.status}
        </span>
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2.5">
        <p className="text-xs font-medium text-slate-500">Remark</p>
        <p className="mt-1 text-sm text-slate-700">{record.remark}</p>
      </div>
    </div>
  );
};

export default StudentAttendance;

