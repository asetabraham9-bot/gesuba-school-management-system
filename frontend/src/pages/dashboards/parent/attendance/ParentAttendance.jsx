import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Filter,
  GraduationCap,
  Search,
  ShieldAlert,
  //UserRound,
  Users,
  XCircle,
} from "lucide-react";

const attendanceData = {
  "GGSS.STU0001": {
    name: "Abebe Kebede",
    studentId: "GGSS.STU0001",
    grade: "Grade 12",
    section: "Section A",
    summary: {
      total: 180,
      present: 169,
      absent: 5,
      late: 4,
      excused: 2,
    },
    records: [
      { date: "2026-10-19", subject: "Mathematics", session: "Morning", status: "Present", note: "On time" },
      { date: "2026-10-16", subject: "Physics", session: "Morning", status: "Late", note: "Arrived after the bell" },
      { date: "2026-10-15", subject: "Chemistry", session: "Afternoon", status: "Present", note: "On time" },
      { date: "2026-10-14", subject: "English", session: "Morning", status: "Absent", note: "Absence recorded by school" },
      { date: "2026-10-13", subject: "Biology", session: "Afternoon", status: "Present", note: "On time" },
      { date: "2026-10-12", subject: "Mathematics", session: "Morning", status: "Present", note: "On time" },
      { date: "2026-10-09", subject: "Physics", session: "Morning", status: "Present", note: "On time" },
      { date: "2026-10-08", subject: "Chemistry", session: "Afternoon", status: "Excused", note: "Approved absence" },
      { date: "2026-10-07", subject: "English", session: "Morning", status: "Present", note: "On time" },
      { date: "2026-10-06", subject: "Biology", session: "Afternoon", status: "Late", note: "Arrived after the bell" },
      { date: "2026-10-05", subject: "Mathematics", session: "Morning", status: "Present", note: "On time" },
      { date: "2026-10-02", subject: "Physics", session: "Morning", status: "Present", note: "On time" },
      { date: "2026-10-01", subject: "Chemistry", session: "Afternoon", status: "Absent", note: "Absence recorded by school" },
      { date: "2026-09-30", subject: "English", session: "Morning", status: "Present", note: "On time" },
      { date: "2026-09-29", subject: "Biology", session: "Afternoon", status: "Present", note: "On time" },
    ],
  },

  "GGSS.STU0002": {
    name: "Sara Kebede",
    studentId: "GGSS.STU0002",
    grade: "Grade 9",
    section: "Section B",
    summary: {
      total: 180,
      present: 175,
      absent: 2,
      late: 2,
      excused: 1,
    },
    records: [
      { date: "2026-10-19", subject: "Mathematics", session: "Morning", status: "Present", note: "On time" },
      { date: "2026-10-16", subject: "English", session: "Morning", status: "Present", note: "On time" },
      { date: "2026-10-15", subject: "Biology", session: "Afternoon", status: "Present", note: "On time" },
      { date: "2026-10-14", subject: "Physics", session: "Morning", status: "Late", note: "Arrived after the bell" },
      { date: "2026-10-13", subject: "Chemistry", session: "Afternoon", status: "Present", note: "On time" },
      { date: "2026-10-12", subject: "Mathematics", session: "Morning", status: "Present", note: "On time" },
      { date: "2026-10-09", subject: "English", session: "Morning", status: "Present", note: "On time" },
      { date: "2026-10-08", subject: "Biology", session: "Afternoon", status: "Present", note: "On time" },
      { date: "2026-10-07", subject: "Physics", session: "Morning", status: "Excused", note: "Approved absence" },
      { date: "2026-10-06", subject: "Chemistry", session: "Afternoon", status: "Present", note: "On time" },
      { date: "2026-10-05", subject: "Mathematics", session: "Morning", status: "Late", note: "Arrived after the bell" },
      { date: "2026-10-02", subject: "English", session: "Morning", status: "Present", note: "On time" },
      { date: "2026-10-01", subject: "Biology", session: "Afternoon", status: "Absent", note: "Absence recorded by school" },
      { date: "2026-09-30", subject: "Physics", session: "Morning", status: "Present", note: "On time" },
      { date: "2026-09-29", subject: "Chemistry", session: "Afternoon", status: "Present", note: "On time" },
    ],
  },
};

const statusStyles = {
  Present: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Absent: "bg-rose-50 text-rose-700 ring-rose-200",
  Late: "bg-amber-50 text-amber-800 ring-amber-200",
  Excused: "bg-blue-50 text-blue-700 ring-blue-200",
};

const statusIcons = {
  Present: CheckCircle2,
  Absent: XCircle,
  Late: Clock3,
  Excused: CalendarCheck,
};

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function SummaryCard({ title, value, detail, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
          <p className="mt-2 text-xs text-slate-500">{detail}</p>
        </div>
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const Icon = statusIcons[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

export default function ParentAttendance() {
  const childIds = Object.keys(attendanceData);

  const [selectedChildId, setSelectedChildId] = useState(childIds[0]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("30");
  const [searchTerm, setSearchTerm] = useState("");

  const child = attendanceData[selectedChildId];
  const summary = child.summary;

  const attendanceRate = Math.round(
    (summary.present / summary.total) * 100
  );

  const previousRate = selectedChildId === "GGSS.STU0001" ? 92 : 95;
  const rateDifference = attendanceRate - previousRate;

  const filteredRecords = useMemo(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const cutoff = new Date(today);

    if (dateFilter === "7") {
      cutoff.setDate(cutoff.getDate() - 7);
    } else if (dateFilter === "30") {
      cutoff.setDate(cutoff.getDate() - 30);
    } else {
      cutoff.setFullYear(2000);
    }

    return child.records.filter((record) => {
      const recordDate = new Date(`${record.date}T00:00:00`);

      const matchesStatus =
        statusFilter === "All" || record.status === statusFilter;

      const matchesDate =
        recordDate >= cutoff && recordDate <= today;

      const searchableText =
        `${record.subject} ${record.session} ${record.status} ${record.note}`.toLowerCase();

      const matchesSearch = searchableText.includes(
        searchTerm.trim().toLowerCase()
      );

      return matchesStatus && matchesDate && matchesSearch;
    });
  }, [child, statusFilter, dateFilter, searchTerm]);

  const recentAbsences = child.records.filter(
    (record) => record.status === "Absent"
  );

  const recentLateArrivals = child.records.filter(
    (record) => record.status === "Late"
  );

  const clearFilters = () => {
    setStatusFilter("All");
    setDateFilter("30");
    setSearchTerm("");
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page heading */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-700">
            <CalendarCheck size={18} />
            Parent Portal
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Attendance
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Monitor attendance, review absences, and keep track of your
            child&apos;s school participation.
          </p>
        </div>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-slate-600">Select child</span>
          <select
            value={selectedChildId}
            onChange={(event) => setSelectedChildId(event.target.value)}
            className="min-w-56 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {childIds.map((id) => (
              <option key={id} value={id}>
                {attendanceData[id].name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Child overview */}
      <div className="flex flex-col gap-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white p-3 text-blue-700 shadow-sm">
            <GraduationCap size={25} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">{child.name}</h2>
            <p className="mt-1 text-sm text-slate-600">
              {child.studentId} · {child.grade} · {child.section}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
          <CalendarDays size={17} />
          Academic year 2026/2027
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Attendance rate"
          value={`${attendanceRate}%`}
          detail="Based on the term summary"
          icon={CalendarCheck}
          color="bg-blue-50 text-blue-700"
        />

        <SummaryCard
          title="Days present"
          value={summary.present}
          detail={`Out of ${summary.total} recorded school days`}
          icon={CheckCircle2}
          color="bg-emerald-50 text-emerald-700"
        />

        <SummaryCard
          title="Absences"
          value={summary.absent}
          detail="Recorded absent days this term"
          icon={XCircle}
          color="bg-rose-50 text-rose-700"
        />

        <SummaryCard
          title="Late arrivals"
          value={summary.late}
          detail="Recorded late arrivals this term"
          icon={Clock3}
          color="bg-amber-50 text-amber-700"
        />
      </div>

      {/* Attendance rate and alerts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-1">
          <h2 className="font-bold text-slate-900">Attendance overview</h2>
          <p className="mt-1 text-sm text-slate-500">
            Term attendance summary
          </p>

          <div className="mt-6 flex items-center gap-5">
            <div
              className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#10b981 ${attendanceRate}%, #e2e8f0 0)`,
              }}
              role="img"
              aria-label={`Attendance rate ${attendanceRate}%`}
            >
              <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white">
                <span className="text-2xl font-bold text-slate-900">
                  {attendanceRate}%
                </span>
                <span className="text-xs text-slate-500">Present</span>
              </div>
            </div>

            <div className="min-w-0">
              <p className="flex items-center gap-1 text-sm font-semibold text-emerald-700">
                {rateDifference >= 0 ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}
                {rateDifference > 0 ? "+" : ""}
                {rateDifference} percentage points
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Compared with the illustrative previous-period rate.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">
            {[
              {
                label: "Present",
                count: summary.present,
                color: "bg-emerald-500",
              },
              {
                label: "Absent",
                count: summary.absent,
                color: "bg-rose-500",
              },
              {
                label: "Late",
                count: summary.late,
                color: "bg-amber-500",
              },
              {
                label: "Excused",
                count: summary.excused,
                color: "bg-blue-500",
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="font-semibold text-slate-800">
                    {item.count}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{
                      width: `${Math.min(
                        100,
                        (item.count / summary.total) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 xl:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-xl bg-rose-50 p-3 text-rose-700">
                <AlertCircle size={21} />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">
                  Absence overview
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Recent records marked absent in the sample history.
                </p>
              </div>
            </div>

            {recentAbsences.length > 0 ? (
              <div className="space-y-3">
                {recentAbsences.slice(0, 3).map((record) => (
                  <div
                    key={`${record.date}-${record.subject}`}
                    className="flex flex-col gap-2 rounded-xl border border-rose-100 bg-rose-50/60 p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {record.subject}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {formatDate(record.date)} · {record.session}
                      </p>
                    </div>
                    <StatusBadge status="Absent" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No absence records are available.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                <Clock3 size={21} />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">
                  Late arrival overview
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Recent records marked late in the sample history.
                </p>
              </div>
            </div>

            {recentLateArrivals.length > 0 ? (
              <div className="space-y-3">
                {recentLateArrivals.slice(0, 3).map((record) => (
                  <div
                    key={`${record.date}-${record.subject}`}
                    className="flex flex-col gap-2 rounded-xl border border-amber-100 bg-amber-50/60 p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {record.subject}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {formatDate(record.date)} · {record.session}
                      </p>
                    </div>
                    <StatusBadge status="Late" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No late arrival records are available.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Attendance history */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Attendance History
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Search and filter the selected child&apos;s attendance records.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Users size={17} />
              {filteredRecords.length} records found
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            <label className="relative block">
              <span className="sr-only">Search attendance records</span>
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search subject or note..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">
              <Filter size={17} className="shrink-0 text-slate-400" />
              <span className="sr-only">Filter by status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full bg-transparent py-2.5 text-sm text-slate-700 outline-none"
              >
                <option value="All">All statuses</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                <option value="Excused">Excused</option>
              </select>
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">
              <CalendarDays size={17} className="shrink-0 text-slate-400" />
              <span className="sr-only">Filter by date range</span>
              <select
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                className="w-full bg-transparent py-2.5 text-sm text-slate-700 outline-none"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="all">All available dates</option>
              </select>
            </label>
          </div>

          {(statusFilter !== "All" ||
            dateFilter !== "30" ||
            searchTerm !== "") && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-900"
            >
              <XCircle size={15} />
              Clear filters
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Subject</th>
                <th className="px-5 py-3 font-semibold">Session</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Record note</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr
                    key={`${record.date}-${record.subject}`}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800">
                      {formatDate(record.date)}
                    </td>
                    <td className="px-5 py-4 text-slate-700">
                      {record.subject}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {record.session}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={record.status} />
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {record.note}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <Search size={28} className="text-slate-300" />
                      <p className="mt-3 font-semibold text-slate-800">
                        No attendance records found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or filter settings.
                      </p>
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Reset filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Showing {filteredRecords.length} matching records</span>
          <span>Illustrative data for UI development only</span>
        </div>
      </section>

      {/* Footer notice */}
      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <ShieldAlert size={19} className="mt-0.5 shrink-0 text-slate-500" />
        <p className="text-sm leading-6 text-slate-600">
          Attendance records are displayed for monitoring purposes. If a
          record appears incorrect, the parent should contact the school
          administration to request verification.
        </p>
      </div>
    </div>
  );
}