import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Filter,
  GraduationCap,
  Search,
  Send,
  //XCircle,
} from "lucide-react";

const assignmentData = {
  "GGSS.STU0001": {
    name: "Abebe Kebede",
    studentId: "GGSS.STU0001",
    grade: "Grade 12",
    section: "Section A",
    assignments: [
      {
        id: "AB-A001",
        title: "Algebra and Functions",
        subject: "Mathematics",
        teacher: "Mr. Daniel Tesfaye",
        assignedDate: "2026-10-12",
        dueDate: "2026-10-23",
        status: "Pending",
        score: null,
        total: 20,
        feedback: "",
        description: "Complete the exercises on quadratic functions.",
      },
      {
        id: "AB-A002",
        title: "Motion and Force Worksheet",
        subject: "Physics",
        teacher: "Mr. Daniel Tesfaye",
        assignedDate: "2026-10-08",
        dueDate: "2026-10-16",
        status: "Graded",
        score: 17,
        total: 20,
        feedback: "Good understanding. Review the final calculation.",
        description: "Solve the problems on motion and Newton's laws.",
      },
      {
        id: "AB-A003",
        title: "Chemical Reactions Report",
        subject: "Chemistry",
        teacher: "Mrs. Hana Bekele",
        assignedDate: "2026-10-10",
        dueDate: "2026-10-22",
        status: "Submitted",
        score: null,
        total: 20,
        feedback: "",
        description: "Prepare a short report on common chemical reactions.",
      },
      {
        id: "AB-A004",
        title: "English Essay",
        subject: "English",
        teacher: "Mrs. Selam Tadesse",
        assignedDate: "2026-10-01",
        dueDate: "2026-10-09",
        status: "Overdue",
        score: null,
        total: 20,
        feedback: "Please contact the teacher if an extension is needed.",
        description: "Write an essay on the importance of education.",
      },
      {
        id: "AB-A005",
        title: "Cell Biology Review",
        subject: "Biology",
        teacher: "Mr. Samuel Bekele",
        assignedDate: "2026-10-02",
        dueDate: "2026-10-13",
        status: "Graded",
        score: 16,
        total: 20,
        feedback: "Review cell division and label diagrams more clearly.",
        description: "Answer the review questions about cell structures.",
      },
      {
        id: "AB-A006",
        title: "Reading Comprehension",
        subject: "English",
        teacher: "Mrs. Selam Tadesse",
        assignedDate: "2026-10-18",
        dueDate: "2026-10-27",
        status: "Pending",
        score: null,
        total: 10,
        feedback: "",
        description: "Read the assigned passage and answer the questions.",
      },
    ],
  },

  "GGSS.STU0002": {
    name: "Sara Kebede",
    studentId: "GGSS.STU0002",
    grade: "Grade 9",
    section: "Section B",
    assignments: [
      {
        id: "SA-A001",
        title: "Number Systems Exercises",
        subject: "Mathematics",
        teacher: "Mrs. Hana Bekele",
        assignedDate: "2026-10-15",
        dueDate: "2026-10-24",
        status: "Pending",
        score: null,
        total: 20,
        feedback: "",
        description: "Complete the exercises on rational and irrational numbers.",
      },
      {
        id: "SA-A002",
        title: "Grammar Practice",
        subject: "English",
        teacher: "Mr. Daniel Tesfaye",
        assignedDate: "2026-10-05",
        dueDate: "2026-10-14",
        status: "Graded",
        score: 18,
        total: 20,
        feedback: "Very good work. Keep checking punctuation.",
        description: "Complete the grammar and sentence correction activities.",
      },
      {
        id: "SA-A003",
        title: "Living Organisms",
        subject: "Biology",
        teacher: "Mrs. Selam Tadesse",
        assignedDate: "2026-10-09",
        dueDate: "2026-10-20",
        status: "Submitted",
        score: null,
        total: 20,
        feedback: "",
        description: "Describe the main characteristics of living organisms.",
      },
      {
        id: "SA-A004",
        title: "Simple Machines",
        subject: "Physics",
        teacher: "Mr. Samuel Bekele",
        assignedDate: "2026-10-01",
        dueDate: "2026-10-10",
        status: "Overdue",
        score: null,
        total: 15,
        feedback: "Ask the teacher about the missing submission.",
        description: "Draw and explain three examples of simple machines.",
      },
      {
        id: "SA-A005",
        title: "Matter and Materials",
        subject: "Chemistry",
        teacher: "Mrs. Hana Bekele",
        assignedDate: "2026-10-06",
        dueDate: "2026-10-16",
        status: "Graded",
        score: 14,
        total: 20,
        feedback: "Review the differences between elements and compounds.",
        description: "Answer questions about the properties of matter.",
      },
      {
        id: "SA-A006",
        title: "Reading and Vocabulary",
        subject: "English",
        teacher: "Mr. Daniel Tesfaye",
        assignedDate: "2026-10-18",
        dueDate: "2026-10-28",
        status: "Pending",
        score: null,
        total: 10,
        feedback: "",
        description: "Read the assigned passage and list new vocabulary.",
      },
    ],
  },
};

const statusStyles = {
  Pending: "bg-blue-50 text-blue-700 ring-blue-200",
  Submitted: "bg-violet-50 text-violet-700 ring-violet-200",
  Graded: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Overdue: "bg-rose-50 text-rose-700 ring-rose-200",
};

const statusIcons = {
  Pending: Clock3,
  Submitted: Send,
  Graded: CheckCircle2,
  Overdue: AlertCircle,
};

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function StatusBadge({ status }) {
  const Icon = statusIcons[status] || FileCheck2;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

function SummaryCard({ title, value, description, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
          <p className="mt-2 text-xs text-slate-500">{description}</p>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function AssignmentCard({ assignment }) {
  const graded = assignment.status === "Graded";
  const overdue = assignment.status === "Overdue";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
            <BookOpen size={21} />
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-slate-900">
              {assignment.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {assignment.subject}
            </p>
          </div>
        </div>

        <StatusBadge status={assignment.status} />
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {assignment.description}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
        <div className="flex items-start gap-2">
          <CalendarClock size={17} className="mt-0.5 shrink-0 text-slate-400" />
          <div>
            <p className="text-xs text-slate-500">Due date</p>
            <p
              className={`mt-1 text-sm font-semibold ${
                overdue ? "text-rose-700" : "text-slate-800"
              }`}
            >
              {formatDate(assignment.dueDate)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <GraduationCap size={17} className="mt-0.5 shrink-0 text-slate-400" />
          <div>
            <p className="text-xs text-slate-500">Teacher</p>
            <p className="mt-1 text-sm font-medium text-slate-800">
              {assignment.teacher}
            </p>
          </div>
        </div>
      </div>

      {graded && (
        <div className="mt-4 rounded-xl bg-emerald-50 p-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-emerald-800">
                Recorded mark
              </p>
              <p className="mt-1 text-lg font-bold text-emerald-900">
                {assignment.score}/{assignment.total}
                <span className="ml-2 text-sm font-medium">
                  ({Math.round((assignment.score / assignment.total) * 100)}%)
                </span>
              </p>
            </div>
            <CheckCircle2 size={21} className="text-emerald-700" />
          </div>
        </div>
      )}

      {assignment.feedback && (
        <div className="mt-3 rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-semibold text-slate-600">
            Teacher feedback
          </p>
          <p className="mt-1 text-sm leading-5 text-slate-700">
            {assignment.feedback}
          </p>
        </div>
      )}
    </article>
  );
}

export default function ParentAssignments() {
  const childIds = Object.keys(assignmentData);

  const [selectedChildId, setSelectedChildId] = useState(childIds[0]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const child = assignmentData[selectedChildId];
  const assignments = child.assignments;

  const summary = useMemo(() => {
    const graded = assignments.filter((item) => item.status === "Graded");
    const earned = graded.reduce((sum, item) => sum + item.score, 0);
    const possible = graded.reduce((sum, item) => sum + item.total, 0);

    return {
      total: assignments.length,
      pending: assignments.filter((item) => item.status === "Pending").length,
      submitted: assignments.filter((item) => item.status === "Submitted").length,
      graded: graded.length,
      overdue: assignments.filter((item) => item.status === "Overdue").length,
      average: possible ? Math.round((earned / possible) * 100) : null,
    };
  }, [assignments]);

  const subjects = useMemo(
    () => [...new Set(assignments.map((item) => item.subject))].sort(),
    [assignments]
  );

  const filteredAssignments = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return assignments.filter((item) => {
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesSubject =
        subjectFilter === "All" || item.subject === subjectFilter;

      const searchableText = [
        item.title,
        item.subject,
        item.teacher,
        item.description,
        item.status,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesStatus &&
        matchesSubject &&
        searchableText.includes(query)
      );
    });
  }, [assignments, statusFilter, subjectFilter, searchTerm]);

  const clearFilters = () => {
    setStatusFilter("All");
    setSubjectFilter("All");
    setSearchTerm("");
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Heading */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-700">
            <BookOpen size={18} />
            Parent Portal
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Assignments
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Track your child&apos;s assignments, deadlines, submissions,
            marks, and feedback from teachers.
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
                {assignmentData[id].name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Child overview */}
      <div className="flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
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
          <FileCheck2 size={17} />
          {summary.total} assignments in this sample
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total assignments"
          value={summary.total}
          description="All listed assignment records"
          icon={BookOpen}
          color="bg-blue-50 text-blue-700"
        />

        <SummaryCard
          title="Pending"
          value={summary.pending}
          description="Awaiting completion or submission"
          icon={Clock3}
          color="bg-amber-50 text-amber-700"
        />

        <SummaryCard
          title="Submitted"
          value={summary.submitted}
          description="Awaiting teacher review"
          icon={Send}
          color="bg-violet-50 text-violet-700"
        />

        <SummaryCard
          title="Graded"
          value={summary.graded}
          description={
            summary.average === null
              ? "No graded marks available"
              : `Graded work average: ${summary.average}%`
          }
          icon={CheckCircle2}
          color="bg-emerald-50 text-emerald-700"
        />
      </div>

      {/* Overdue alert */}
      {summary.overdue > 0 && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4">
          <div className="rounded-xl bg-white p-2 text-rose-700">
            <AlertCircle size={21} />
          </div>
          <div>
            <h2 className="font-bold text-rose-900">
              {summary.overdue} overdue{" "}
              {summary.overdue === 1 ? "assignment" : "assignments"}
            </h2>
            <p className="mt-1 text-sm leading-6 text-rose-800">
              Review the listed deadlines with your child. Contact the
              relevant teacher if clarification or an extension is needed.
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-500" />
          <h2 className="font-bold text-slate-900">Find assignments</h2>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <label className="relative block">
            <span className="sr-only">Search assignments</span>
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search title, subject, teacher..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">
            <FileCheck2 size={17} className="shrink-0 text-slate-400" />
            <span className="sr-only">Filter by status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full bg-transparent py-2.5 text-sm text-slate-700 outline-none"
            >
              <option value="All">All statuses</option>
              <option value="Pending">Pending</option>
              <option value="Submitted">Submitted</option>
              <option value="Graded">Graded</option>
              <option value="Overdue">Overdue</option>
            </select>
          </label>

          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">
            <BookOpen size={17} className="shrink-0 text-slate-400" />
            <span className="sr-only">Filter by subject</span>
            <select
              value={subjectFilter}
              onChange={(event) => setSubjectFilter(event.target.value)}
              className="w-full bg-transparent py-2.5 text-sm text-slate-700 outline-none"
            >
              <option value="All">All subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </label>
        </div>

        {(statusFilter !== "All" ||
          subjectFilter !== "All" ||
          searchTerm !== "") && (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-3 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            Clear filters
          </button>
        )}
      </section>

      {/* Assignment list */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Assignment List
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review assignment details and current status.
            </p>
          </div>

          <span className="text-sm text-slate-500">
            {filteredAssignments.length} of {assignments.length} records
          </span>
        </div>

        {filteredAssignments.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {filteredAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
            <Search size={30} className="mx-auto text-slate-300" />
            <h3 className="mt-3 font-bold text-slate-900">
              No assignments found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Try a different search term or change the filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Parent guidance */}
      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <ArrowUpRight
          size={19}
          className="mt-0.5 shrink-0 text-slate-500"
        />
        <p className="text-sm leading-6 text-slate-600">
          Use this page to discuss deadlines and teacher feedback with your
          child. Submission status, marks, and comments are illustrative
          records for frontend development, not official school data.
        </p>
      </div>
    </div>
  );
}