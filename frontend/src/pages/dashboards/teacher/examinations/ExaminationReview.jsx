import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Clock3,
  Eye,
  FileText,
  KeyRound,
  Lock,
  Pencil,
  Save,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

const ExaminationReview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /*
   * Read examination data from the previous step.
   * If no data exists, use null and show the fallback UI below.
   */
  const examination = location.state?.examination || null;

  /*
   * All hooks must be called before any conditional return.
   */
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [published, setPublished] = useState(false);

  /*
   * Safely prepare questions.
   */
  const questions = examination?.questions || [];

  /*
   * Calculate total marks from the actual questions.
   */
  const totalMarks = useMemo(() => {
    return questions.reduce(
      (total, question) => total + Number(question.marks || 0),
      0
    );
  }, [questions]);

  /*
   * Calculate question type distribution.
   */
  const questionTypeBreakdown = useMemo(() => {
    return questions.reduce((breakdown, question) => {
      const type = question.type || "unknown";

      breakdown[type] = (breakdown[type] || 0) + 1;

      return breakdown;
    }, {});
  }, [questions]);

  /*
   * Question type labels.
   */
  const getQuestionTypeLabel = (type) => {
    const labels = {
      "multiple-choice": "Multiple Choice",
      "true-false": "True / False",
      "short-answer": "Short Answer",
      essay: "Essay",
    };

    return labels[type] || "Question";
  };

  /*
   * Format examination date.
   */
  const formatDate = (date) => {
    if (!date) {
      return "Not scheduled";
    }

    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  /*
   * Format examination start time.
   */
  const formatTime = (time) => {
    if (!time) {
      return "Not set";
    }

    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(Number(hours), Number(minutes), 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  /*
   * Get the correct answer depending on question type.
   */
  const getCorrectAnswer = (question) => {
    if (question.type === "multiple-choice") {
      const correctOption = question.options?.find(
        (option) => option.id === question.correctAnswer
      );

      return (
        correctOption?.text ||
        question.correctAnswer ||
        "Not specified"
      );
    }

    if (question.type === "true-false") {
      return question.correctAnswer || "Not specified";
    }

    if (question.type === "short-answer") {
      return question.expectedAnswer || "Not specified";
    }

    if (question.type === "essay") {
      return "Manual grading required";
    }

    return "Not specified";
  };

  /*
   * Save examination as draft.
   * Mock behavior for now.
   */
  const handleSaveDraft = () => {
    if (!examination) {
      return;
    }

    const payload = {
      ...examination,
      totalMarks,
      status: "DRAFT",
    };

    console.log("Mock save examination draft:", payload);

    setSaved(true);
  };

  /*
   * Publish examination.
   * Mock behavior for now.
   */
  const handlePublish = () => {
    if (!examination) {
      return;
    }

    const payload = {
      ...examination,
      totalMarks,
      status: "PUBLISHED",
    };

    console.log("Mock publish examination:", payload);

    setPublished(true);
    setShowPublishModal(false);
  };

  /*
   * Return to examination details.
   */
  const handleEditDetails = () => {
    if (!examination) {
      return;
    }

    navigate("/teacher-dashboard/examinations/create", {
      state: {
        examination,
      },
    });
  };

  /*
   * Return to question creation.
   */
  const handleEditQuestions = () => {
    if (!examination) {
      return;
    }

    navigate("/teacher-dashboard/examinations/create/questions", {
      state: {
        examination,
      },
    });
  };

  /*
   * Fallback UI when examination data is missing.
   */
  if (!examination) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Examination Review
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review your examination before saving or publishing it.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex items-start gap-3">
            <ClipboardCheck
              size={22}
              className="mt-0.5 shrink-0 text-amber-600"
            />

            <div>
              <h2 className="font-semibold text-amber-900">
                Examination data not found
              </h2>

              <p className="mt-1 text-sm text-amber-800">
                Please create an examination first before opening
                the review page.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/teacher-dashboard/examinations/create"
                  )
                }
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800"
              >
                <ArrowLeft size={16} />
                Back to Examination Setup
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * Published success screen.
   */
  if (published) {
    return (
      <div className="mx-auto max-w-3xl py-8">
        <div className="rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={34} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Examination Published Successfully
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
            The examination has been published in mock mode. In the
            production version, students will be able to access the
            examination according to its schedule and password
            requirements.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Examination
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {examination.title || "Untitled Examination"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Questions
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {questions.length}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Total Marks
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {totalMarks}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Status
                </p>

                <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  <Check size={13} />
                  Published
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/teacher-dashboard/examinations", {
                replace: true,
              })
            }
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <ArrowLeft size={17} />
            Back to Examinations
          </button>
        </div>
      </div>
    );
  }

  /*
   * Main review page.
   */
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              aria-label="Go back"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Examination Review
                </h1>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                  <Eye size={13} />
                  Final Review
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Review all examination details and questions before
                publishing.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {saved ? <Check size={17} /> : <Save size={17} />}

              {saved ? "Draft Saved" : "Save Draft"}
            </button>

            <button
              type="button"
              onClick={() => setShowPublishModal(true)}
              disabled={questions.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShieldCheck size={17} />
              Publish Examination
            </button>
          </div>
        </div>

        {/* Examination Summary */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                  Examination
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {examination.title || "Untitled Examination"}
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span>
                    {examination.examCategory || "Class Assessment"}
                  </span>

                  <span className="text-slate-300">•</span>

                  <span>
                    {examination.examType || "Not specified"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleEditDetails}
                className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <Pencil size={15} />
                Edit Details
              </button>
            </div>
          </div>

          <div className="grid gap-px bg-slate-200 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryItem
              icon={BookOpen}
              label="Subject"
              value={examination.subject || "Not selected"}
            />

            <SummaryItem
              icon={Users}
              label="Class"
              value={`${examination.grade || "Not selected"} • ${
                examination.section || "Not selected"
              }`}
            />

            <SummaryItem
              icon={Clock3}
              label="Schedule"
              value={`${formatDate(
                examination.examDate
              )} • ${formatTime(examination.startTime)}`}
            />

            <SummaryItem
              icon={Clock3}
              label="Duration"
              value={`${examination.duration || 0} minutes`}
            />
          </div>
        </section>

        {/* Assessment and Security */}
        <div className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Assessment Summary
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Marks and question distribution
                </p>
              </div>

              <ClipboardCheck
                size={20}
                className="text-blue-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 p-5">
              <StatCard
                label="Questions"
                value={questions.length}
              />

              <StatCard
                label="Total Marks"
                value={totalMarks}
              />

              <StatCard
                label="Passing Mark"
                value={examination.passingMark || 0}
              />

              <StatCard
                label="Duration"
                value={`${examination.duration || 0}m`}
              />
            </div>

            <div className="border-t border-slate-100 px-5 py-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Question Types
              </p>

              {Object.keys(questionTypeBreakdown).length === 0 ? (
                <p className="text-sm text-slate-500">
                  No question types available.
                </p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(questionTypeBreakdown).map(
                    ([type, count]) => (
                      <div
                        key={type}
                        className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
                      >
                        <span className="text-sm text-slate-600">
                          {getQuestionTypeLabel(type)}
                        </span>

                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                          {count}
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Security & Settings */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Security & Settings
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Examination access and behavior
                </p>
              </div>

              <Lock size={20} className="text-blue-700" />
            </div>

            <div className="divide-y divide-slate-100">
              <SettingRow
                icon={KeyRound}
                label="Exam Password"
                value={
                  examination.examPassword
                    ? "Password configured"
                    : "No password"
                }
                status={Boolean(examination.examPassword)}
              />

              <SettingRow
                icon={FileText}
                label="Randomize Questions"
                value={
                  examination.randomizeQuestions
                    ? "Enabled"
                    : "Disabled"
                }
                status={Boolean(
                  examination.randomizeQuestions
                )}
              />

              <SettingRow
                icon={ClipboardCheck}
                label="Question Navigation"
                value={
                  examination.allowQuestionNavigation
                    ? "Students can navigate"
                    : "Fixed order"
                }
                status={Boolean(
                  examination.allowQuestionNavigation
                )}
              />

              <SettingRow
                icon={Eye}
                label="Show Result After Submission"
                value={
                  examination.showResultAfterSubmission
                    ? "Enabled"
                    : "Disabled"
                }
                status={Boolean(
                  examination.showResultAfterSubmission
                )}
              />
            </div>
          </section>
        </div>

        {/* Instructions */}
        {examination.instructions && (
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <h2 className="font-semibold text-slate-900">
                Examination Instructions
              </h2>
            </div>

            <div className="p-5">
              <div className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {examination.instructions}
              </div>
            </div>
          </section>
        )}

        {/* Questions */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Question Preview
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Review every question, answer, and mark before
                publishing.
              </p>
            </div>

            <button
              type="button"
              onClick={handleEditQuestions}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <Pencil size={15} />
              Edit Questions
            </button>
          </div>

          <div className="divide-y divide-slate-200">
            {questions.length === 0 ? (
              <div className="p-8 text-center">
                <FileText
                  size={32}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 font-medium text-slate-700">
                  No questions added
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Add questions before publishing this examination.
                </p>

                <button
                  type="button"
                  onClick={handleEditQuestions}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  Add Questions
                </button>
              </div>
            ) : (
              questions.map((question, index) => {
                const isExpanded =
                  expandedQuestionId === question.id;

                return (
                  <div
                    key={question.id || index}
                    className="p-4 sm:p-5"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedQuestionId(
                          isExpanded ? null : question.id
                        )
                      }
                      className="flex w-full items-start gap-3 text-left"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-700">
                        {index + 1}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                            {getQuestionTypeLabel(
                              question.type
                            )}
                          </span>

                          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            {question.marks || 0} marks
                          </span>
                        </div>

                        <p className="mt-2 font-medium leading-6 text-slate-800">
                          {question.question ||
                            "Question text not provided"}
                        </p>
                      </div>

                      <div className="shrink-0 text-slate-400">
                        {isExpanded ? (
                          <ChevronUp size={19} />
                        ) : (
                          <ChevronDown size={19} />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="ml-11 mt-4 space-y-4">
                        {/* Multiple Choice */}
                        {question.type === "multiple-choice" &&
                          question.options?.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Options
                              </p>

                              {question.options.map((option) => {
                                const isCorrect =
                                  option.id ===
                                  question.correctAnswer;

                                return (
                                  <div
                                    key={option.id}
                                    className={`flex items-center gap-3 rounded-lg border p-3 ${
                                      isCorrect
                                        ? "border-emerald-200 bg-emerald-50"
                                        : "border-slate-200 bg-white"
                                    }`}
                                  >
                                    <div
                                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                                        isCorrect
                                          ? "bg-emerald-600 text-white"
                                          : "bg-slate-100 text-slate-600"
                                      }`}
                                    >
                                      {option.id}
                                    </div>

                                    <span className="flex-1 text-sm text-slate-700">
                                      {option.text}
                                    </span>

                                    {isCorrect && (
                                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                                        <Check size={14} />
                                        Correct
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}

                        {/* True / False */}
                        {question.type === "true-false" && (
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Correct Answer
                            </p>

                            <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
                              {question.correctAnswer ||
                                "Not specified"}
                            </div>
                          </div>
                        )}

                        {/* Short Answer */}
                        {question.type === "short-answer" && (
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Expected Answer
                            </p>

                            <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                              {question.expectedAnswer ||
                                "Not specified"}
                            </div>
                          </div>
                        )}

                        {/* Essay */}
                        {question.type === "essay" && (
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Grading
                            </p>

                            <div className="mt-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
                              This question requires manual teacher
                              grading.
                            </div>
                          </div>
                        )}

                        {/* Question Details */}
                        <div className="flex flex-wrap gap-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
                          <span>
                            Question mark:{" "}
                            <strong className="text-slate-700">
                              {question.marks || 0}
                            </strong>
                          </span>

                          <span>
                            Correct answer:{" "}
                            <strong className="text-slate-700">
                              {getCorrectAnswer(question)}
                            </strong>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Bottom Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
            Back to Questions
          </button>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {saved ? <Check size={17} /> : <Save size={17} />}

              {saved ? "Draft Saved" : "Save Draft"}
            </button>

            <button
              type="button"
              onClick={() => setShowPublishModal(true)}
              disabled={questions.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShieldCheck size={17} />
              Publish Examination
            </button>
          </div>
        </div>
      </div>

      {/* Publish Confirmation Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Publish Examination?
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Please confirm that all examination details and
                    questions are correct.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPublishModal(false)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close confirmation"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-5">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="space-y-3 text-sm">
                  <ConfirmRow
                    label="Examination"
                    value={
                      examination.title || "Untitled Examination"
                    }
                  />

                  <ConfirmRow
                    label="Class"
                    value={`${examination.grade || "N/A"} • ${
                      examination.section || "N/A"
                    }`}
                  />

                  <ConfirmRow
                    label="Questions"
                    value={questions.length}
                  />

                  <ConfirmRow
                    label="Total Marks"
                    value={totalMarks}
                  />

                  <ConfirmRow
                    label="Password"
                    value={
                      examination.examPassword
                        ? "Configured"
                        : "Not configured"
                    }
                  />
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
                <p className="text-xs leading-5 text-amber-800">
                  After publishing, the examination will be considered
                  ready for students in the production system. Make
                  sure the questions, marks, schedule, and password are
                  correct.
                </p>
              </div>

              <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowPublishModal(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handlePublish}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  <Check size={17} />
                  Confirm Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/*
 * Summary item component.
 */
const SummaryItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="bg-white p-5">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
        <Icon size={15} />
        {label}
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
};

/*
 * Statistic card component.
 */
const StatCard = ({ label, value }) => {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
};

/*
 * Setting row component.
 */
const SettingRow = ({
  icon: Icon,
  label,
  value,
  status,
}) => {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-700">
          {label}
        </p>

        <p className="mt-0.5 text-xs text-slate-500">
          {value}
        </p>
      </div>

      <span
        className={`h-2 w-2 rounded-full ${
          status ? "bg-emerald-500" : "bg-slate-300"
        }`}
      />
    </div>
  );
};

/*
 * Confirmation row component.
 */
const ConfirmRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-500">{label}</span>

      <span className="text-right font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
};

export default ExaminationReview;