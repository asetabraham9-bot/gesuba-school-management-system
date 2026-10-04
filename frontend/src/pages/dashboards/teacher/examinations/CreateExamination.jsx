import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  Info,
  ListChecks,
  Save,
  Settings2,
  UsersRound,
} from "lucide-react";

const CLASS_ASSESSMENT_TYPES = [
  "Mid Exam",
  "Final Exam",
  "Unit Exam",
  "Quiz",
  "Practice",
];

const MODEL_EXAM_TYPES = [
  "Regional Model",
  "Zonal Model",
];

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
];

const grades = [
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

const sections = [
  "Section A",
  "Section B",
  "Section C",
];

const initialForm = {
  title: "",
  subject: "",
  grade: "",
  section: "",
  examCategory: "Class Assessment",
  examType: "",
  examDate: "",
  startTime: "",
  duration: "60",
  totalMarks: "20",
  numberOfQuestions: "20",
  passingMark: "10",
  instructions: "",
  randomizeQuestions: false,
  allowQuestionNavigation: true,
  showResultAfterSubmission: true,
};

export default function CreateExamination() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState({});

  const [isSaving, setIsSaving] = useState(false);

  const [saveMessage, setSaveMessage] = useState("");

  const examTypeOptions = useMemo(() => {
    if (form.examCategory === "Model Exam") {
      return MODEL_EXAM_TYPES;
    }

    return CLASS_ASSESSMENT_TYPES;
  }, [form.examCategory]);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));

    setSaveMessage("");
  };

  const handleCategoryChange = (category) => {
    setForm((previous) => ({
      ...previous,
      examCategory: category,
      examType: "",
    }));

    setErrors((previous) => ({
      ...previous,
      examCategory: "",
      examType: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Examination title is required.";
    }

    if (!form.subject) {
      newErrors.subject = "Select a subject.";
    }

    if (!form.grade) {
      newErrors.grade = "Select a grade.";
    }

    if (!form.section) {
      newErrors.section = "Select a section.";
    }

    if (!form.examType) {
      newErrors.examType = "Select an examination type.";
    }

    if (!form.examDate) {
      newErrors.examDate = "Select the examination date.";
    }

    if (!form.startTime) {
      newErrors.startTime = "Select the start time.";
    }

    if (!form.duration || Number(form.duration) <= 0) {
      newErrors.duration =
        "Duration must be greater than zero.";
    }

    if (
      !form.totalMarks ||
      Number(form.totalMarks) <= 0
    ) {
      newErrors.totalMarks =
        "Total marks must be greater than zero.";
    }

    if (
      !form.numberOfQuestions ||
      Number(form.numberOfQuestions) <= 0
    ) {
      newErrors.numberOfQuestions =
        "Number of questions must be greater than zero.";
    }

    if (
      !form.passingMark ||
      Number(form.passingMark) < 0
    ) {
      newErrors.passingMark =
        "Passing mark cannot be negative.";
    }

    if (
      Number(form.passingMark) >
      Number(form.totalMarks)
    ) {
      newErrors.passingMark =
        "Passing mark cannot exceed total marks.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => {
    return {
      ...form,
      title: form.title.trim(),
      duration: Number(form.duration),
      totalMarks: Number(form.totalMarks),
      numberOfQuestions: Number(
        form.numberOfQuestions
      ),
      passingMark: Number(form.passingMark),
    };
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setSaveMessage("");

    setTimeout(() => {
      console.log(
        "Mock examination draft:",
        buildPayload()
      );

      setIsSaving(false);

      setSaveMessage(
        "Examination saved as a draft successfully."
      );
    }, 500);
  };

  const handleContinue = () => {
    const isValid = validateForm();

    if (!isValid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setIsSaving(true);
    setSaveMessage("");

    const payload = buildPayload();

    setTimeout(() => {
      console.log(
        "Mock examination ready for questions:",
        payload
      );

      setIsSaving(false);

      /*
       * D5.3 will implement the questions page.
       * We navigate there now so the complete workflow
       * is already prepared.
       */
      navigate(
        "/teacher-dashboard/examinations/create/questions",
        {
          state: {
            examination: payload,
          },
        }
      );
    }, 500);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section>
        <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">

          <Link
            to="/teacher-dashboard/examinations"
            className="transition hover:text-blue-700"
          >
            Examinations
          </Link>

          <ChevronRight size={15} />

          <span>Create Examination</span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          <div className="flex items-start gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <FileText size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Create Examination
              </h1>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Configure the examination details,
                schedule, marks, and assessment settings
                before adding questions.
              </p>
            </div>

          </div>

          <Link
            to="/teacher-dashboard/examinations"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={17} />

            Back
          </Link>

        </div>
      </section>

      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

        <div className="flex items-center">

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-xs font-bold text-white">
              1
            </div>

            <span className="text-sm font-semibold text-slate-900">
              Examination Details
            </span>

          </div>

          <div className="mx-3 h-px flex-1 bg-slate-200" />

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-400">
              2
            </div>

            <span className="hidden text-sm font-medium text-slate-400 sm:inline">
              Questions
            </span>

          </div>

          <div className="mx-3 h-px flex-1 bg-slate-200" />

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-400">
              3
            </div>

            <span className="hidden text-sm font-medium text-slate-400 sm:inline">
              Review
            </span>

          </div>

        </div>
      </section>

      {/* =====================================================
          SUCCESS MESSAGE
      ===================================================== */}

      {saveMessage && (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">

          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100">
            <Check size={16} />
          </div>

          <div>
            <p className="text-sm font-semibold">
              Saved
            </p>

            <p className="mt-0.5 text-xs">
              {saveMessage}
            </p>
          </div>

        </div>
      )}

      {/* =====================================================
          BASIC INFORMATION
      ===================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <BookOpen size={18} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Basic Information
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Define the subject, grade, section, and
                examination identity.
              </p>
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-2">

          {/* Title */}
          <div className="lg:col-span-2">

            <label
              htmlFor="exam-title"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Examination Title
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="exam-title"
              type="text"
              value={form.title}
              onChange={(event) =>
                updateField(
                  "title",
                  event.target.value
                )
              }
              placeholder="e.g. Grade 12 Mathematics Mid Exam"
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                errors.title
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
              }`}
            />

            {errors.title && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.title}
              </p>
            )}

          </div>

          {/* Subject */}
          <div>

            <label
              htmlFor="exam-subject"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Subject
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <select
              id="exam-subject"
              value={form.subject}
              onChange={(event) =>
                updateField(
                  "subject",
                  event.target.value
                )
              }
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 ${
                errors.subject
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
              }`}
            >
              <option value="">
                Select subject
              </option>

              {subjects.map((subject) => (
                <option
                  key={subject}
                  value={subject}
                >
                  {subject}
                </option>
              ))}
            </select>

            {errors.subject && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.subject}
              </p>
            )}

          </div>

          {/* Grade */}
          <div>

            <label
              htmlFor="exam-grade"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Grade
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <select
              id="exam-grade"
              value={form.grade}
              onChange={(event) =>
                updateField(
                  "grade",
                  event.target.value
                )
              }
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 ${
                errors.grade
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
              }`}
            >
              <option value="">
                Select grade
              </option>

              {grades.map((grade) => (
                <option
                  key={grade}
                  value={grade}
                >
                  {grade}
                </option>
              ))}
            </select>

            {errors.grade && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.grade}
              </p>
            )}

          </div>

          {/* Section */}
          <div>

            <label
              htmlFor="exam-section"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Section
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <select
              id="exam-section"
              value={form.section}
              onChange={(event) =>
                updateField(
                  "section",
                  event.target.value
                )
              }
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 ${
                errors.section
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
              }`}
            >
              <option value="">
                Select section
              </option>

              {sections.map((section) => (
                <option
                  key={section}
                  value={section}
                >
                  {section}
                </option>
              ))}
            </select>

            {errors.section && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.section}
              </p>
            )}

          </div>

        </div>
      </section>

      {/* =====================================================
          EXAMINATION TYPE
      ===================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
              <GraduationCap size={18} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Examination Type
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Select whether this is a classroom
                assessment or a model examination.
              </p>
            </div>

          </div>

        </div>

        <div className="p-5 sm:p-6">

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* Class Assessment */}
            <button
              type="button"
              onClick={() =>
                handleCategoryChange(
                  "Class Assessment"
                )
              }
              className={`rounded-2xl border p-5 text-left transition ${
                form.examCategory ===
                "Class Assessment"
                  ? "border-blue-300 bg-blue-50/70 ring-2 ring-blue-100"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >

              <div className="flex items-start justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <BookOpen size={19} />
                </div>

                {form.examCategory ===
                  "Class Assessment" && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-white">
                    <Check size={14} />
                  </div>
                )}

              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-900">
                Class Assessment
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Regular classroom assessments used to
                measure student learning throughout the
                academic year.
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">

                {CLASS_ASSESSMENT_TYPES.map(
                  (type) => (
                    <span
                      key={type}
                      className="rounded-full bg-white px-2 py-1 text-[10px] font-medium text-slate-500 ring-1 ring-slate-200"
                    >
                      {type}
                    </span>
                  )
                )}

              </div>

            </button>

            {/* Model Exam */}
            <button
              type="button"
              onClick={() =>
                handleCategoryChange(
                  "Model Exam"
                )
              }
              className={`rounded-2xl border p-5 text-left transition ${
                form.examCategory ===
                "Model Exam"
                  ? "border-violet-300 bg-violet-50/70 ring-2 ring-violet-100"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >

              <div className="flex items-start justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <GraduationCap size={19} />
                </div>

                {form.examCategory ===
                  "Model Exam" && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-700 text-white">
                    <Check size={14} />
                  </div>
                )}

              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-900">
                Model Exam
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Regional or zonal model examinations,
                especially designed to prepare Grade 12
                students for major examinations and the
                university entrance examination.
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">

                {MODEL_EXAM_TYPES.map(
                  (type) => (
                    <span
                      key={type}
                      className="rounded-full bg-white px-2 py-1 text-[10px] font-medium text-slate-500 ring-1 ring-slate-200"
                    >
                      {type}
                    </span>
                  )
                )}

              </div>

            </button>

          </div>

          {/* Type selection */}
          <div className="mt-5">

            <label
              htmlFor="exam-type"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Specific Examination Type
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <select
              id="exam-type"
              value={form.examType}
              onChange={(event) =>
                updateField(
                  "examType",
                  event.target.value
                )
              }
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 ${
                errors.examType
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
              }`}
            >
              <option value="">
                Select examination type
              </option>

              {examTypeOptions.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}
            </select>

            {errors.examType && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.examType}
              </p>
            )}

          </div>

          {/* Model exam information */}
          {form.examCategory === "Model Exam" && (
            <div className="mt-4 flex gap-3 rounded-xl border border-violet-100 bg-violet-50 p-4">

              <Info
                size={18}
                className="mt-0.5 shrink-0 text-violet-700"
              />

              <div>
                <p className="text-sm font-semibold text-violet-900">
                  Model examination
                </p>

                <p className="mt-1 text-xs leading-5 text-violet-800/80">
                  Regional and zonal model examinations
                  can be used primarily for senior Grade 12
                  preparation before the university entrance
                  examination.
                </p>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* =====================================================
          SCHEDULE
      ===================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
              <CalendarDays size={18} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Schedule
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Set when the examination will take place.
              </p>
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 md:grid-cols-3">

          {/* Date */}
          <div>

            <label
              htmlFor="exam-date"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Examination Date
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="exam-date"
              type="date"
              value={form.examDate}
              onChange={(event) =>
                updateField(
                  "examDate",
                  event.target.value
                )
              }
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 ${
                errors.examDate
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
              }`}
            />

            {errors.examDate && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.examDate}
              </p>
            )}

          </div>

          {/* Time */}
          <div>

            <label
              htmlFor="exam-start-time"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Start Time
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="exam-start-time"
              type="time"
              value={form.startTime}
              onChange={(event) =>
                updateField(
                  "startTime",
                  event.target.value
                )
              }
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 ${
                errors.startTime
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
              }`}
            />

            {errors.startTime && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.startTime}
              </p>
            )}

          </div>

          {/* Duration */}
          <div>

            <label
              htmlFor="exam-duration"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Duration
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <div className="relative">

              <Clock3
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="exam-duration"
                type="number"
                min="1"
                value={form.duration}
                onChange={(event) =>
                  updateField(
                    "duration",
                    event.target.value
                  )
                }
                className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-16 text-sm text-slate-700 outline-none focus:ring-2 ${
                  errors.duration
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                }`}
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                minutes
              </span>

            </div>

            {errors.duration && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.duration}
              </p>
            )}

          </div>

        </div>
      </section>

      {/* =====================================================
          MARKS AND QUESTIONS
      ===================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <ListChecks size={18} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Marks and Questions
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Configure the scoring structure of the
                examination.
              </p>
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 md:grid-cols-3">

          {/* Total Marks */}
          <div>

            <label
              htmlFor="total-marks"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Total Marks
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="total-marks"
              type="number"
              min="1"
              value={form.totalMarks}
              onChange={(event) =>
                updateField(
                  "totalMarks",
                  event.target.value
                )
              }
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 ${
                errors.totalMarks
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
              }`}
            />

            {errors.totalMarks && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.totalMarks}
              </p>
            )}

          </div>

          {/* Questions */}
          <div>

            <label
              htmlFor="question-count"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Number of Questions
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="question-count"
              type="number"
              min="1"
              value={form.numberOfQuestions}
              onChange={(event) =>
                updateField(
                  "numberOfQuestions",
                  event.target.value
                )
              }
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 ${
                errors.numberOfQuestions
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
              }`}
            />

            {errors.numberOfQuestions && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.numberOfQuestions}
              </p>
            )}

          </div>

          {/* Passing Mark */}
          <div>

            <label
              htmlFor="passing-mark"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Passing Mark
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="passing-mark"
              type="number"
              min="0"
              value={form.passingMark}
              onChange={(event) =>
                updateField(
                  "passingMark",
                  event.target.value
                )
              }
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 ${
                errors.passingMark
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
              }`}
            />

            {errors.passingMark && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.passingMark}
              </p>
            )}

          </div>

        </div>
      </section>

      {/* =====================================================
          INSTRUCTIONS
      ===================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <Info size={18} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Examination Instructions
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Provide instructions students should see
                before starting the examination.
              </p>
            </div>

          </div>

        </div>

        <div className="p-5 sm:p-6">

          <textarea
            value={form.instructions}
            onChange={(event) =>
              updateField(
                "instructions",
                event.target.value
              )
            }
            rows={5}
            maxLength={1000}
            placeholder="e.g. Read each question carefully. Answer all questions. Do not leave the examination page before submitting."
            className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-1.5 text-right text-xs text-slate-400">
            {form.instructions.length}/1000
          </p>

        </div>
      </section>

      {/* =====================================================
          EXAMINATION SETTINGS
      ===================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
              <Settings2 size={18} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Examination Settings
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Control how students interact with the
                examination.
              </p>
            </div>

          </div>

        </div>

        <div className="divide-y divide-slate-100">

          {/* Randomize */}
          <label className="flex cursor-pointer items-start gap-4 p-5 sm:p-6">

            <input
              type="checkbox"
              checked={form.randomizeQuestions}
              onChange={(event) =>
                updateField(
                  "randomizeQuestions",
                  event.target.checked
                )
              }
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-500"
            />

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Randomize questions
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Present questions in a different order
                for each student.
              </p>
            </div>

          </label>

          {/* Navigation */}
          <label className="flex cursor-pointer items-start gap-4 p-5 sm:p-6">

            <input
              type="checkbox"
              checked={form.allowQuestionNavigation}
              onChange={(event) =>
                updateField(
                  "allowQuestionNavigation",
                  event.target.checked
                )
              }
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-500"
            />

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Allow question navigation
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Allow students to move backward and
                forward between questions.
              </p>
            </div>

          </label>

          {/* Result */}
          <label className="flex cursor-pointer items-start gap-4 p-5 sm:p-6">

            <input
              type="checkbox"
              checked={
                form.showResultAfterSubmission
              }
              onChange={(event) =>
                updateField(
                  "showResultAfterSubmission",
                  event.target.checked
                )
              }
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-500"
            />

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Show result after submission
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Allow students to see their examination
                result immediately after submitting.
              </p>
            </div>

          </label>

        </div>
      </section>

      {/* =====================================================
          TARGET INFORMATION
      ===================================================== */}

      {form.grade === "Grade 12" &&
        form.examCategory === "Model Exam" && (
          <section className="rounded-2xl border border-violet-100 bg-violet-50/60 p-5">

            <div className="flex gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                <UsersRound size={18} />
              </div>

              <div>

                <h3 className="text-sm font-bold text-violet-900">
                  Grade 12 model examination
                </h3>

                <p className="mt-1 text-xs leading-5 text-violet-800/80">
                  This configuration is suitable for
                  Grade 12 regional or zonal model
                  examinations designed to strengthen
                  student readiness before the university
                  entrance examination.
                </p>

              </div>

            </div>

          </section>
        )}

      {/* =====================================================
          ACTION BAR
      ===================================================== */}

      <section className="sticky bottom-0 z-20 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">

        <div className="mx-auto flex max-w-5xl flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">

          <Link
            to="/teacher-dashboard/examinations"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />

              {isSaving
                ? "Saving..."
                : "Save as Draft"}
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Continue to Questions

              <ChevronRight size={17} />
            </button>

          </div>

        </div>
      </section>

    </div>
  );
}