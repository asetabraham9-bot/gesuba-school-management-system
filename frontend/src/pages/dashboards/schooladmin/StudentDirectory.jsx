import { useMemo, useState } from "react";
import {
  Search,
  Users,
  UserRound,
  Eye,
  Pencil,
  Filter,
  RotateCcw,
  X,
  ChevronDown,
  GraduationCap,
} from "lucide-react";

const initialStudents = [
  {
    id: "GGSS.STU0001",
    fullName: "Abebe Kebede",
    gender: "Male",
    grade: "Grade 9",
    section: "A",
    status: "Active",
    username: "GGSS.STU0001",
    parentName: "Kebede Abebe",
    phone: "0912345678",
  },
  {
    id: "GGSS.STU0002",
    fullName: "Hana Tesfaye",
    gender: "Female",
    grade: "Grade 10",
    section: "B",
    status: "Active",
    username: "GGSS.STU0002",
    parentName: "Tesfaye Bekele",
    phone: "0923456789",
  },
  {
    id: "GGSS.STU0003",
    fullName: "Dawit Alemu",
    gender: "Male",
    grade: "Grade 12",
    section: "A",
    status: "Active",
    username: "GGSS.STU0003",
    parentName: "Alemu Girma",
    phone: "0934567890",
  },
  {
    id: "GGSS.STU0004",
    fullName: "Marta Worku",
    gender: "Female",
    grade: "Grade 11",
    section: "C",
    status: "Inactive",
    username: "GGSS.STU0004",
    parentName: "Worku Tadesse",
    phone: "0945678901",
  },
  {
    id: "GGSS.STU0005",
    fullName: "Samuel Bekele",
    gender: "Male",
    grade: "Grade 9",
    section: "B",
    status: "Active",
    username: "GGSS.STU0005",
    parentName: "Bekele Samuel",
    phone: "0956789012",
  },
  {
    id: "GGSS.STU0006",
    fullName: "Rahel Tadesse",
    gender: "Female",
    grade: "Grade 10",
    section: "A",
    status: "Active",
    username: "GGSS.STU0006",
    parentName: "Tadesse Haile",
    phone: "0967890123",
  },
  {
    id: "GGSS.STU0007",
    fullName: "Biruk Girma",
    gender: "Male",
    grade: "Grade 12",
    section: "B",
    status: "Active",
    username: "GGSS.STU0007",
    parentName: "Girma Biruk",
    phone: "0978901234",
  },
  {
    id: "GGSS.STU0008",
    fullName: "Selamawit Desta",
    gender: "Female",
    grade: "Grade 11",
    section: "A",
    status: "Active",
    username: "GGSS.STU0008",
    parentName: "Desta Fikru",
    phone: "0989012345",
  },
];

const grades = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const sections = ["A", "B", "C", "D"];

const StudentDirectory = () => {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalMode, setModalMode] = useState("");

  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        !query ||
        student.fullName.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query) ||
        student.username.toLowerCase().includes(query);

      const matchesGrade =
        !gradeFilter || student.grade === gradeFilter;

      const matchesSection =
        !sectionFilter || student.section === sectionFilter;

      const matchesStatus =
        !statusFilter || student.status === statusFilter;

      return (
        matchesSearch &&
        matchesGrade &&
        matchesSection &&
        matchesStatus
      );
    });
  }, [students, searchTerm, gradeFilter, sectionFilter, statusFilter]);

  const activeCount = students.filter(
    (student) => student.status === "Active",
  ).length;

  const resetFilters = () => {
    setSearchTerm("");
    setGradeFilter("");
    setSectionFilter("");
    setStatusFilter("");
  };

  const openStudentModal = (student, mode) => {
    setSelectedStudent(student);
    setModalMode(mode);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setModalMode("");
  };

  const saveStudent = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const updatedStudent = {
      ...selectedStudent,
      fullName: formData.get("fullName").trim(),
      grade: formData.get("grade"),
      section: formData.get("section"),
      status: formData.get("status"),
    };

    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student,
      ),
    );

    closeModal();
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            School Administration
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Student Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View, search, and manage student records across the school.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3">
          <GraduationCap size={20} className="text-blue-600" />
          <div>
            <p className="text-xs text-slate-500">Academic Year</p>
            <p className="text-sm font-semibold text-slate-800">
              2026 / 2027
            </p>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Total Students"
          value={students.length}
          icon={Users}
          description="Sample student records"
        />
        <SummaryCard
          label="Active Students"
          value={activeCount}
          icon={UserRound}
          description="Currently marked active"
        />
        <SummaryCard
          label="Filtered Results"
          value={filteredStudents.length}
          icon={Filter}
          description="Matching your filters"
        />
      </section>

      {/* Directory panel */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Student Directory
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Search by student name, student ID, or username.
              </p>
            </div>

            <span className="mt-2 self-start rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 sm:mt-0">
              {filteredStudents.length} records
            </span>
          </div>

          {/* Search and filters */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <div className="relative sm:col-span-2 xl:col-span-2">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search students..."
                aria-label="Search students"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <FilterSelect
              label="Grade"
              value={gradeFilter}
              onChange={setGradeFilter}
              options={grades.map((grade) => ({
                label: grade,
                value: grade,
              }))}
            />

            <FilterSelect
              label="Section"
              value={sectionFilter}
              onChange={setSectionFilter}
              options={sections.map((section) => ({
                label: `Section ${section}`,
                value: section,
              }))}
            />

            <FilterSelect
              label="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ]}
            />
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <RotateCcw size={15} />
              Reset filters
            </button>
          </div>
        </div>

        {/* Student table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-100">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Student
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Student ID
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Grade & Section
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Gender
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="transition hover:bg-slate-50/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                        {student.fullName
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {student.fullName}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {student.username}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {student.id}
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-800">
                      {student.grade}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Section {student.section}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {student.gender}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={student.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openStudentModal(student, "view")}
                        title={`View ${student.fullName}`}
                        aria-label={`View ${student.fullName}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Eye size={15} />
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => openStudentModal(student, "edit")}
                        title={`Edit ${student.fullName}`}
                        aria-label={`Edit ${student.fullName}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                      <Search size={21} />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-800">
                      No students found
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try another search term or reset your filters.
                    </p>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-3 text-sm font-semibold text-blue-700 hover:text-blue-800"
                    >
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing {filteredStudents.length} of {students.length} sample
            students
          </p>
          <p>Demonstration data only</p>
        </div>
      </section>

      {/* View / Edit modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="student-modal-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-xl"
          >
            <div className="flex items-start justify-between border-b border-slate-100 p-5">
              <div>
                <h2
                  id="student-modal-title"
                  className="text-lg font-semibold text-slate-900"
                >
                  {modalMode === "view"
                    ? "Student Details"
                    : "Edit Student Record"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedStudent.id}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            {modalMode === "view" ? (
              <div className="space-y-4 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-700">
                    {selectedStudent.fullName
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {selectedStudent.fullName}
                    </p>
                    <p className="text-sm text-slate-500">
                      {selectedStudent.username}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Detail label="Grade" value={selectedStudent.grade} />
                  <Detail
                    label="Section"
                    value={`Section ${selectedStudent.section}`}
                  />
                  <Detail label="Gender" value={selectedStudent.gender} />
                  <Detail label="Status" value={selectedStudent.status} />
                  <Detail
                    label="Parent / Guardian"
                    value={selectedStudent.parentName}
                  />
                  <Detail
                    label="Parent Contact"
                    value={selectedStudent.phone}
                  />
                </div>

                <div className="flex justify-end border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={saveStudent} className="space-y-4 p-5">
                <p className="text-sm text-slate-500">
                  Changes are stored in this page's local state only. They
                  will not be saved to a database.
                </p>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Full name
                  </span>
                  <input
                    required
                    name="fullName"
                    defaultValue={selectedStudent.fullName}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">
                      Grade
                    </span>
                    <select
                      name="grade"
                      defaultValue={selectedStudent.grade}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    >
                      {grades.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">
                      Section
                    </span>
                    <select
                      name="section"
                      defaultValue={selectedStudent.section}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    >
                      {sections.map((section) => (
                        <option key={section} value={section}>
                          Section {section}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">
                    Status
                  </span>
                  <select
                    name="status"
                    defaultValue={selectedStudent.status}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </label>

                <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const SummaryCard = ({ label, value, icon: Icon, description }) => (
  <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
      </div>
      <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
        <Icon size={21} />
      </div>
    </div>
    <p className="mt-3 text-xs text-slate-500">{description}</p>
  </article>
);

const FilterSelect = ({ label, value, onChange, options }) => (
  <div className="relative">
    <select
      aria-label={`Filter by ${label.toLowerCase()}`}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    >
      <option value="">All {label}s</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDown
      size={15}
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
    />
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
      status === "Active"
        ? "bg-emerald-50 text-emerald-700"
        : "bg-slate-100 text-slate-600"
    }`}
  >
    {status}
  </span>
);

const Detail = ({ label, value }) => (
  <div className="rounded-xl bg-slate-50 p-3">
    <p className="text-xs text-slate-500">{label}</p>
    <p className="mt-1 break-words text-sm font-medium text-slate-800">
      {value}
    </p>
  </div>
);

export default StudentDirectory;