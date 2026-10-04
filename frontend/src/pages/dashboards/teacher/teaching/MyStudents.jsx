import { useMemo, useState } from "react";
import {
  Search,
  UsersRound,
  UserRound,
  GraduationCap,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/*
 * ============================================================
 * MOCK DATA
 * ============================================================
 *
 * Temporary frontend data.
 *
 * Later this section will be replaced by API data from the
 * teacher/student management backend.
 */

const studentsData = [
  {
    id: "GGSS.STU0001",
    fullName: "Abebe Kebede",
    gender: "Male",
    grade: "Grade 9",
    section: "A",
    status: "Active",
    email: "abebe@example.com",
  },
  {
    id: "GGSS.STU0002",
    fullName: "Hanna Tesfaye",
    gender: "Female",
    grade: "Grade 9",
    section: "A",
    status: "Active",
    email: "hanna@example.com",
  },
  {
    id: "GGSS.STU0003",
    fullName: "Dawit Alemu",
    gender: "Male",
    grade: "Grade 9",
    section: "B",
    status: "Active",
    email: "dawit@example.com",
  },
  {
    id: "GGSS.STU0004",
    fullName: "Meron Bekele",
    gender: "Female",
    grade: "Grade 10",
    section: "A",
    status: "Active",
    email: "meron@example.com",
  },
  {
    id: "GGSS.STU0005",
    fullName: "Samuel Girma",
    gender: "Male",
    grade: "Grade 10",
    section: "A",
    status: "Active",
    email: "samuel@example.com",
  },
  {
    id: "GGSS.STU0006",
    fullName: "Rahel Tadesse",
    gender: "Female",
    grade: "Grade 10",
    section: "B",
    status: "Active",
    email: "rahel@example.com",
  },
  {
    id: "GGSS.STU0007",
    fullName: "Yonas Worku",
    gender: "Male",
    grade: "Grade 11",
    section: "A",
    status: "Active",
    email: "yonas@example.com",
  },
  {
    id: "GGSS.STU0008",
    fullName: "Selamawit Getachew",
    gender: "Female",
    grade: "Grade 11",
    section: "A",
    status: "Inactive",
    email: "selamawit@example.com",
  },
  {
    id: "GGSS.STU0009",
    fullName: "Nahom Desta",
    gender: "Male",
    grade: "Grade 11",
    section: "B",
    status: "Active",
    email: "nahom@example.com",
  },
  {
    id: "GGSS.STU0010",
    fullName: "Bethel Assefa",
    gender: "Female",
    grade: "Grade 12",
    section: "A",
    status: "Active",
    email: "bethel@example.com",
  },
];

/*
 * ============================================================
 * FILTER OPTIONS
 * ============================================================
 */

const gradeOptions = [
  "All Grades",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

const sectionOptions = [
  "All Sections",
  "A",
  "B",
  "C",
];

/*
 * ============================================================
 * COMPONENT
 * ============================================================
 */

const MyStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [selectedSection, setSelectedSection] =
    useState("All Sections");

  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 6;

  /*
   * ============================================================
   * FILTER STUDENTS
   * ============================================================
   */

  const filteredStudents = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    return studentsData.filter((student) => {
      const matchesSearch =
        !normalizedSearch ||
        student.fullName
          .toLowerCase()
          .includes(normalizedSearch) ||
        student.id
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesGrade =
        selectedGrade === "All Grades" ||
        student.grade === selectedGrade;

      const matchesSection =
        selectedSection === "All Sections" ||
        student.section === selectedSection;

      return (
        matchesSearch &&
        matchesGrade &&
        matchesSection
      );
    });
  }, [
    searchTerm,
    selectedGrade,
    selectedSection,
  ]);

  /*
   * ============================================================
   * PAGINATION
   * ============================================================
   */

  const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
  );

  const safeCurrentPage =
    totalPages === 0
      ? 1
      : Math.min(currentPage, totalPages);

  const startIndex =
    (safeCurrentPage - 1) * studentsPerPage;

  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  /*
   * ============================================================
   * HANDLERS
   * ============================================================
   */

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
    setCurrentPage(1);
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((previous) =>
      Math.max(previous - 1, 1)
    );
  };

  const handleNextPage = () => {
    setCurrentPage((previous) =>
      Math.min(previous + 1, totalPages)
    );
  };

  /*
   * ============================================================
   * VIEW STUDENT
   * ============================================================
   *
   * Temporary action.
   *
   * Later this will navigate to a dedicated student profile
   * or student-details page.
   */

  const handleViewStudent = (student) => {
    console.log("View student:", student);
  };

  /*
   * ============================================================
   * SUMMARY DATA
   * ============================================================
   */

  const totalStudents = studentsData.length;

  const activeStudents = studentsData.filter(
    (student) => student.status === "Active"
  ).length;

  const gradeCount = new Set(
    studentsData.map((student) => student.grade)
  ).size;

  return (
    <div className="space-y-6">
      {/* ======================================================
          PAGE HEADER
      ======================================================= */}

      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <UsersRound size={17} />

            <span>Teaching</span>

            <span>/</span>

            <span className="text-slate-700">
              My Students
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Students
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500 sm:text-base">
            View and manage the students assigned to your
            teaching responsibilities.
          </p>
        </div>
      </section>

      {/* ======================================================
          SUMMARY CARDS
      ======================================================= */}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Students */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Students
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalStudents}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <UsersRound size={20} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Students currently visible in your teaching scope
          </p>
        </div>

        {/* Active Students */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Students
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {activeStudents}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <UserRound size={20} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Students with active school accounts
          </p>
        </div>

        {/* Grades */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Assigned Grades
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {gradeCount}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
              <GraduationCap size={20} />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Grades containing your assigned students
          </p>
        </div>
      </section>

      {/* ======================================================
          STUDENT MANAGEMENT CARD
      ======================================================= */}

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}

        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Student List
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search and filter students by their academic
                assignment.
              </p>
            </div>

            {/* ==================================================
                FILTER BAR
            =================================================== */}

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              {/* Search */}

              <div className="relative xl:col-span-2">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by student name or ID..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Grade */}

              <div className="relative">
                <GraduationCap
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={selectedGrade}
                  onChange={handleGradeChange}
                  className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-10 pr-8 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {gradeOptions.map((grade) => (
                    <option
                      key={grade}
                      value={grade}
                    >
                      {grade}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section */}

              <div className="relative">
                <Filter
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={selectedSection}
                  onChange={handleSectionChange}
                  className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-10 pr-8 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {sectionOptions.map((section) => (
                    <option
                      key={section}
                      value={section}
                    >
                      {section}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            RESULT SUMMARY
        ===================================================== */}

        <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-3 sm:px-5">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {currentStudents.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredStudents.length}
            </span>{" "}
            students
          </p>
        </div>

        {/* ====================================================
            DESKTOP TABLE
        ===================================================== */}

        {currentStudents.length > 0 ? (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-left">
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Student
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Student ID
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Grade
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Section
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
                  {currentStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* Student */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                            {student.fullName
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {student.fullName}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                              {student.gender}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Student ID */}

                      <td className="px-5 py-4">
                        <span className="font-mono text-xs text-slate-600">
                          {student.id}
                        </span>
                      </td>

                      {/* Grade */}

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {student.grade}
                      </td>

                      {/* Section */}

                      <td className="px-5 py-4 text-sm text-slate-600">
                        Section {student.section}
                      </td>

                      {/* Status */}

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            student.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>

                      {/* Action */}

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            handleViewStudent(student)
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Eye size={15} />

                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ==================================================
                MOBILE STUDENT CARDS
            =================================================== */}

            <div className="divide-y divide-slate-100 md:hidden">
              {currentStudents.map((student) => (
                <div
                  key={student.id}
                  className="p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                        {student.fullName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {student.fullName}
                        </p>

                        <p className="font-mono text-xs text-slate-500">
                          {student.id}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                        student.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {student.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3">
                    <div>
                      <p className="text-xs text-slate-400">
                        Grade
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {student.grade}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Section
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {student.section}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-xs text-slate-400">
                        Email
                      </p>

                      <p className="mt-1 truncate text-sm text-slate-700">
                        {student.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleViewStudent(student)
                    }
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Eye size={16} />

                    View Student
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* ==================================================
             EMPTY STATE
          =================================================== */

          <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <UsersRound size={25} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-slate-800">
              No students found
            </h3>

            <p className="mt-1 max-w-md text-sm text-slate-500">
              No students match the current search and filter
              criteria.
            </p>
          </div>
        )}

        {/* ====================================================
            PAGINATION
        ===================================================== */}

        {filteredStudents.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-xs text-slate-500">
              Page{" "}
              <span className="font-semibold text-slate-700">
                {safeCurrentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {totalPages}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={safeCurrentPage === 1}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={15} />

                Previous
              </button>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={
                  safeCurrentPage === totalPages
                }
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next

                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyStudents;
