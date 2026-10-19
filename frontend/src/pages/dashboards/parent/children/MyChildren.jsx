import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Search,
  GraduationCap,
  CalendarCheck,
  BookOpen,
  ClipboardList,
  ChevronRight,
  MapPin,
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  CheckCircle2,
  ArrowUpRight,
  School,
} from "lucide-react";

const mockChildren = [
  {
    id: "STU-001",
    studentId: "GGSS.STU0001",
    fullName: "Abebe Kebede",
    grade: "Grade 12",
    section: "Section A",
    gender: "Male",
    dateOfBirth: "2008-03-15",
    status: "Active",
    average: 86,
    attendance: 94,
    classTeacher: "Mr. Daniel Tesfaye",
    email: "abebe.kebede@example.com",
    phone: "+251 91 234 5678",
    address: "Wolaita Sodo, Ethiopia",
    enrollmentDate: "September 2022",
    subjects: [
      { name: "Mathematics", mark: 90 },
      { name: "Physics", mark: 84 },
      { name: "Chemistry", mark: 82 },
      { name: "English", mark: 88 },
    ],
    nextExam: "Mathematics Mid Examination",
    nextExamDate: "October 25, 2026",
  },
  {
    id: "STU-002",
    studentId: "GGSS.STU0002",
    fullName: "Sara Kebede",
    grade: "Grade 9",
    section: "Section B",
    gender: "Female",
    dateOfBirth: "2011-07-22",
    status: "Active",
    average: 91,
    attendance: 97,
    classTeacher: "Mrs. Hana Bekele",
    email: "sara.kebede@example.com",
    phone: "+251 91 234 5679",
    address: "Wolaita Sodo, Ethiopia",
    enrollmentDate: "September 2025",
    subjects: [
      { name: "Mathematics", mark: 93 },
      { name: "English", mark: 90 },
      { name: "Biology", mark: 89 },
      { name: "Physics", mark: 92 },
    ],
    nextExam: "English Unit Examination",
    nextExamDate: "October 27, 2026",
  },
];

const formatDate = (dateString) => {
  if (!dateString) return "Not available";

  return new Date(`${dateString}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
};

const MyChildren = () => {
  const [children] = useState(mockChildren);
  const [selectedChildId, setSelectedChildId] = useState(
    mockChildren[0]?.id ?? ""
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChildren = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return children;

    return children.filter((child) =>
      [
        child.fullName,
        child.studentId,
        child.grade,
        child.section,
      ].some((value) => value.toLowerCase().includes(query))
    );
  }, [children, searchTerm]);

  const selectedChild =
    children.find((child) => child.id === selectedChildId) ?? null;

  const summary = useMemo(() => {
    const total = children.length;

    return {
      total,
      active: children.filter((child) => child.status === "Active")
        .length,
      average:
        total > 0
          ? (
              children.reduce((sum, child) => sum + child.average, 0) /
              total
            ).toFixed(1)
          : "0.0",
      attendance:
        total > 0
          ? (
              children.reduce(
                (sum, child) => sum + child.attendance,
                0
              ) / total
            ).toFixed(1)
          : "0.0",
    };
  }, [children]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChild = (childId) => {
    setSelectedChildId(childId);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-700">
            Parent Portal
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            My Children
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            View your children's school information, academic
            performance, and attendance.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <Users size={17} />
          {summary.total} Linked {summary.total === 1 ? "Child" : "Children"}
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Linked Children"
          value={summary.total}
          note="Students connected to your account"
          icon={Users}
          iconClass="bg-blue-50 text-blue-700"
        />

        <SummaryCard
          label="Active Students"
          value={summary.active}
          note="Currently enrolled"
          icon={CheckCircle2}
          iconClass="bg-emerald-50 text-emerald-700"
        />

        <SummaryCard
          label="Average Performance"
          value={`${summary.average}%`}
          note="Across all linked children"
          icon={GraduationCap}
          iconClass="bg-violet-50 text-violet-700"
        />

        <SummaryCard
          label="Average Attendance"
          value={`${summary.attendance}%`}
          note="Combined attendance overview"
          icon={CalendarCheck}
          iconClass="bg-amber-50 text-amber-700"
        />
      </section>

      {/* Children and Selected Profile */}
      <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        {/* Children List */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-base font-semibold text-slate-900">
              Linked Students
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select a child to view their information.
            </p>

            <div className="relative mt-4">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search name, ID, or class..."
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                aria-label="Search linked children"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredChildren.length > 0 ? (
              filteredChildren.map((child) => {
                const isSelected = child.id === selectedChildId;

                return (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => handleSelectChild(child.id)}
                    aria-pressed={isSelected}
                    className={`flex w-full items-start gap-3 p-4 text-left transition ${
                      isSelected
                        ? "bg-blue-50"
                        : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        isSelected
                          ? "bg-blue-900 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {child.fullName
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {child.fullName}
                        </p>

                        {isSelected && (
                          <CheckCircle2
                            size={17}
                            className="shrink-0 text-blue-700"
                          />
                        )}
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {child.studentId}
                      </p>

                      <p className="mt-2 text-sm text-slate-600">
                        {child.grade} · {child.section}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-3 text-xs">
                        <span className="text-slate-600">
                          Average:{" "}
                          <strong className="text-slate-800">
                            {child.average}%
                          </strong>
                        </span>

                        <span className="text-slate-600">
                          Attendance:{" "}
                          <strong className="text-slate-800">
                            {child.attendance}%
                          </strong>
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="px-5 py-10 text-center">
                <Search
                  size={24}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-medium text-slate-700">
                  No children found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Try another name, student ID, or class.
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs leading-5 text-slate-500">
              Student records shown here are sample data for the
              current UI development phase.
            </p>
          </div>
        </div>

        {/* Selected Child Details */}
        <div className="min-w-0 space-y-6">
          {selectedChild ? (
            <>
              {/* Profile Card */}
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="h-24 bg-slate-900 sm:h-28" />

                <div className="px-5 pb-5 sm:px-6">
                  <div className="-mt-10 flex flex-col gap-4 sm:-mt-11 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-end gap-3">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-xl font-bold text-blue-900 sm:h-22 sm:w-22">
                        {selectedChild.fullName
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div className="min-w-0 pb-1">
                        <h2 className="text-lg font-bold text-slate-900">
                          {selectedChild.fullName}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          {selectedChild.studentId}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {selectedChild.status}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2 lg:grid-cols-3">
                    <InfoItem
                      icon={GraduationCap}
                      label="Grade"
                      value={selectedChild.grade}
                    />

                    <InfoItem
                      icon={School}
                      label="Section"
                      value={selectedChild.section}
                    />

                    <InfoItem
                      icon={UserRound}
                      label="Gender"
                      value={selectedChild.gender}
                    />

                    <InfoItem
                      icon={CalendarDays}
                      label="Date of Birth"
                      value={formatDate(selectedChild.dateOfBirth)}
                    />

                    <InfoItem
                      icon={BookOpen}
                      label="Class Teacher"
                      value={selectedChild.classTeacher}
                    />

                    <InfoItem
                      icon={CalendarCheck}
                      label="Enrollment"
                      value={selectedChild.enrollmentDate}
                    />
                  </div>
                </div>
              </section>

              {/* Academic Overview */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      Academic Overview
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      A quick summary of {selectedChild.fullName}'s progress.
                    </p>
                  </div>

                  <Link
                    to="/parent-dashboard/academic"
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-800 hover:text-blue-950"
                  >
                    View details
                    <ArrowUpRight size={16} />
                  </Link>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <MetricCard
                    label="Academic Average"
                    value={`${selectedChild.average}%`}
                    description="Current overall average"
                    percentage={selectedChild.average}
                    barClass="bg-blue-700"
                  />

                  <MetricCard
                    label="Attendance Rate"
                    value={`${selectedChild.attendance}%`}
                    description="Recorded attendance"
                    percentage={selectedChild.attendance}
                    barClass="bg-emerald-600"
                  />
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Subject Performance
                  </h3>

                  <div className="mt-3 space-y-4">
                    {selectedChild.subjects.map((subject) => (
                      <div key={subject.name}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="text-sm text-slate-600">
                            {subject.name}
                          </span>

                          <span className="text-sm font-semibold text-slate-800">
                            {subject.mark}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-700 transition-all"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(0, subject.mark)
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Next Examination */}
              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700">
                    <CalendarDays size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                      Upcoming Examination
                    </p>

                    <h3 className="mt-2 text-sm font-semibold text-slate-900">
                      {selectedChild.nextExam}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      Scheduled for {selectedChild.nextExamDate}
                    </p>

                    <Link
                      to="/parent-dashboard/examinations"
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-amber-900 hover:text-amber-950"
                    >
                      View examination information
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </section>

              {/* Contact and Quick Links */}
              <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h2 className="text-base font-semibold text-slate-900">
                    Student Information
                  </h2>

                  <div className="mt-5 space-y-4">
                    <InfoItem
                      icon={Mail}
                      label="Email"
                      value={selectedChild.email}
                    />

                    <InfoItem
                      icon={Phone}
                      label="Phone"
                      value={selectedChild.phone}
                    />

                    <InfoItem
                      icon={MapPin}
                      label="Address"
                      value={selectedChild.address}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h2 className="text-base font-semibold text-slate-900">
                    Quick Access
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Explore your child's school records.
                  </p>

                  <div className="mt-4 space-y-2">
                    <QuickLink
                      to="/parent-dashboard/academic"
                      icon={GraduationCap}
                      label="Academic Progress"
                    />

                    <QuickLink
                      to="/parent-dashboard/attendance"
                      icon={CalendarCheck}
                      label="Attendance Records"
                    />

                    <QuickLink
                      to="/parent-dashboard/assignments"
                      icon={BookOpen}
                      label="Assignments"
                    />

                    <QuickLink
                      to="/parent-dashboard/examinations"
                      icon={ClipboardList}
                      label="Examination Results"
                    />
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <Users
                size={32}
                className="mx-auto text-slate-300"
              />

              <h2 className="mt-4 text-base font-semibold text-slate-900">
                Select a child
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Select a student from the list to view their details.
              </p>

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-sm font-medium text-blue-800 hover:text-blue-950"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const SummaryCard = ({
  label,
  value,
  note,
  icon: Icon,
  iconClass,
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-3 text-2xl font-bold text-slate-900">
          {value}
        </p>
      </div>

      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
      >
        <Icon size={21} />
      </div>
    </div>

    <p className="mt-3 text-xs leading-5 text-slate-500">{note}</p>
  </div>
);

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex min-w-0 items-start gap-3">
    <Icon
      size={17}
      className="mt-0.5 shrink-0 text-slate-400"
    />

    <div className="min-w-0">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-slate-800">
        {value || "Not available"}
      </p>
    </div>
  </div>
);

const MetricCard = ({
  label,
  value,
  description,
  percentage,
  barClass,
}) => (
  <div className="rounded-xl border border-slate-200 p-4">
    <p className="text-sm text-slate-500">{label}</p>

    <p className="mt-2 text-2xl font-bold text-slate-900">
      {value}
    </p>

    <p className="mt-1 text-xs text-slate-500">{description}</p>

    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full rounded-full ${barClass}`}
        style={{
          width: `${Math.min(100, Math.max(0, percentage))}%`,
        }}
      />
    </div>
  </div>
);

const QuickLink = ({ to, icon: Icon, label }) => (
  <Link
    to={to}
    className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-3 transition hover:border-blue-200 hover:bg-blue-50"
  >
    <span className="flex min-w-0 items-center gap-3">
      <Icon size={18} className="shrink-0 text-slate-500" />
      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>
    </span>

    <ChevronRight size={17} className="shrink-0 text-slate-400" />
  </Link>
);

export default MyChildren;