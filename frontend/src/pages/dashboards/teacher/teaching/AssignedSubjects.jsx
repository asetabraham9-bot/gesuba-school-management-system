import { useMemo, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Layers3,
  Search,
  UsersRound,
} from "lucide-react";

const subjects = [
  {
    id: 1,
    name: "Mathematics",
    code: "MATH-10",
    grades: ["Grade 10"],
    sections: ["A", "B"],
    students: 68,
    status: "Active",
  },
  {
    id: 2,
    name: "Mathematics",
    code: "MATH-11",
    grades: ["Grade 11"],
    sections: ["A", "B"],
    students: 60,
    status: "Active",
  },
  {
    id: 3,
    name: "Physics",
    code: "PHY-11",
    grades: ["Grade 11"],
    sections: ["A", "B"],
    students: 60,
    status: "Active",
  },
  {
    id: 4,
    name: "General Physics",
    code: "GP-11",
    grades: ["Grade 11"],
    sections: ["A"],
    students: 30,
    status: "Active",
  },
];

const subjectFilters = ["All Subjects", "Mathematics", "Physics", "General Physics"];

const AssignedSubjects = () => {
  const [selectedSubject, setSelectedSubject] =
    useState("All Subjects");

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesSubject =
        selectedSubject === "All Subjects" ||
        subject.name === selectedSubject;

      const search = searchTerm.trim().toLowerCase();

      const matchesSearch =
        !search ||
        subject.name.toLowerCase().includes(search) ||
        subject.code.toLowerCase().includes(search);

      return matchesSubject && matchesSearch;
    });
  }, [selectedSubject, searchTerm]);

  const totalStudents = subjects.reduce(
    (total, subject) => total + subject.students,
    0
  );

  const uniqueSubjectNames = new Set(
    subjects.map((subject) => subject.name)
  ).size;

  const totalSections = subjects.reduce(
    (total, subject) => total + subject.sections.length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section>
        <p className="text-sm font-medium text-blue-600">
          Academic
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          My Subjects
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
          View the subjects you teach and the grades, sections,
          and students associated with each subject.
        </p>
      </section>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Subjects
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {uniqueSubjectNames}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <BookOpen size={20} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Unique subjects you teach
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Class Assignments
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {subjects.length}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <GraduationCap size={20} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Subject assignments across grades
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Sections
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {totalSections}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Layers3 size={20} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Section assignments
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Students
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {totalStudents}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <UsersRound size={20} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Students across assignments
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {subjectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedSubject(filter)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  selectedSubject === filter
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search subjects..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      </section>

      {/* Subject List */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Teaching Subjects
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Your current subject assignments.
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Subject
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Grade
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Sections
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Students
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredSubjects.map((subject) => (
                <tr
                  key={subject.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {subject.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {subject.code}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {subject.grades.join(", ")}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {subject.sections.join(", ")}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                    {subject.students}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                      {subject.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredSubjects.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center"
                  >
                    <p className="text-sm font-medium text-slate-700">
                      No subjects found
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Try another subject or search term.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="space-y-3 p-4 md:hidden">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.id}
              className="rounded-lg border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {subject.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {subject.code}
                  </p>
                </div>

                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                  {subject.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400">
                    Grade
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {subject.grades.join(", ")}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Sections
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {subject.sections.join(", ")}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Students
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {subject.students}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Subject code
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {subject.code}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filteredSubjects.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-sm font-medium text-slate-700">
                No subjects found
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Try another subject or search term.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AssignedSubjects;