import { useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Eye,
  FileText,
  Paperclip,
  Pencil,
  Plus,
  Save,
  Search,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";

const initialAssignments = [
  {
    id: "ASM001",
    title: "Algebra Practice Assignment",
    subject: "Mathematics",
    grade: "Grade 9",
    section: "A",
    dueDate: "2026-09-12",
    status: "Active",
    submissions: 24,
    totalStudents: 32,
    maxMarks: 20,
    description:
      "Solve the assigned algebra problems and show all calculation steps.",
    attachment: null,
  },
  {
    id: "ASM002",
    title: "Cell Structure Worksheet",
    subject: "Biology",
    grade: "Grade 10",
    section: "A",
    dueDate: "2026-09-14",
    status: "Active",
    submissions: 18,
    totalStudents: 30,
    maxMarks: 15,
    description:
      "Complete the worksheet about cell structures and their functions.",
    attachment: null,
  },
  {
    id: "ASM003",
    title: "Motion Problems",
    subject: "Physics",
    grade: "Grade 11",
    section: "B",
    dueDate: "2026-09-16",
    status: "Draft",
    submissions: 0,
    totalStudents: 28,
    maxMarks: 25,
    description:
      "Solve the selected motion problems using the appropriate formulas.",
    attachment: null,
  },
  {
    id: "ASM004",
    title: "Chemical Reactions Exercise",
    subject: "Chemistry",
    grade: "Grade 10",
    section: "B",
    dueDate: "2026-09-05",
    status: "Closed",
    submissions: 27,
    totalStudents: 29,
    maxMarks: 20,
    description:
      "Complete the chemical reaction exercises and balance the equations.",
    attachment: null,
  },
];

const emptyAssignmentForm = {
  title: "",
  description: "",
  subject: "",
  grade: "",
  section: "",
  dueDate: "",
  maxMarks: "",
  status: "Draft",
  attachment: null,
};

const TeacherAssignments = () => {
  const [assignments, setAssignments] = useState(initialAssignments);

  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [assignmentForm, setAssignmentForm] =
    useState(emptyAssignmentForm);

  const [formErrors, setFormErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjects = useMemo(() => {
    return [
      "All",
      ...new Set(assignments.map((assignment) => assignment.subject)),
    ];
  }, [assignments]);

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        assignment.title.toLowerCase().includes(search) ||
        assignment.subject.toLowerCase().includes(search) ||
        assignment.grade.toLowerCase().includes(search) ||
        assignment.section.toLowerCase().includes(search);

      const matchesSubject =
        subjectFilter === "All" ||
        assignment.subject === subjectFilter;

      const matchesStatus =
        statusFilter === "All" ||
        assignment.status === statusFilter;

      return (
        matchesSearch &&
        matchesSubject &&
        matchesStatus
      );
    });
  }, [
    assignments,
    searchTerm,
    subjectFilter,
    statusFilter,
  ]);

  const totalAssignments = assignments.length;

  const activeAssignments = assignments.filter(
    (assignment) => assignment.status === "Active"
  ).length;

  const draftAssignments = assignments.filter(
    (assignment) => assignment.status === "Draft"
  ).length;

  const closedAssignments = assignments.filter(
    (assignment) => assignment.status === "Closed"
  ).length;

  const getSubmissionPercentage = (assignment) => {
    if (!assignment.totalStudents) {
      return 0;
    }

    return Math.round(
      (assignment.submissions / assignment.totalStudents) * 100
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "-";
    }

    return new Date(`${dateString}T00:00:00`).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "Draft":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "Closed":
        return "bg-slate-100 text-slate-600 border-slate-200";

      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const handleOpenForm = () => {
    setAssignmentForm(emptyAssignmentForm);
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleCancelForm = () => {
    if (isSubmitting) {
      return;
    }

    setAssignmentForm(emptyAssignmentForm);
    setFormErrors({});
    setIsFormOpen(false);
  };

  const handleFormChange = (field, value) => {
    setAssignmentForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (formErrors[field]) {
      setFormErrors((previous) => ({
        ...previous,
        [field]: "",
      }));
    }
  };

  const handleAttachmentChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setAssignmentForm((previous) => ({
      ...previous,
      attachment: file,
    }));
  };

  const handleRemoveAttachment = () => {
    setAssignmentForm((previous) => ({
      ...previous,
      attachment: null,
    }));
  };

  const validateAssignmentForm = () => {
    const errors = {};

    if (!assignmentForm.title.trim()) {
      errors.title = "Assignment title is required.";
    }

    if (!assignmentForm.description.trim()) {
      errors.description =
        "Assignment description is required.";
    }

    if (!assignmentForm.subject) {
      errors.subject = "Please select a subject.";
    }

    if (!assignmentForm.grade) {
      errors.grade = "Please select a grade.";
    }

    if (!assignmentForm.section) {
      errors.section = "Please select a section.";
    }

    if (!assignmentForm.dueDate) {
      errors.dueDate = "Due date is required.";
    }

    if (!assignmentForm.maxMarks) {
      errors.maxMarks =
        "Maximum marks are required.";
    } else if (Number(assignmentForm.maxMarks) <= 0) {
      errors.maxMarks =
        "Maximum marks must be greater than 0.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmitAssignment = (event) => {
    event.preventDefault();

    const isValid = validateAssignmentForm();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    const newAssignment = {
      id: `ASM${String(assignments.length + 1).padStart(
        3,
        "0"
      )}`,
      title: assignmentForm.title.trim(),
      subject: assignmentForm.subject,
      grade: assignmentForm.grade,
      section: assignmentForm.section,
      dueDate: assignmentForm.dueDate,
      status: assignmentForm.status,
      submissions: 0,
      totalStudents: 0,
      maxMarks: Number(assignmentForm.maxMarks),
      description: assignmentForm.description.trim(),
      attachment: assignmentForm.attachment,
    };

    setAssignments((previous) => [
      newAssignment,
      ...previous,
    ]);

    setAssignmentForm(emptyAssignmentForm);
    setFormErrors({});
    setIsFormOpen(false);
    setIsSubmitting(false);
  };

  const handleViewAssignment = (assignment) => {
    console.log("View assignment:", assignment);
  };

  const handleEditAssignment = (assignment) => {
    console.log("Edit assignment:", assignment);
  };

  const handleManageSubmissions = (assignment) => {
    console.log(
      "Manage submissions:",
      assignment
    );
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <ClipboardList size={20} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Assignments
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create, manage, and monitor assignments for your students.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenForm}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
        >
          <Plus size={17} />
          Add Assignment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Assignments
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalAssignments}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <ClipboardList size={19} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Active
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {activeAssignments}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 size={19} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Drafts
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {draftAssignments}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Save size={19} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Closed
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {closedAssignments}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <FileText size={19} />
            </div>
          </div>
        </div>
      </div>

      {/* Create Assignment Form */}
      {isFormOpen && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Form Header */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <ClipboardList size={18} />
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Create Assignment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create and publish an assignment for your students.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCancelForm}
              disabled={isSubmitting}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Close assignment form"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmitAssignment}
            className="p-5 sm:p-6"
          >
            <div className="space-y-8">

              {/* Basic Information */}
              <section>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Basic Information
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Provide the main details students will see.
                  </p>
                </div>

                <div className="space-y-5">

                  {/* Title */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Assignment Title
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      value={assignmentForm.title}
                      onChange={(event) =>
                        handleFormChange(
                          "title",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Algebra Practice Assignment"
                      className={`w-full rounded-lg border px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                        formErrors.title
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    />

                    {formErrors.title && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle size={13} />
                        {formErrors.title}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                      <label className="text-sm font-medium text-slate-700">
                        Instructions / Description
                        <span className="ml-1 text-red-500">
                          *
                        </span>
                      </label>

                      <span className="text-xs text-slate-400">
                        {assignmentForm.description.length}/1000
                      </span>
                    </div>

                    <textarea
                      rows={5}
                      maxLength={1000}
                      value={assignmentForm.description}
                      onChange={(event) =>
                        handleFormChange(
                          "description",
                          event.target.value
                        )
                      }
                      placeholder="Explain what students need to complete..."
                      className={`w-full resize-y rounded-lg border px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                        formErrors.description
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    />

                    {formErrors.description && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle size={13} />
                        {formErrors.description}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Class & Subject */}
              <section className="border-t border-slate-100 pt-7">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Class & Subject
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Select the class this assignment belongs to.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                  {/* Subject */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Subject
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <select
                      value={assignmentForm.subject}
                      onChange={(event) =>
                        handleFormChange(
                          "subject",
                          event.target.value
                        )
                      }
                      className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 ${
                        formErrors.subject
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    >
                      <option value="">
                        Select subject
                      </option>
                      <option value="Mathematics">
                        Mathematics
                      </option>
                      <option value="Biology">
                        Biology
                      </option>
                      <option value="Physics">
                        Physics
                      </option>
                      <option value="Chemistry">
                        Chemistry
                      </option>
                      <option value="English">
                        English
                      </option>
                    </select>

                    {formErrors.subject && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle size={13} />
                        {formErrors.subject}
                      </p>
                    )}
                  </div>

                  {/* Grade */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Grade
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <select
                      value={assignmentForm.grade}
                      onChange={(event) =>
                        handleFormChange(
                          "grade",
                          event.target.value
                        )
                      }
                      className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 ${
                        formErrors.grade
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    >
                      <option value="">
                        Select grade
                      </option>
                      <option value="Grade 9">
                        Grade 9
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

                    {formErrors.grade && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle size={13} />
                        {formErrors.grade}
                      </p>
                    )}
                  </div>

                  {/* Section */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Section
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <select
                      value={assignmentForm.section}
                      onChange={(event) =>
                        handleFormChange(
                          "section",
                          event.target.value
                        )
                      }
                      className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 ${
                        formErrors.section
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    >
                      <option value="">
                        Select section
                      </option>
                      <option value="A">
                        Section A
                      </option>
                      <option value="B">
                        Section B
                      </option>
                      <option value="C">
                        Section C
                      </option>
                    </select>

                    {formErrors.section && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle size={13} />
                        {formErrors.section}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Submission Settings */}
              <section className="border-t border-slate-100 pt-7">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Submission Settings
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Configure when and how the assignment should be submitted.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Due Date */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Due Date
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={17}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="date"
                        value={assignmentForm.dueDate}
                        onChange={(event) =>
                          handleFormChange(
                            "dueDate",
                            event.target.value
                          )
                        }
                        className={`w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none focus:ring-2 ${
                          formErrors.dueDate
                            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                            : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                        }`}
                      />
                    </div>

                    {formErrors.dueDate && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle size={13} />
                        {formErrors.dueDate}
                      </p>
                    )}
                  </div>

                  {/* Maximum Marks */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Maximum Marks
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={assignmentForm.maxMarks}
                      onChange={(event) =>
                        handleFormChange(
                          "maxMarks",
                          event.target.value
                        )
                      }
                      placeholder="e.g. 20"
                      className={`w-full rounded-lg border px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 ${
                        formErrors.maxMarks
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    />

                    {formErrors.maxMarks && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle size={13} />
                        {formErrors.maxMarks}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Attachment */}
              <section className="border-t border-slate-100 pt-7">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Attachment
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Optionally attach instructions, worksheets, or supporting files.
                  </p>
                </div>

                {!assignmentForm.attachment && (
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50/40">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm">
                      <Upload size={20} />
                    </div>

                    <p className="text-sm font-medium text-slate-700">
                      Click to upload a file
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, JPG, PNG
                    </p>

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={handleAttachmentChange}
                    />
                  </label>
                )}

                {assignmentForm.attachment && (
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                        <Paperclip size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-700">
                          {assignmentForm.attachment.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {(
                            assignmentForm.attachment.size /
                            1024 /
                            1024
                          ).toFixed(2)}{" "}
                          MB
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveAttachment}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                      aria-label="Remove attachment"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </section>

              {/* Status */}
              <section className="border-t border-slate-100 pt-7">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Assignment Status
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Choose whether to keep the assignment as a draft or publish it.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">

                  {/* Draft */}
                  <button
                    type="button"
                    onClick={() =>
                      handleFormChange(
                        "status",
                        "Draft"
                      )
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      assignmentForm.status === "Draft"
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Save
                        size={18}
                        className="text-slate-600"
                      />

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Save as Draft
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Finish editing and publish later.
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Active */}
                  <button
                    type="button"
                    onClick={() =>
                      handleFormChange(
                        "status",
                        "Active"
                      )
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      assignmentForm.status === "Active"
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-slate-600"
                      />

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Publish Assignment
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Make the assignment available to students.
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </section>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={handleCancelForm}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Saving...
                  </>
                ) : assignmentForm.status === "Draft" ? (
                  <>
                    <Save size={16} />
                    Save Draft
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    Publish Assignment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">

          {/* Search */}
          <div className="relative">
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
              placeholder="Search assignments..."
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Subject Filter */}
          <select
            value={subjectFilter}
            onChange={(event) =>
              setSubjectFilter(event.target.value)
            }
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject === "All"
                  ? "All Subjects"
                  : subject}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">
              All Statuses
            </option>
            <option value="Active">
              Active
            </option>
            <option value="Draft">
              Draft
            </option>
            <option value="Closed">
              Closed
            </option>
          </select>
        </div>
      </div>

      {/* Assignment List */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Assignment
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Class
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Due Date
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Submissions
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredAssignments.map((assignment) => {
                const percentage =
                  getSubmissionPercentage(
                    assignment
                  );

                return (
                  <tr
                    key={assignment.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    {/* Assignment */}
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                          <BookOpen size={17} />
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-slate-800">
                            {assignment.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {assignment.subject} •{" "}
                            {assignment.maxMarks} marks
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Class */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {assignment.grade}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Section {assignment.section}
                      </p>
                    </td>

                    {/* Due Date */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CalendarDays
                          size={15}
                          className="text-slate-400"
                        />

                        {formatDate(
                          assignment.dueDate
                        )}
                      </div>
                    </td>

                    {/* Submissions */}
                    <td className="px-5 py-4">
                      <div className="w-40">
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            {assignment.submissions}/
                            {assignment.totalStudents}
                          </span>

                          <span className="text-xs font-medium text-slate-600">
                            {percentage}%
                          </span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-600 transition-all"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                          assignment.status
                        )}`}
                      >
                        {assignment.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            handleViewAssignment(
                              assignment
                            )
                          }
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                          title="View assignment"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleEditAssignment(
                              assignment
                            )
                          }
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                          title="Edit assignment"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleManageSubmissions(
                              assignment
                            )
                          }
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                          title="Manage submissions"
                        >
                          <Users size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Cards */}
        <div className="divide-y divide-slate-100 lg:hidden">
          {filteredAssignments.map((assignment) => {
            const percentage =
              getSubmissionPercentage(
                assignment
              );

            return (
              <div
                key={assignment.id}
                className="p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                      <BookOpen size={17} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-800">
                        {assignment.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {assignment.subject} •{" "}
                        {assignment.maxMarks} marks
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                      assignment.status
                    )}`}
                  >
                    {assignment.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">
                      Class
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {assignment.grade} -{" "}
                      {assignment.section}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">
                      Due Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {formatDate(
                        assignment.dueDate
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Submissions
                    </span>

                    <span className="text-xs font-medium text-slate-600">
                      {assignment.submissions}/
                      {assignment.totalStudents} (
                      {percentage}%)
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      handleViewAssignment(
                        assignment
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    <Eye size={14} />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleEditAssignment(
                        assignment
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleManageSubmissions(
                        assignment
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    <Users size={14} />
                    Submissions
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAssignments.length === 0 && (
          <div className="px-5 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <ClipboardList size={21} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-800">
              No assignments found
            </h3>

            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
              Try changing your search or filters to find assignments.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherAssignments;