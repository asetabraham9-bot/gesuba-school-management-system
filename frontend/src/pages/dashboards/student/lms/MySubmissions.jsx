import {
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  Search,
} from "lucide-react";
import { useState } from "react";

const submissions = [
  {
    id: 1,
    assignment: "English Grammar Exercise",
    subject: "English",
    submittedAt: "September 5, 2026",
    status: "Submitted",
    grade: "18 / 20",
    feedback: "Good work. Keep improving your grammar accuracy.",
  },
  {
    id: 2,
    assignment: "Introduction to Programming",
    subject: "Computer Science",
    submittedAt: "September 4, 2026",
    status: "Graded",
    grade: "17 / 20",
    feedback: "Good understanding of the programming fundamentals.",
  },
  {
    id: 3,
    assignment: "Mathematics Practice",
    subject: "Mathematics",
    submittedAt: "September 3, 2026",
    status: "Under Review",
    grade: null,
    feedback: null,
  },
];

const MySubmissions = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubmissions = submissions.filter((submission) =>
    `${submission.assignment} ${submission.subject}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
            <ClipboardCheck size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              My Submissions
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review your submitted assignments, grades, and feedback.
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Submissions
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            3
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Graded
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            2
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Under Review
          </p>

          <p className="mt-2 text-2xl font-bold text-amber-600">
            1
          </p>
        </div>
      </div>

      {/* Submissions */}
      <div className="space-y-4">
        {filteredSubmissions.length > 0 ? (
          filteredSubmissions.map((submission) => (
            <article
              key={submission.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                    <FileText size={20} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {submission.assignment}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-blue-800">
                      {submission.subject}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {submission.submittedAt}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 size={14} />
                        Assignment Submission
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  {submission.status === "Graded" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                      <CheckCircle2 size={14} />
                      Graded
                    </span>
                  ) : submission.status === "Under Review" ? (
                    <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                      Under Review
                    </span>
                  ) : (
                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                      Submitted
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Grade
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {submission.grade || "Not graded yet"}
                    </p>
                  </div>

                  {submission.feedback && (
                    <div className="max-w-xl sm:text-right">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Teacher Feedback
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {submission.feedback}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <ClipboardCheck
              size={30}
              className="mx-auto text-slate-400"
            />

            <h2 className="mt-4 font-semibold text-slate-800">
              No submissions found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubmissions;
