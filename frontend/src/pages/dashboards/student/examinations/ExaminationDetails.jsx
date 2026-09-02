import {
  AlertCircle,
  ArrowLeft,
  //Award,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileQuestion,
  KeyRound,
  LockKeyhole,
  PlayCircle,
  Timer,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const examinationData = {
  1: {
    id: 1,
    title: "Mathematics Mid-Term Examination",
    subject: "Mathematics",
    type: "Mid-Term",
    date: "September 15, 2026",
    time: "9:00 AM",
    duration: 90,
    questions: 40,
    totalMarks: 40,
    password: "MATH2026",
    description:
      "This examination covers algebra, equations, functions, and introductory geometry.",
    instructions: [
      "Make sure you have a stable internet connection.",
      "The examination must be completed within the allocated time.",
      "Do not refresh or close the examination window while taking the exam.",
      "Each question carries one mark.",
      "Review your answers before submitting the examination.",
    ],
  },

  2: {
    id: 2,
    title: "Biology Unit Examination",
    subject: "Biology",
    type: "Unit Exam",
    date: "September 18, 2026",
    time: "10:00 AM",
    duration: 60,
    questions: 30,
    totalMarks: 30,
    password: "BIO2026",
    description:
      "This examination covers cell structure, cell functions, and biological organization.",
    instructions: [
      "Read every question carefully before selecting an answer.",
      "The examination timer starts when you begin.",
      "Do not leave the examination page during the assessment.",
      "Each question carries one mark.",
      "Submit your answers before the timer reaches zero.",
    ],
  },

  3: {
    id: 3,
    title: "Computer Science Fundamentals",
    subject: "Computer Science",
    type: "Unit Exam",
    date: "September 20, 2026",
    time: "2:00 PM",
    duration: 75,
    questions: 35,
    totalMarks: 35,
    password: "CS2026",
    description:
      "This examination covers programming fundamentals, algorithms, and problem solving.",
    instructions: [
      "Read each question carefully.",
      "The examination must be completed within the scheduled duration.",
      "Do not refresh the browser during the examination.",
      "Choose the best answer for each question.",
      "Submit the examination when you have completed all questions.",
    ],
  },
};

const ExaminationDetails = () => {
  const navigate = useNavigate();
  const { examId } = useParams();

  const exam = examinationData[examId];

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  if (!exam) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-slate-400" />

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            Examination Not Found
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            The examination you are looking for does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/student-dashboard/examinations")}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Examinations
          </button>
        </div>
      </div>
    );
  }

  const handleStartExam = () => {
    setPassword("");
    setPasswordError("");
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (!password.trim()) {
      setPasswordError("Please enter the examination password.");
      return;
    }

    if (password !== exam.password) {
      setPasswordError(
        "Incorrect examination password. Please contact your examiner if you believe this is incorrect."
      );
      return;
    }

    setShowPasswordModal(false);
    navigate(`/student-dashboard/examinations/${exam.id}/take`);
  };

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/student-dashboard/examinations")}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Examinations
      </button>

      {/* Header */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-slate-900 px-5 py-7 text-white sm:px-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                  {exam.type}
                </span>

                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200">
                  Upcoming
                </span>
              </div>

              <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
                {exam.title}
              </h1>

              <p className="mt-2 text-sm text-slate-300">
                {exam.subject}
              </p>
            </div>

            <button
              type="button"
              onClick={handleStartExam}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              <PlayCircle className="h-5 w-5" />
              Start Examination
            </button>
          </div>
        </div>

        {/* Exam Meta */}
        <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <MetaItem
            icon={CalendarDays}
            label="Date"
            value={exam.date}
          />

          <MetaItem
            icon={Clock3}
            label="Start Time"
            value={exam.time}
          />

          <MetaItem
            icon={Timer}
            label="Duration"
            value={`${exam.duration} minutes`}
          />

          <MetaItem
            icon={FileQuestion}
            label="Questions"
            value={`${exam.questions} questions`}
          />
        </div>
      </section>

      {/* Description */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-semibold text-slate-900">
          Examination Overview
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {exam.description}
        </p>
      </section>

      {/* Instructions */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="font-semibold text-slate-900">
            Examination Instructions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Please read these instructions carefully before starting.
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <div className="space-y-4">
            {exam.instructions.map((instruction, index) => (
              <div
                key={instruction}
                className="flex items-start gap-3"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                  {index + 1}
                </div>

                <p className="text-sm leading-6 text-slate-600">
                  {instruction}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

          <div>
            <p className="text-sm font-semibold text-amber-900">
              Important
            </p>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              You will need the examination password provided by your
              examiner before you can start this examination.
            </p>
          </div>
        </div>
      </section>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-slate-100 p-2.5 text-slate-700">
                  <LockKeyhole className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Enter Examination Password
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Enter the password provided by your examiner.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handlePasswordSubmit}
              className="space-y-5 p-5 sm:p-6"
            >
              <div>
                <label
                  htmlFor="exam-password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Examination Password
                </label>

                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="exam-password"
                    type="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Enter exam password"
                    autoFocus
                    className={`w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition ${
                      passwordError
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-50"
                        : "border-slate-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                    }`}
                  />
                </div>

                {passwordError && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs leading-5 text-slate-500">
                  Your examiner will provide the password before the
                  examination begins.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Verify & Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const MetaItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-center gap-3 p-5">
      <div className="rounded-lg bg-slate-100 p-2.5 text-slate-600">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
};

export default ExaminationDetails;