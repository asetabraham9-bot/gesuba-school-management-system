import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  FileText,
  UserRound,
  CalendarDays,
  CheckCircle2,
  Clock3,
  AlertCircle,
  ClipboardCheck,
  Eye,
  GraduationCap,
  Filter,
  RotateCcw,
} from "lucide-react";

/*
 * ============================================================
 * MOCK DATA
 * ============================================================
 *
 * Temporary frontend data.
 *
 * Later this will be replaced with backend/API data.
 */

const assignments = [
  {
    id: "ASM001",
    title: "Algebra Practice Assignment",
    subject: "Mathematics",
    className: "Grade 9 A",
    maxMarks: 20,
  },
  {
    id: "ASM002",
    title: "Cell Structure Worksheet",
    subject: "Biology",
    className: "Grade 10 A",
    maxMarks: 15,
  },
  {
    id: "ASM003",
    title: "Motion Problems",
    subject: "Physics",
    className: "Grade 11 B",
    maxMarks: 25,
  },
  {
    id: "ASM004",
    title: "Chemical Reactions Exercise",
    subject: "Chemistry",
    className: "Grade 10 B",
    maxMarks: 20,
  },
];

const initialSubmissions = [
  {
    id: "SUB001",
    assignmentId: "ASM001",
    studentName: "Abebe Kebede",
    studentId: "GGSS.STU0001",
    status: "Submitted",
    submittedAt: "Sep 10, 2026 09:30",
    fileName: "algebra-practice.pdf",
    fileSize: "1.2 MB",
    marks: null,
    feedback: "",
  },
  {
    id: "SUB002",
    assignmentId: "ASM001",
    studentName: "Hana Bekele",
    studentId: "GGSS.STU0002",
    status: "Graded",
    submittedAt: "Sep 10, 2026 14:20",
    fileName: "hana-algebra.pdf",
    fileSize: "980 KB",
    marks: 18,
    feedback:
      "Good work. Review the final two problems.",
  },
  {
    id: "SUB003",
    assignmentId: "ASM001",
    studentName: "Dawit Alemu",
    studentId: "GGSS.STU0003",
    status: "Submitted",
    submittedAt: "Sep 11, 2026 08:45",
    fileName: "dawit-algebra.pdf",
    fileSize: "1.4 MB",
    marks: null,
    feedback: "",
  },
  {
    id: "SUB004",
    assignmentId: "ASM001",
    studentName: "Meron Tesfaye",
    studentId: "GGSS.STU0004",
    status: "Pending",
    submittedAt: null,
    fileName: null,
    fileSize: null,
    marks: null,
    feedback: "",
  },
  {
    id: "SUB005",
    assignmentId: "ASM001",
    studentName: "Samuel Girma",
    studentId: "GGSS.STU0005",
    status: "Late",
    submittedAt: "Sep 12, 2026 10:15",
    fileName: "samuel-algebra.pdf",
    fileSize: "1.1 MB",
    marks: null,
    feedback: "",
  },
  {
    id: "SUB006",
    assignmentId: "ASM002",
    studentName: "Liya Tadesse",
    studentId: "GGSS.STU0011",
    status: "Submitted",
    submittedAt: "Sep 13, 2026 11:20",
    fileName: "cell-worksheet.pdf",
    fileSize: "850 KB",
    marks: null,
    feedback: "",
  },
  {
    id: "SUB007",
    assignmentId: "ASM002",
    studentName: "Yonas Bekele",
    studentId: "GGSS.STU0012",
    status: "Graded",
    submittedAt: "Sep 13, 2026 15:40",
    fileName: "yonas-cell.pdf",
    fileSize: "760 KB",
    marks: 14,
    feedback:
      "Excellent understanding of the topic.",
  },
  {
    id: "SUB008",
    assignmentId: "ASM002",
    studentName: "Rahel Worku",
    studentId: "GGSS.STU0013",
    status: "Pending",
    submittedAt: null,
    fileName: null,
    fileSize: null,
    marks: null,
    feedback: "",
  },
  {
    id: "SUB009",
    assignmentId: "ASM003",
    studentName: "Mekdes Fikadu",
    studentId: "GGSS.STU0021",
    status: "Pending",
    submittedAt: null,
    fileName: null,
    fileSize: null,
    marks: null,
    feedback: "",
  },
  {
    id: "SUB010",
    assignmentId: "ASM004",
    studentName: "Kalkidan Desta",
    studentId: "GGSS.STU0031",
    status: "Graded",
    submittedAt: "Sep 4, 2026 13:10",
    fileName: "chemical-reactions.pdf",
    fileSize: "1.3 MB",
    marks: 19,
    feedback: "Very strong submission.",
  },
];

/*
 * ============================================================
 * STATUS CONFIGURATION
 * ============================================================
 */

const statusConfig = {
  Submitted: {
    label: "Submitted",
    className:
      "bg-blue-50 text-blue-700 border-blue-200",
    icon: CheckCircle2,
  },

  Graded: {
    label: "Graded",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: ClipboardCheck,
  },

  Pending: {
    label: "Pending",
    className:
      "bg-slate-50 text-slate-600 border-slate-200",
    icon: Clock3,
  },

  Late: {
    label: "Late",
    className:
      "bg-amber-50 text-amber-700 border-amber-200",
    icon: AlertCircle,
  },
};

/*
 * ============================================================
 * COMPONENT
 * ============================================================
 */

const TeacherSubmissions = () => {
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState(
    initialSubmissions
  );

  const [selectedAssignment, setSelectedAssignment] =
    useState("all");

  const [selectedStatus, setSelectedStatus] =
    useState("all");

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedSubmission, setSelectedSubmission] =
    useState(null);

  /*
   * ==========================================================
   * ASSIGNMENT LOOKUP
   * ==========================================================
   */

  const getAssignment = (assignmentId) => {
    return assignments.find(
      (assignment) => assignment.id === assignmentId
    );
  };

  /*
   * ==========================================================
   * FILTERED SUBMISSIONS
   * ==========================================================
   */

  const filteredSubmissions = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    return submissions.filter((submission) => {
      const assignment = getAssignment(
        submission.assignmentId
      );

      const matchesAssignment =
        selectedAssignment === "all" ||
        submission.assignmentId === selectedAssignment;

      const matchesStatus =
        selectedStatus === "all" ||
        submission.status === selectedStatus;

      const matchesSearch =
        !normalizedSearch ||
        submission.studentName
          .toLowerCase()
          .includes(normalizedSearch) ||
        submission.studentId
          .toLowerCase()
          .includes(normalizedSearch) ||
        assignment?.title
          .toLowerCase()
          .includes(normalizedSearch);

      return (
        matchesAssignment &&
        matchesStatus &&
        matchesSearch
      );
    });
  }, [
    submissions,
    selectedAssignment,
    selectedStatus,
    searchTerm,
  ]);

  /*
   * ==========================================================
   * STATISTICS
   * ==========================================================
   */

  const statistics = useMemo(() => {
    return {
      total: submissions.length,

      submitted: submissions.filter(
        (submission) =>
          submission.status === "Submitted"
      ).length,

      graded: submissions.filter(
        (submission) =>
          submission.status === "Graded"
      ).length,

      pending: submissions.filter(
        (submission) =>
          submission.status === "Pending"
      ).length,

      late: submissions.filter(
        (submission) =>
          submission.status === "Late"
      ).length,
    };
  }, [submissions]);

  /*
   * ==========================================================
   * OPEN GRADING PAGE
   * ==========================================================
   *
   * This is the important connection to TeacherGrading.jsx.
   */

  const handleGradeSubmission = (submission) => {
    navigate(
      `/teacher-dashboard/submissions/${submission.id}/grade`
    );
  };

  /*
   * ==========================================================
   * VIEW SUBMISSION
   * ==========================================================
   */

  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission);
  };

  /*
   * ==========================================================
   * CLOSE DETAILS
   * ==========================================================
   */

  const handleCloseDetails = () => {
    setSelectedSubmission(null);
  };

  /*
   * ==========================================================
   * RESET FILTERS
   * ==========================================================
   */

  const handleResetFilters = () => {
    setSelectedAssignment("all");
    setSelectedStatus("all");
    setSearchTerm("");
  };

  /*
   * ==========================================================
   * MOCK STATUS UPDATE
   * ==========================================================
   *
   * Temporary frontend-only behavior.
   */

  const handleMarkAsReviewed = (submissionId) => {
    setSubmissions((previous) =>
      previous.map((submission) =>
        submission.id === submissionId
          ? {
              ...submission,
              status: "Submitted",
            }
          : submission
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* ======================================================
          PAGE HEADER
      ======================================================= */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-700">
            LMS / Assessment
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Student Submissions
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Review student assignment submissions, check
            submission status, and grade student work.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <GraduationCap
            size={19}
            className="text-blue-700"
          />

          <div>
            <p className="text-xs text-slate-500">
              Total submissions
            </p>

            <p className="text-lg font-bold text-slate-900">
              {statistics.total}
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================
          STATISTICS
      ======================================================= */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {statistics.total}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <FileText size={20} />
            </div>
          </div>
        </div>

        {/* Submitted */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Submitted
              </p>

              <p className="mt-1 text-2xl font-bold text-blue-700">
                {statistics.submitted}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>

        {/* Graded */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Graded
              </p>

              <p className="mt-1 text-2xl font-bold text-emerald-700">
                {statistics.graded}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <ClipboardCheck size={20} />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-700">
                {statistics.pending}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Clock3 size={20} />
            </div>
          </div>
        </div>

        {/* Late */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Late
              </p>

              <p className="mt-1 text-2xl font-bold text-amber-700">
                {statistics.late}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <AlertCircle size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          FILTERS
      ======================================================= */}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <Filter
            size={18}
            className="text-slate-500"
          />

          <h2 className="text-sm font-semibold text-slate-900">
            Filter submissions
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_auto]">
          {/* Search */}
          <div className="relative">
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
              placeholder="Search student or assignment..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Assignment */}
          <select
            value={selectedAssignment}
            onChange={(event) =>
              setSelectedAssignment(event.target.value)
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">
              All assignments
            </option>

            {assignments.map((assignment) => (
              <option
                key={assignment.id}
                value={assignment.id}
              >
                {assignment.title}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(event) =>
              setSelectedStatus(event.target.value)
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">
              All statuses
            </option>

            <option value="Submitted">
              Submitted
            </option>

            <option value="Graded">
              Graded
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Late">
              Late
            </option>
          </select>

          {/* Reset */}
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </section>

      {/* ======================================================
          SUBMISSIONS TABLE
      ======================================================= */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Submission Records
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Showing {filteredSubmissions.length} of{" "}
              {submissions.length} submissions
            </p>
          </div>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <FileText size={23} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              No submissions found
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Try changing your search or filter criteria.
            </p>

            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
            >
              <RotateCcw size={16} />
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1000px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Student
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Assignment
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Submission
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Result
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredSubmissions.map(
                    (submission) => {
                      const assignment =
                        getAssignment(
                          submission.assignmentId
                        );

                      const config =
                        statusConfig[
                          submission.status
                        ] ||
                        statusConfig.Pending;

                      const StatusIcon = config.icon;

                      return (
                        <tr
                          key={submission.id}
                          className="transition hover:bg-slate-50"
                        >
                          {/* Student */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                                {submission.studentName
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-800">
                                  {
                                    submission.studentName
                                  }
                                </p>

                                <p className="mt-0.5 text-xs text-slate-500">
                                  {
                                    submission.studentId
                                  }
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Assignment */}
                          <td className="px-5 py-4">
                            <p className="max-w-[230px] truncate text-sm font-medium text-slate-800">
                              {assignment?.title ||
                                "Unknown assignment"}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {assignment?.subject} •{" "}
                              {assignment?.className}
                            </p>
                          </td>

                          {/* Submission */}
                          <td className="px-5 py-4">
                            {submission.submittedAt ? (
                              <div>
                                <p className="inline-flex items-center gap-1.5 text-sm text-slate-700">
                                  <CalendarDays
                                    size={14}
                                    className="text-slate-400"
                                  />
                                  {
                                    submission.submittedAt
                                  }
                                </p>

                                {submission.fileName && (
                                  <p className="mt-1 max-w-[200px] truncate text-xs text-slate-500">
                                    {
                                      submission.fileName
                                    }
                                  </p>
                                )}
                              </div>
                            ) : (
                              <span className="text-sm text-slate-400">
                                Not submitted
                              </span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}
                            >
                              <StatusIcon size={13} />
                              {config.label}
                            </span>
                          </td>

                          {/* Result */}
                          <td className="px-5 py-4">
                            {submission.marks !==
                              null &&
                            submission.marks !==
                              undefined ? (
                              <span className="font-semibold text-slate-800">
                                {submission.marks} /{" "}
                                {
                                  assignment?.maxMarks
                                }
                              </span>
                            ) : (
                              <span className="text-sm text-slate-400">
                                Not graded
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleViewSubmission(
                                    submission
                                  )
                                }
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                              >
                                <Eye size={15} />
                                View
                              </button>

                              {submission.status !==
                                "Pending" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleGradeSubmission(
                                      submission
                                    )
                                  }
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-800"
                                >
                                  <ClipboardCheck
                                    size={15}
                                  />

                                  {submission.status ===
                                  "Graded"
                                    ? "Edit Grade"
                                    : "Grade"}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet cards */}
            <div className="divide-y divide-slate-100 lg:hidden">
              {filteredSubmissions.map(
                (submission) => {
                  const assignment =
                    getAssignment(
                      submission.assignmentId
                    );

                  const config =
                    statusConfig[
                      submission.status
                    ] ||
                    statusConfig.Pending;

                  const StatusIcon = config.icon;

                  return (
                    <article
                      key={submission.id}
                      className="p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                            {submission.studentName
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold text-slate-900">
                              {
                                submission.studentName
                              }
                            </h3>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {
                                submission.studentId
                              }
                            </p>
                          </div>
                        </div>

                        <span
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}
                        >
                          <StatusIcon size={13} />
                          {config.label}
                        </span>
                      </div>

                      <div className="mt-4 rounded-xl bg-slate-50 p-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <p className="text-xs text-slate-500">
                              Assignment
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-800">
                              {assignment?.title}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-slate-500">
                              Subject / Class
                            </p>

                            <p className="mt-1 text-sm text-slate-700">
                              {assignment?.subject} •{" "}
                              {assignment?.className}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-slate-500">
                              Submitted
                            </p>

                            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-700">
                              <CalendarDays
                                size={14}
                                className="text-slate-400"
                              />

                              {submission.submittedAt ||
                                "Not submitted"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-slate-500">
                              Result
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-800">
                              {submission.marks !==
                                null &&
                              submission.marks !==
                                undefined
                                ? `${submission.marks} / ${assignment?.maxMarks}`
                                : "Not graded"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <button
                          type="button"
                          onClick={() =>
                            handleViewSubmission(
                              submission
                            )
                          }
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                        >
                          <Eye size={16} />
                          View Submission
                        </button>

                        {submission.status !==
                          "Pending" && (
                          <button
                            type="button"
                            onClick={() =>
                              handleGradeSubmission(
                                submission
                              )
                            }
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
                          >
                            <ClipboardCheck
                              size={16}
                            />

                            {submission.status ===
                            "Graded"
                              ? "Edit Grade"
                              : "Grade Submission"}
                          </button>
                        )}
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          </>
        )}
      </section>

      {/* ======================================================
          SUBMISSION DETAILS MODAL
      ======================================================= */}

      {selectedSubmission && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-blue-700">
                  Submission Details
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {selectedSubmission.studentName}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedSubmission.studentId}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseDetails}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close submission details"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 p-5">
              {/* Student */}
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <UserRound
                    size={18}
                    className="text-blue-700"
                  />

                  <h3 className="text-sm font-semibold text-slate-900">
                    Student
                  </h3>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">
                      Full Name
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {
                        selectedSubmission.studentName
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Student ID
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {
                        selectedSubmission.studentId
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Assignment */}
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <FileText
                    size={18}
                    className="text-blue-700"
                  />

                  <h3 className="text-sm font-semibold text-slate-900">
                    Assignment
                  </h3>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-semibold text-slate-800">
                    {
                      getAssignment(
                        selectedSubmission.assignmentId
                      )?.title
                    }
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {
                      getAssignment(
                        selectedSubmission.assignmentId
                      )?.subject
                    }{" "}
                    •{" "}
                    {
                      getAssignment(
                        selectedSubmission.assignmentId
                      )?.className
                    }
                  </p>
                </div>
              </div>

              {/* File */}
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Submitted File
                </p>

                {selectedSubmission.fileName ? (
                  <div className="mt-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-600">
                      <FileText size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {
                          selectedSubmission.fileName
                        }
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {
                          selectedSubmission.fileSize
                        }
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-slate-400">
                    No file submitted.
                  </p>
                )}
              </div>

              {/* Submission date */}
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <CalendarDays
                    size={18}
                    className="text-blue-700"
                  />

                  <div>
                    <p className="text-xs text-slate-500">
                      Submitted At
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {selectedSubmission.submittedAt ||
                        "Not submitted"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Existing grade */}
              {selectedSubmission.marks !==
                null &&
                selectedSubmission.marks !==
                  undefined && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                      Current Grade
                    </p>

                    <p className="mt-1 text-xl font-bold text-emerald-800">
                      {
                        selectedSubmission.marks
                      }{" "}
                      /{" "}
                      {
                        getAssignment(
                          selectedSubmission.assignmentId
                        )?.maxMarks
                      }
                    </p>

                    {selectedSubmission.feedback && (
                      <p className="mt-2 text-sm text-emerald-700">
                        {
                          selectedSubmission.feedback
                        }
                      </p>
                    )}
                  </div>
                )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse gap-2 border-t border-slate-200 p-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCloseDetails}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>

              {selectedSubmission.status !==
                "Pending" && (
                <button
                  type="button"
                  onClick={() => {
                    handleCloseDetails();
                    handleGradeSubmission(
                      selectedSubmission
                    );
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
                >
                  <ClipboardCheck size={16} />

                  {selectedSubmission.status ===
                  "Graded"
                    ? "Edit Grade"
                    : "Grade Submission"}
                </button>
              )}

              {selectedSubmission.status ===
                "Submitted" && (
                <button
                  type="button"
                  onClick={() =>
                    handleMarkAsReviewed(
                      selectedSubmission.id
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <CheckCircle2 size={16} />
                  Mark Reviewed
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherSubmissions;
