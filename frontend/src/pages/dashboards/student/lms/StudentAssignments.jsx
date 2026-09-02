import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Search,
} from "lucide-react";
import { useState } from "react";

const assignments = [
  {
    id: 1,
    title: "Algebra Practice Exercise",
    subject: "Mathematics",
    dueDate: "September 12, 2026",
    status: "Pending",
    priority: "Normal",
  },
  {
    id: 2,
    title: "Cell Structure Assignment",
    subject: "Biology",
    dueDate: "September 14, 2026",
    status: "Pending",
    priority: "Normal",
  },
  {
    id: 3,
    title: "Programming Fundamentals",
    subject: "Computer Science",
    dueDate: "September 10, 2026",
    status: "Due Soon",
    priority: "High",
  },
  {
    id: 4,
    title: "English Grammar Exercise",
    subject: "English",
    dueDate: "September 18, 2026",
    status: "Submitted",
    priority: "Normal",
  },
];

const StudentAssignments = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssignments = assignments.filter((assignment) =>
    `${assignment.title} ${assignment.subject}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
            <ClipboardList size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Assignments
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View and complete assignments given by your teachers.
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
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Assignment List */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="divide-y divide-slate-100">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assignment) => (
              <article
                key={assignment.id}
                className="p-5 transition hover:bg-slate-50 sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex min-w-0 gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                      <ClipboardList size={20} />
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-semibold text-slate-900">
                        {assignment.title}
                      </h2>

                      <p className="mt-1 text-sm font-medium text-blue-800">
                        {assignment.subject}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          Due: {assignment.dueDate}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 size={14} />
                          Assignment
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {assignment.status === "Submitted" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                        <CheckCircle2 size={14} />
                        Submitted
                      </span>
                    ) : assignment.status === "Due Soon" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                        <AlertCircle size={14} />
                        Due Soon
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                        Pending
                      </span>
                    )}

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
                    >
                      View
                      <ArrowRight size={15} />
                    </button>
                  </div>

                </div>
              </article>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <ClipboardList
                size={30}
                className="mx-auto text-slate-400"
              />

              <h2 className="mt-4 font-semibold text-slate-800">
                No assignments found
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignments;
