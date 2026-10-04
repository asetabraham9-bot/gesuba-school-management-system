import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  ListChecks,
  Plus,
  Search,
  UsersRound,
  XCircle,
} from "lucide-react";

/*
 * ============================================================
 * TEACHER EXAMINATIONS
 * ============================================================
 *
 * D5.1
 *
 * Responsibilities:
 * - Display teacher examinations
 * - Search examinations
 * - Filter by exam type
 * - Filter by status
 * - Filter by grade
 * - Display examination summaries
 * - Navigate to examination management
 *
 * API integration will be added later.
 */

/* ============================================================
   MOCK EXAMINATION DATA
============================================================ */

const examinationData = [
  {
    id: "EXAM-001",
    title: "Grade 12 Mathematics Mid Exam",
    subject: "Mathematics",
    grade: "Grade 12",
    section: "Section A",
    examCategory: "Class Assessment",
    examType: "Mid Exam",
    status: "Scheduled",
    examDate: "2026-09-15",
    duration: 120,
    questions: 40,
    participants: 38,
    totalStudents: 42,
  },
  {
    id: "EXAM-002",
    title: "Grade 11 Physics Unit 2 Exam",
    subject: "Physics",
    grade: "Grade 11",
    section: "Section B",
    examCategory: "Class Assessment",
    examType: "Unit Exam",
    status: "Active",
    examDate: "2026-09-08",
    duration: 90,
    questions: 30,
    participants: 35,
    totalStudents: 40,
  },
  {
    id: "EXAM-003",
    title: "Grade 10 Mathematics Practice Test",
    subject: "Mathematics",
    grade: "Grade 10",
    section: "Section A",
    examCategory: "Class Assessment",
    examType: "Practice",
    status: "Draft",
    examDate: "2026-09-20",
    duration: 60,
    questions: 25,
    participants: 0,
    totalStudents: 45,
  },
  {
    id: "EXAM-004",
    title: "Grade 12 Regional Model Examination",
    subject: "Mathematics",
    grade: "Grade 12",
    section: "Section A",
    examCategory: "Model Exam",
    examType: "Regional Model",
    status: "Scheduled",
    examDate: "2026-09-25",
    duration: 180,
    questions: 60,
    participants: 42,
    totalStudents: 42,
  },
  {
    id: "EXAM-005",
    title: "Grade 12 Zonal Model Examination",
    subject: "Physics",
    grade: "Grade 12",
    section: "Section B",
    examCategory: "Model Exam",
    examType: "Zonal Model",
    status: "Completed",
    examDate: "2026-08-28",
    duration: 180,
    questions: 60,
    participants: 39,
    totalStudents: 40,
  },
  {
    id: "EXAM-006",
    title: "Grade 11 Chemistry Quiz",
    subject: "Chemistry",
    grade: "Grade 11",
    section: "Section A",
    examCategory: "Class Assessment",
    examType: "Quiz",
    status: "Completed",
    examDate: "2026-08-25",
    duration: 30,
    questions: 15,
    participants: 41,
    totalStudents: 43,
  },
];

/* ============================================================
   STATUS CONFIGURATION
============================================================ */

const statusConfig = {
  Draft: {
    icon: FileText,
    className:
      "bg-slate-100 text-slate-600 border-slate-200",
  },

  Scheduled: {
    icon: Clock3,
    className:
      "bg-blue-50 text-blue-700 border-blue-200",
  },

  Active: {
    icon: CheckCircle2,
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  Completed: {
    icon: CheckCircle2,
    className:
      "bg-violet-50 text-violet-700 border-violet-200",
  },
};

/* ============================================================
   EXAM TYPE HELPERS
============================================================ */

const classAssessmentTypes = [
  "Mid Exam",
  "Final Exam",
  "Unit Exam",
  "Quiz",
  "Practice",
];

const modelExamTypes = [
  "Regional Model",
  "Zonal Model",
];

/* ============================================================
   COMPONENT
============================================================ */

export default function TeacherExaminations() {
  const [searchTerm, setSearchTerm] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [gradeFilter, setGradeFilter] =
    useState("All");

  const [showFilters, setShowFilters] =
    useState(false);

  /* ==========================================================
     FILTER DATA
  ========================================================== */

  const filteredExaminations = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    return examinationData.filter((exam) => {
      const matchesSearch =
        !normalizedSearch ||
        exam.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        exam.subject
          .toLowerCase()
          .includes(normalizedSearch) ||
        exam.grade
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        categoryFilter === "All" ||
        exam.examCategory === categoryFilter;

      const matchesType =
        typeFilter === "All" ||
        exam.examType === typeFilter;

      const matchesStatus =
        statusFilter === "All" ||
        exam.status === statusFilter;

      const matchesGrade =
        gradeFilter === "All" ||
        exam.grade === gradeFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesStatus &&
        matchesGrade
      );
    });
  }, [
    searchTerm,
    categoryFilter,
    typeFilter,
    statusFilter,
    gradeFilter,
  ]);

  /* ==========================================================
     SUMMARY STATISTICS
  ========================================================== */

  const totalExaminations =
    examinationData.length;

  const activeExaminations =
    examinationData.filter(
      (exam) => exam.status === "Active"
    ).length;

  const scheduledExaminations =
    examinationData.filter(
      (exam) => exam.status === "Scheduled"
    ).length;

  const completedExaminations =
    examinationData.filter(
      (exam) => exam.status === "Completed"
    ).length;

  /* ==========================================================
     RESET FILTERS
  ========================================================== */

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All");
    setTypeFilter("All");
    setStatusFilter("All");
    setGradeFilter("All");
  };

  const hasActiveFilters =
    categoryFilter !== "All" ||
    typeFilter !== "All" ||
    statusFilter !== "All" ||
    gradeFilter !== "All";

  /* ==========================================================
     FORMAT DATE
  ========================================================== */

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="space-y-6">

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <GraduationCap size={17} />

            <span>Teacher Portal</span>

            <ChevronRight size={15} />

            <span>Examinations</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Examinations
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Create, manage, monitor, and review examinations
            for your assigned students.
          </p>
        </div>

        <Link
          to="/teacher-dashboard/examinations/create"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 sm:w-auto"
        >
          <Plus size={18} />

          Create Examination
        </Link>
      </section>

      {/* ======================================================
          SUMMARY CARDS
      ====================================================== */}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Examinations
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {totalExaminations}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <FileText size={20} />
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Active
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {activeExaminations}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>

        {/* Scheduled */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Scheduled
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {scheduledExaminations}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <CalendarDays size={20} />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Completed
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {completedExaminations}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
              <ListChecks size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          SEARCH + FILTER BAR
      ====================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

          {/* Search */}
          <div className="relative min-w-0 flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search examinations, subjects, or grades..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Filter button */}
          <button
            type="button"
            onClick={() =>
              setShowFilters((previous) => !previous)
            }
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
              showFilters || hasActiveFilters
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Filter size={17} />

            Filters

            {hasActiveFilters && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-700 px-1.5 text-[10px] font-bold text-white">
                !
              </span>
            )}
          </button>
        </div>

        {/* ====================================================
            FILTER PANEL
        ==================================================== */}

        {showFilters && (
          <div className="mt-4 border-t border-slate-100 pt-4">

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {/* Category */}
              <div>
                <label
                  htmlFor="exam-category"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Exam Category
                </label>

                <select
                  id="exam-category"
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">
                    All Categories
                  </option>

                  <option value="Class Assessment">
                    Class Assessment
                  </option>

                  <option value="Model Exam">
                    Model Exam
                  </option>
                </select>
              </div>

              {/* Exam Type */}
              <div>
                <label
                  htmlFor="exam-type"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Exam Type
                </label>

                <select
                  id="exam-type"
                  value={typeFilter}
                  onChange={(event) =>
                    setTypeFilter(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">
                    All Exam Types
                  </option>

                  <optgroup label="Class Assessment">
                    {classAssessmentTypes.map(
                      (type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      )
                    )}
                  </optgroup>

                  <optgroup label="Model Exam">
                    {modelExamTypes.map(
                      (type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      )
                    )}
                  </optgroup>
                </select>
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="exam-status"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Status
                </label>

                <select
                  id="exam-status"
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">
                    All Statuses
                  </option>

                  <option value="Draft">
                    Draft
                  </option>

                  <option value="Scheduled">
                    Scheduled
                  </option>

                  <option value="Active">
                    Active
                  </option>

                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </div>

              {/* Grade */}
              <div>
                <label
                  htmlFor="exam-grade"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Grade
                </label>

                <select
                  id="exam-grade"
                  value={gradeFilter}
                  onChange={(event) =>
                    setGradeFilter(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">
                    All Grades
                  </option>

                  <option value="Grade 10">
                    Grade 10
                  </option>

                  <option value="Grade 11">
                    Grade 11
                  </option>

                  <option value="Grade 12">
                    Grade 12
                  </option>
                </select>
              </div>
            </div>

            {/* Reset */}
            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-red-600"
                >
                  <XCircle size={16} />

                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ======================================================
          RESULTS COUNT
      ====================================================== */}

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-semibold text-slate-800">
            Examination Management
          </p>

          <p className="mt-0.5 text-xs text-slate-500">
            Showing {filteredExaminations.length} of{" "}
            {totalExaminations} examinations
          </p>
        </div>
      </div>

      {/* ======================================================
          EXAMINATION TABLE
      ====================================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Desktop table */}
        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full min-w-[1100px]">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Examination
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Type
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Grade / Section
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Questions
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Participation
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredExaminations.map(
                (exam) => {
                  const status =
                    statusConfig[exam.status];

                  const StatusIcon =
                    status?.icon || FileText;

                  return (
                    <tr
                      key={exam.id}
                      className="transition hover:bg-slate-50/70"
                    >

                      {/* Examination */}
                      <td className="px-5 py-4">

                        <div className="flex items-start gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                            <FileText size={19} />
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-semibold text-slate-900">
                              {exam.title}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {exam.subject}
                            </p>

                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4">

                        <div>
                          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                            {exam.examType}
                          </span>

                          <p className="mt-1 text-[11px] text-slate-400">
                            {exam.examCategory}
                          </p>
                        </div>
                      </td>

                      {/* Grade */}
                      <td className="px-5 py-4">

                        <p className="text-sm font-medium text-slate-700">
                          {exam.grade}
                        </p>

                        <p className="text-xs text-slate-500">
                          {exam.section}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">

                        <p className="text-sm font-medium text-slate-700">
                          {formatDate(exam.examDate)}
                        </p>

                        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                          <Clock3 size={12} />

                          {exam.duration} min
                        </p>
                      </td>

                      {/* Questions */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <ListChecks size={16} className="text-slate-400" />

                          {exam.questions}
                        </div>
                      </td>

                      {/* Participation */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <UsersRound
                            size={16}
                            className="text-slate-400"
                          />

                          <div>
                            <p className="text-sm font-medium text-slate-700">
                              {exam.participants}/
                              {exam.totalStudents}
                            </p>

                            <p className="text-[11px] text-slate-400">
                              students
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${status.className}`}
                        >
                          <StatusIcon size={13} />

                          {exam.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4 text-right">

                        <Link
                          to={`/teacher-dashboard/examinations/${exam.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Eye size={15} />

                          Manage
                        </Link>
                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>
          </table>
        </div>

        {/* ====================================================
            MOBILE / TABLET CARDS
        ==================================================== */}

        <div className="divide-y divide-slate-100 lg:hidden">

          {filteredExaminations.map(
            (exam) => {
              const status =
                statusConfig[exam.status];

              const StatusIcon =
                status?.icon || FileText;

              return (
                <div
                  key={exam.id}
                  className="p-4 sm:p-5"
                >

                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <FileText size={19} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                        <div>
                          <h3 className="text-sm font-semibold text-slate-900">
                            {exam.title}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {exam.subject}
                          </p>
                        </div>

                        <span
                          className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${status.className}`}
                        >
                          <StatusIcon size={13} />

                          {exam.status}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Type
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-700">
                            {exam.examType}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Grade
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-700">
                            {exam.grade}
                          </p>

                          <p className="text-[11px] text-slate-400">
                            {exam.section}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Date
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-700">
                            {formatDate(exam.examDate)}
                          </p>

                          <p className="text-[11px] text-slate-400">
                            {exam.duration} min
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Students
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-700">
                            {exam.participants}/
                            {exam.totalStudents}
                          </p>
                        </div>

                      </div>

                      {/* Footer */}
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">

                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <ListChecks size={15} />

                          {exam.questions} questions
                        </div>

                        <Link
                          to={`/teacher-dashboard/examinations/${exam.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Eye size={15} />

                          Manage
                        </Link>

                      </div>

                    </div>
                  </div>
                </div>
              );
            }
          )}

        </div>

        {/* ====================================================
            EMPTY STATE
        ==================================================== */}

        {filteredExaminations.length === 0 && (
          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Search size={23} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-800">
              No examinations found
            </h3>

            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
              Try changing your search term or filters
              to find the examination you are looking for.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Clear filters
            </button>

          </div>
        )}

      </section>

      {/* ======================================================
          INFORMATION NOTE
      ====================================================== */}

      <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 sm:p-5">

        <div className="flex gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
            <GraduationCap size={18} />
          </div>

          <div>

            <h3 className="text-sm font-semibold text-blue-900">
              Examination categories
            </h3>

            <p className="mt-1 text-xs leading-5 text-blue-800/80">
              Class Assessment examinations include Mid,
              Final, Unit, Quiz, and Practice exams. Model
              examinations include Regional and Zonal model
              exams, particularly useful for Grade 12
              preparation before the university entrance
              examination.
            </p>

          </div>
        </div>

      </section>

    </div>
  );
}

