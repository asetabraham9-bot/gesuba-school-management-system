import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  MessageSquare,
  Save,
  UserRound,
  BookOpen,
  CalendarDays,
  Award,
  AlertCircle,
} from "lucide-react";

const mockAssignments = [
  {
    id: "ASM001",
    title: "Algebra Practice Assignment",
    subject: "Mathematics",
    className: "Grade 9 A",
    dueDate: "2026-09-12",
    maxMarks: 20,
  },
  {
    id: "ASM002",
    title: "Cell Structure Worksheet",
    subject: "Biology",
    className: "Grade 10 A",
    dueDate: "2026-09-14",
    maxMarks: 15,
  },
  {
    id: "ASM003",
    title: "Motion Problems",
    subject: "Physics",
    className: "Grade 11 B",
    dueDate: "2026-09-16",
    maxMarks: 25,
  },
  {
    id: "ASM004",
    title: "Chemical Reactions Exercise",
    subject: "Chemistry",
    className: "Grade 10 B",
    dueDate: "2026-09-05",
    maxMarks: 20,
  },
];

const mockSubmissions = [
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
    feedback: "Good work. Review the final two problems.",
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
    feedback: "Excellent understanding of the topic.",
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

const TeacherGrading = () => {
  const navigate = useNavigate();
  const { submissionId } = useParams();

  const submission = mockSubmissions.find(
    (item) => item.id === submissionId
  );

  const assignment = submission
    ? mockAssignments.find(
        (item) => item.id === submission.assignmentId
      )
    : null;

  const [marks, setMarks] = useState(
    submission?.marks !== null && submission?.marks !== undefined
      ? String(submission.marks)
      : ""
  );

  const [feedback, setFeedback] = useState(
    submission?.feedback || ""
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!submission || !assignment) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertCircle size={24} />
          </div>

          <h1 className="text-lg font-semibold text-slate-900">
            Submission not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The submission you are trying to grade does not exist.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/teacher-dashboard/submissions")
            }
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
          >
            <ArrowLeft size={17} />
            Back to Submissions
          </button>
        </div>
      </div>
    );
  }

  const numericMarks =
    marks === "" ? null : Number(marks);

  const percentage =
    numericMarks !== null && assignment.maxMarks > 0
      ? Math.round(
          (numericMarks / assignment.maxMarks) * 100
        )
      : 0;

  const handleSaveGrade = () => {
    setError("");
    setSuccess(false);

    if (marks === "") {
      setError("Please enter the student's marks.");
      return;
    }

    if (Number.isNaN(numericMarks)) {
      setError("Marks must be a valid number.");
      return;
    }

    if (numericMarks < 0) {
      setError("Marks cannot be negative.");
      return;
    }

    if (numericMarks > assignment.maxMarks) {
      setError(
        `Marks cannot exceed ${assignment.maxMarks}.`
      );
      return;
    }

    if (feedback.length > 500) {
      setError(
        "Feedback cannot exceed 500 characters."
      );
      return;
    }

    setSuccess(true);

    console.log("Mock grade saved:", {
      submissionId: submission.id,
      studentId: submission.studentId,
      assignmentId: assignment.id,
      marks: numericMarks,
      maxMarks: assignment.maxMarks,
      feedback,
    });
  };

  const handleDownload = () => {
    console.log(
      `Mock download: ${submission.fileName}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() =>
              navigate("/teacher-dashboard/submissions")
            }
            className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            aria-label="Back to submissions"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <p className="text-sm font-medium text-blue-700">
              Grading Interface
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Grade Submission
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review the student's work and provide marks and feedback.
            </p>
          </div>
        </div>

        <div
          className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
            submission.status === "Graded"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          <CheckCircle2 size={16} />
          {submission.status}
        </div>
      </div>

      {/* Student + Assignment Information */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <UserRound size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Student Information
              </h2>
              <p className="text-xs text-slate-500">
                Submission owner
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-slate-500">
                Full Name
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {submission.studentName}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Student ID
              </p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {submission.studentId}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
              <BookOpen size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Assignment Information
              </h2>
              <p className="text-xs text-slate-500">
                Assessment details
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-slate-500">
                Assignment
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {assignment.title}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500">
                  Subject
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  {assignment.subject}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Class
                </p>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  {assignment.className}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submission File */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <FileText size={21} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                {submission.fileName || "No file submitted"}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>
                  {submission.fileSize || "N/A"}
                </span>

                {submission.submittedAt && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays size={13} />
                      {submission.submittedAt}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {submission.fileName && (
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Download size={17} />
              Download
            </button>
          )}
        </div>
      </div>

      {/* Grading Section */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Award size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Grade Submission
                </h2>
                <p className="text-xs text-slate-500">
                  Enter the student's final assessment result.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0"
              />
              <div>
                <p className="font-medium">
                  Grade saved successfully.
                </p>
                <p className="mt-0.5 text-xs">
                  This is currently a mock save. Backend persistence
                  will be connected later.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Marks */}
            <div>
              <label
                htmlFor="marks"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Marks
              </label>

              <div className="flex items-center gap-3">
                <input
                  id="marks"
                  type="number"
                  min="0"
                  max={assignment.maxMarks}
                  step="0.5"
                  value={marks}
                  onChange={(event) => {
                    setMarks(event.target.value);
                    setError("");
                    setSuccess(false);
                  }}
                  placeholder="Enter marks"
                  className="w-full max-w-xs rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <span className="text-sm font-medium text-slate-500">
                  / {assignment.maxMarks}
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Maximum available marks: {assignment.maxMarks}
              </p>
            </div>

            {/* Feedback */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="feedback"
                  className="text-sm font-medium text-slate-700"
                >
                  Feedback
                </label>

                <span className="text-xs text-slate-400">
                  {feedback.length}/500
                </span>
              </div>

              <div className="relative">
                <MessageSquare
                  size={18}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <textarea
                  id="feedback"
                  rows={6}
                  maxLength={500}
                  value={feedback}
                  onChange={(event) => {
                    setFeedback(event.target.value);
                    setError("");
                    setSuccess(false);
                  }}
                  placeholder="Write constructive feedback for the student..."
                  className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  navigate("/teacher-dashboard/submissions")
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveGrade}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                <Save size={17} />
                Save Grade
              </button>
            </div>
          </div>
        </div>

        {/* Grade Summary */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Award size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Grade Summary
              </h2>
              <p className="text-xs text-slate-500">
                Current result
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-5 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Score
            </p>

            <p className="mt-2 text-4xl font-bold text-slate-900">
              {marks === "" ? "--" : marks}
              <span className="text-xl font-medium text-slate-400">
                {" "}
                / {assignment.maxMarks}
              </span>
            </p>

            <p className="mt-2 text-sm font-medium text-blue-700">
              {marks === "" ? "--" : `${percentage}%`}
            </p>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm text-slate-500">
                Student
              </span>
              <span className="max-w-[150px] truncate text-right text-sm font-medium text-slate-800">
                {submission.studentName}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm text-slate-500">
                Assignment
              </span>
              <span className="max-w-[150px] truncate text-right text-sm font-medium text-slate-800">
                {assignment.title}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Status
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  submission.status === "Graded"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {submission.status}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TeacherGrading;