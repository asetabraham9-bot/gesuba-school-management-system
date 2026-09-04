import { useMemo, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Layers3,
  UsersRound,
} from "lucide-react";

const academicSummary = [
  {
    label: "Assigned Grades",
    value: "2",
    description: "Grade levels you teach",
    icon: GraduationCap,
  },
  {
    label: "Sections",
    value: "4",
    description: "Active class sections",
    icon: Layers3,
  },
  {
    label: "Subjects",
    value: "4",
    description: "Subjects assigned to you",
    icon: BookOpen,
  },
  {
    label: "Students",
    value: "128",
    description: "Students across your classes",
    icon: UsersRound,
  },
];

const teachingAssignments = [
  {
    id: 1,
    grade: "Grade 10",
    section: "A",
    subjects: ["Mathematics"],
    students: 34,
  },
  {
    id: 2,
    grade: "Grade 10",
    section: "B",
    subjects: ["Mathematics"],
    students: 34,
  },
  {
    id: 3,
    grade: "Grade 11",
    section: "A",
    subjects: ["Mathematics", "Physics"],
    students: 30,
  },
  {
    id: 4,
    grade: "Grade 11",
    section: "B",
    subjects: ["Mathematics", "Physics"],
    students: 30,
  },
];

const grades = ["All Grades", "Grade 10", "Grade 11"];

const TeacherAcademic = () => {
  const [selectedGrade, setSelectedGrade] = useState("All Grades");

  const filteredAssignments = useMemo(() => {
    if (selectedGrade === "All Grades") {
      return teachingAssignments;
    }

    return teachingAssignments.filter(
      (assignment) => assignment.grade === selectedGrade
    );
  }, [selectedGrade]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section>
        <p className="text-sm font-medium text-blue-600">
          Academic
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Academic Overview
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
          Review the grades, sections, subjects, and students
          assigned to your teaching responsibilities.
        </p>
      </section>

      {/* Summary Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {academicSummary.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.label}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {item.value}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                {item.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* Assigned Grades */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Assigned Grades
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Grade levels currently assigned to you.
          </p>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2">
          {["Grade 10", "Grade 11"].map((grade) => {
            const gradeAssignments = teachingAssignments.filter(
              (assignment) => assignment.grade === grade
            );

            const totalStudents = gradeAssignments.reduce(
              (total, assignment) => total + assignment.students,
              0
            );

            return (
              <button
                key={grade}
                type="button"
                onClick={() => setSelectedGrade(grade)}
                className={`rounded-xl border p-5 text-left transition ${
                  selectedGrade === grade
                    ? "border-blue-300 bg-blue-50"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-slate-900">
                      {grade}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {gradeAssignments.length} sections
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                    <GraduationCap size={20} />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
                  <UsersRound size={16} />
                  <span>{totalStudents} students</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Sections */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Assigned Sections
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              View the sections connected to your teaching assignments.
            </p>
          </div>

          <select
            value={selectedGrade}
            onChange={(event) => setSelectedGrade(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Grade
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Section
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Subjects
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Students
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredAssignments.map((assignment) => (
                <tr
                  key={assignment.id}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">
                    {assignment.grade}
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700">
                      Section {assignment.section}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {assignment.subjects.join(", ")}
                  </td>

                  <td className="px-5 py-4 text-right text-sm font-semibold text-slate-800">
                    {assignment.students}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 p-4 md:hidden">
          {filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="rounded-lg border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {assignment.grade}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Section {assignment.section}
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Layers3 size={18} />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-slate-400">
                    Subjects
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {assignment.subjects.join(", ")}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Students
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {assignment.students}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filteredAssignments.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-sm font-medium text-slate-700">
                No sections found
              </p>

              <p className="mt-1 text-xs text-slate-500">
                There are no teaching assignments for this grade.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TeacherAcademic;