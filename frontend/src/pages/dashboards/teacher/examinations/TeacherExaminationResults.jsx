import { useMemo, useState } from "react";
import {
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Download,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  Search,
  Users,
  XCircle,
} from "lucide-react";

const TeacherExaminationResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [expandedCandidateId, setExpandedCandidateId] = useState(null);

  /*
   * Mock examination information.
   * This will later come from the backend.
   */
  const examination = {
    id: "EXAM-001",
    title: "Grade 12 Mathematics Mid Examination",
    subject: "Mathematics",
    grade: "Grade 12",
    section: "Section A",
    examCategory: "Class Assessment",
    examType: "Mid Exam",
    examDate: "2026-08-25",
    startTime: "09:00",
    duration: 90,
    totalMarks: 50,
    passingMark: 25,
    status: "Completed",
  };

  /*
   * Mock candidate result data.
   *
   * Backend integration will later provide:
   * - student information
   * - submission information
   * - obtained marks
   * - percentage
   * - status
   * - submission time
   */
  const candidates = [
    {
      id: "STU-001",
      studentId: "GGSS.STU0001",
      fullName: "Abebe Kebede",
      grade: "Grade 12",
      section: "Section A",
      submitted: true,
      submissionTime: "10:18 AM",
      obtainedMarks: 44,
      totalMarks: 50,
      percentage: 88,
      status: "Passed",
      correctAnswers: 18,
      wrongAnswers: 2,
      unanswered: 0,
      rank: 1,
    },
    {
      id: "STU-002",
      studentId: "GGSS.STU0002",
      fullName: "Sara Mohammed",
      grade: "Grade 12",
      section: "Section A",
      submitted: true,
      submissionTime: "10:25 AM",
      obtainedMarks: 41,
      totalMarks: 50,
      percentage: 82,
      status: "Passed",
      correctAnswers: 17,
      wrongAnswers: 3,
      unanswered: 0,
      rank: 2,
    },
    {
      id: "STU-003",
      studentId: "GGSS.STU0003",
      fullName: "Daniel Tesfaye",
      grade: "Grade 12",
      section: "Section A",
      submitted: true,
      submissionTime: "10:31 AM",
      obtainedMarks: 37,
      totalMarks: 50,
      percentage: 74,
      status: "Passed",
      correctAnswers: 15,
      wrongAnswers: 4,
      unanswered: 1,
      rank: 3,
    },
    {
      id: "STU-004",
      studentId: "GGSS.STU0004",
      fullName: "Hana Bekele",
      grade: "Grade 12",
      section: "Section A",
      submitted: true,
      submissionTime: "10:42 AM",
      obtainedMarks: 32,
      totalMarks: 50,
      percentage: 64,
      status: "Passed",
      correctAnswers: 13,
      wrongAnswers: 6,
      unanswered: 1,
      rank: 4,
    },
    {
      id: "STU-005",
      studentId: "GGSS.STU0005",
      fullName: "Yonas Alemu",
      grade: "Grade 12",
      section: "Section A",
      submitted: true,
      submissionTime: "10:50 AM",
      obtainedMarks: 24,
      totalMarks: 50,
      percentage: 48,
      status: "Failed",
      correctAnswers: 10,
      wrongAnswers: 9,
      unanswered: 1,
      rank: 5,
    },
    {
      id: "STU-006",
      studentId: "GGSS.STU0006",
      fullName: "Mekdes Girma",
      grade: "Grade 12",
      section: "Section A",
      submitted: false,
      submissionTime: null,
      obtainedMarks: 0,
      totalMarks: 50,
      percentage: 0,
      status: "Not Submitted",
      correctAnswers: 0,
      wrongAnswers: 0,
      unanswered: 20,
      rank: null,
    },
    {
      id: "STU-007",
      studentId: "GGSS.STU0007",
      fullName: "Samuel Worku",
      grade: "Grade 12",
      section: "Section B",
      submitted: true,
      submissionTime: "10:55 AM",
      obtainedMarks: 29,
      totalMarks: 50,
      percentage: 58,
      status: "Passed",
      correctAnswers: 12,
      wrongAnswers: 7,
      unanswered: 1,
      rank: 6,
    },
    {
      id: "STU-008",
      studentId: "GGSS.STU0008",
      fullName: "Rahel Tadesse",
      grade: "Grade 12",
      section: "Section B",
      submitted: true,
      submissionTime: "11:02 AM",
      obtainedMarks: 21,
      totalMarks: 50,
      percentage: 42,
      status: "Failed",
      correctAnswers: 9,
      wrongAnswers: 10,
      unanswered: 1,
      rank: 7,
    },
  ];

  /*
   * Filter candidates.
   */
  const filteredCandidates = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return candidates.filter((candidate) => {
      const matchesSearch =
        !normalizedSearch ||
        candidate.fullName.toLowerCase().includes(normalizedSearch) ||
        candidate.studentId.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" ||
        candidate.status === statusFilter;

      const matchesSection =
        sectionFilter === "All" ||
        candidate.section === sectionFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSection
      );
    });
  }, [searchTerm, statusFilter, sectionFilter]);

  /*
   * Result statistics.
   */
  const submittedCandidates = candidates.filter(
    (candidate) => candidate.submitted
  );

  const passedCandidates = candidates.filter(
    (candidate) => candidate.status === "Passed"
  );

  const failedCandidates = candidates.filter(
    (candidate) => candidate.status === "Failed"
  );

  const averagePercentage =
    submittedCandidates.length > 0
      ? Math.round(
          submittedCandidates.reduce(
            (total, candidate) =>
              total + candidate.percentage,
            0
          ) / submittedCandidates.length
        )
      : 0;

  const highestMark =
    submittedCandidates.length > 0
      ? Math.max(
          ...submittedCandidates.map(
            (candidate) => candidate.obtainedMarks
          )
        )
      : 0;

  /*
   * Format date.
   */
  const formatDate = (date) => {
    if (!date) {
      return "Not scheduled";
    }

    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  /*
   * Toggle candidate details.
   */
  const toggleCandidate = (candidateId) => {
    setExpandedCandidateId((current) =>
      current === candidateId ? null : candidateId
    );
  };

  /*
   * Open candidate result details.
   */
  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  /*
   * Mock export behavior.
   */
  const handleExportResults = () => {
  if (!filteredCandidates.length) {
    alert("There are no results available to export.");
    return;
  }

  const headers = [
    "Rank",
    "Student Name",
    "Student ID",
    "Grade",
    "Section",
    "Marks",
    "Total Marks",
    "Percentage (%)",
    "Status",
    "Submitted At",
    "Correct Answers",
    "Wrong Answers",
    "Unanswered",
  ];

  const rows = filteredCandidates.map((candidate) => [
    candidate.rank ?? "",
    candidate.fullName,
    candidate.studentId,
    candidate.grade,
    candidate.section,
    candidate.obtainedMarks,
    examination.totalMarks,
    candidate.percentage,
    candidate.status,
    candidate.submissionTime || "Not Submitted",
    candidate.correctAnswers,
    candidate.wrongAnswers,
    candidate.unanswered,
  ]);

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row
        .map((value) => {
          const stringValue = String(value ?? "");

          return `"${stringValue.replace(/"/g, '""')}"`;
        })
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `${examination.title
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "")}_Results.csv`;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Examination Results
              </h1>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <CheckCircle2 size={13} />
                {examination.status}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Review candidate performance and examination results.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportResults}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Download size={17} />
            Export Results
          </button>
        </div>

        {/* Examination Information */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                  Examination
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {examination.title}
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span>{examination.examCategory}</span>

                  <span className="text-slate-300">•</span>

                  <span>{examination.examType}</span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-400">
                  Examination Date
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {formatDate(examination.examDate)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-px bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <InfoItem
              icon={BookOpen}
              label="Subject"
              value={examination.subject}
            />

            <InfoItem
              icon={GraduationCap}
              label="Grade"
              value={examination.grade}
            />

            <InfoItem
              icon={Users}
              label="Section"
              value={examination.section}
            />

            <InfoItem
              icon={Clock3}
              label="Duration"
              value={`${examination.duration} minutes`}
            />

            <InfoItem
              icon={FileText}
              label="Total Marks"
              value={examination.totalMarks}
            />

            <InfoItem
              icon={Award}
              label="Passing Mark"
              value={examination.passingMark}
            />
          </div>
        </section>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            icon={Users}
            label="Candidates"
            value={candidates.length}
            description="Registered candidates"
          />

          <StatCard
            icon={FileText}
            label="Submitted"
            value={submittedCandidates.length}
            description="Completed submissions"
          />

          <StatCard
            icon={CheckCircle2}
            label="Passed"
            value={passedCandidates.length}
            description="Above passing mark"
          />

          <StatCard
            icon={XCircle}
            label="Failed"
            value={failedCandidates.length}
            description="Below passing mark"
          />

          <StatCard
            icon={BarChart3}
            label="Average"
            value={`${averagePercentage}%`}
            description={`Highest: ${highestMark}/${examination.totalMarks}`}
          />
        </div>

        {/* Filters */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-slate-500" />

              <div>
                <h2 className="font-semibold text-slate-900">
                  Candidate Results
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Search and filter examination candidates.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4 sm:p-5">
            {/* Search */}
            <div className="relative sm:col-span-2 lg:col-span-2">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search candidate name or student ID..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Statuses</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
              <option value="Not Submitted">
                Not Submitted
              </option>
            </select>

            {/* Section */}
            <select
              value={sectionFilter}
              onChange={(event) =>
                setSectionFilter(event.target.value)
              }
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Sections</option>
              <option value="Section A">Section A</option>
              <option value="Section B">Section B</option>
              <option value="Section C">Section C</option>
            </select>
          </div>
        </section>

        {/* Results Table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Candidate
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Class
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Submission
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Marks
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Percentage
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCandidates.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-5 py-12 text-center"
                    >
                      <Search
                        size={30}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-3 font-medium text-slate-700">
                        No candidates found
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((candidate) => {
                    const isExpanded =
                      expandedCandidateId === candidate.id;

                    return (
                      <tr
                        key={candidate.id}
                        className="align-top transition hover:bg-slate-50/70"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">
                              {candidate.fullName
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800">
                                {candidate.fullName}
                              </p>

                              <p className="mt-0.5 text-xs text-slate-500">
                                {candidate.studentId}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-700">
                            {candidate.grade}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {candidate.section}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          {candidate.submitted ? (
                            <>
                              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                                <CheckCircle2 size={15} />
                                Submitted
                              </span>

                              <p className="mt-1 text-xs text-slate-500">
                                {candidate.submissionTime}
                              </p>
                            </>
                          ) : (
                            <>
                              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
                                <Clock3 size={15} />
                                Not Submitted
                              </span>

                              <p className="mt-1 text-xs text-slate-400">
                                No submission
                              </p>
                            </>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-bold text-slate-800">
                            {candidate.obtainedMarks}
                            <span className="font-normal text-slate-400">
                              /{candidate.totalMarks}
                            </span>
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className={`h-full rounded-full ${
                                  candidate.status === "Passed"
                                    ? "bg-emerald-500"
                                    : candidate.status === "Failed"
                                      ? "bg-red-500"
                                      : "bg-slate-300"
                                }`}
                                style={{
                                  width: `${Math.min(
                                    candidate.percentage,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>

                            <span className="text-sm font-semibold text-slate-700">
                              {candidate.percentage}%
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge
                            status={candidate.status}
                          />
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleViewCandidate(candidate)
                              }
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                              title="View result"
                            >
                              <Eye size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                toggleCandidate(candidate.id)
                              }
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                              title="Show candidate details"
                            >
                              {isExpanded ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                            </button>
                          </div>

                          {isExpanded && (
                            <div className="absolute right-5 z-10 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-xl">
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Candidate Summary
                              </p>

                              <div className="mt-3 space-y-2">
                                <DetailRow
                                  label="Correct Answers"
                                  value={
                                    candidate.correctAnswers
                                  }
                                />

                                <DetailRow
                                  label="Wrong Answers"
                                  value={
                                    candidate.wrongAnswers
                                  }
                                />

                                <DetailRow
                                  label="Unanswered"
                                  value={
                                    candidate.unanswered
                                  }
                                />

                                <DetailRow
                                  label="Rank"
                                  value={
                                    candidate.rank
                                      ? `#${candidate.rank}`
                                      : "N/A"
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-200 px-5 py-4">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredCandidates.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {candidates.length}
              </span>{" "}
              candidates
            </p>
          </div>
        </section>
      </div>

      {/* Candidate Result Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800">
                  {selectedCandidate.fullName
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    {selectedCandidate.fullName}
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {selectedCandidate.studentId}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close candidate result"
              >
                <X size={19} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-5 p-5 sm:p-6">
              {/* Result Banner */}
              <div
                className={`rounded-2xl border p-5 ${
                  selectedCandidate.status === "Passed"
                    ? "border-emerald-200 bg-emerald-50"
                    : selectedCandidate.status === "Failed"
                      ? "border-red-200 bg-red-50"
                      : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Examination Result
                    </p>

                    <p className="mt-1 text-3xl font-bold text-slate-900">
                      {selectedCandidate.obtainedMarks}
                      <span className="text-lg font-medium text-slate-400">
                        /{selectedCandidate.totalMarks}
                      </span>
                    </p>
                  </div>

                  <StatusBadge
                    status={selectedCandidate.status}
                    large
                  />
                </div>
              </div>

              {/* Candidate Information */}
              <section>
                <h3 className="font-semibold text-slate-900">
                  Candidate Information
                </h3>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <ModalInfo
                    label="Student ID"
                    value={selectedCandidate.studentId}
                  />

                  <ModalInfo
                    label="Full Name"
                    value={selectedCandidate.fullName}
                  />

                  <ModalInfo
                    label="Grade"
                    value={selectedCandidate.grade}
                  />

                  <ModalInfo
                    label="Section"
                    value={selectedCandidate.section}
                  />
                </div>
              </section>

              {/* Performance */}
              <section>
                <h3 className="font-semibold text-slate-900">
                  Performance
                </h3>

                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <PerformanceCard
                    label="Percentage"
                    value={`${selectedCandidate.percentage}%`}
                  />

                  <PerformanceCard
                    label="Correct"
                    value={selectedCandidate.correctAnswers}
                  />

                  <PerformanceCard
                    label="Wrong"
                    value={selectedCandidate.wrongAnswers}
                  />

                  <PerformanceCard
                    label="Unanswered"
                    value={selectedCandidate.unanswered}
                  />
                </div>
              </section>

              {/* Submission */}
              <section>
                <h3 className="font-semibold text-slate-900">
                  Submission Information
                </h3>

                <div className="mt-3 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <span className="text-sm text-slate-500">
                      Submission Status
                    </span>

                    <StatusBadge
                      status={
                        selectedCandidate.submitted
                          ? "Submitted"
                          : "Not Submitted"
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-slate-500">
                      Submission Time
                    </span>

                    <span className="text-sm font-semibold text-slate-700">
                      {selectedCandidate.submissionTime ||
                        "No submission"}
                    </span>
                  </div>
                </div>
              </section>

              {/* Result Summary */}
              <section>
                <h3 className="font-semibold text-slate-900">
                  Result Summary
                </h3>

                <div className="mt-3 rounded-xl bg-slate-50 p-4">
                  <div className="space-y-3">
                    <DetailRow
                      label="Obtained Marks"
                      value={`${selectedCandidate.obtainedMarks}/${selectedCandidate.totalMarks}`}
                    />

                    <DetailRow
                      label="Passing Mark"
                      value={examination.passingMark}
                    />

                    <DetailRow
                      label="Percentage"
                      value={`${selectedCandidate.percentage}%`}
                    />

                    <DetailRow
                      label="Class Rank"
                      value={
                        selectedCandidate.rank
                          ? `#${selectedCandidate.rank}`
                          : "Not ranked"
                      }
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-slate-200 p-5">
              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/*
 * Examination information item.
 */
const InfoItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="bg-white p-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
        <Icon size={14} />
        {label}
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
};

/*
 * Dashboard statistic card.
 */
const StatCard = ({
  icon: Icon,
  label,
  value,
  description,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <Icon size={19} />
        </div>
      </div>

      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
};

/*
 * Result status badge.
 */
const StatusBadge = ({
  status,
  large = false,
}) => {
  const styles = {
    Passed:
      "bg-emerald-100 text-emerald-700",
    Failed:
      "bg-red-100 text-red-700",
    "Not Submitted":
      "bg-slate-100 text-slate-600",
    Submitted:
      "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold ${
        large ? "px-3 py-1.5 text-sm" : "text-xs"
      } ${styles[status] || "bg-slate-100 text-slate-600"}`}
    >
      {status === "Passed" && (
        <CheckCircle2 size={large ? 16 : 13} />
      )}

      {status === "Failed" && (
        <XCircle size={large ? 16 : 13} />
      )}

      {status === "Submitted" && (
        <CheckCircle2 size={large ? 16 : 13} />
      )}

      {status}
    </span>
  );
};

/*
 * Candidate detail row.
 */
const DetailRow = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-right text-sm font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
};

/*
 * Modal information item.
 */
const ModalInfo = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
};

/*
 * Performance card.
 */
const PerformanceCard = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
};

export default TeacherExaminationResults;
