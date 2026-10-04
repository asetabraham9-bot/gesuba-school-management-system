import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  EyeOff,
  FileQuestion,
  GripVertical,
  Info,
  LockKeyhole,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

const QUESTION_TYPES = [
  {
    value: "multiple-choice",
    label: "Multiple Choice",
  },
  {
    value: "true-false",
    label: "True / False",
  },
  {
    value: "short-answer",
    label: "Short Answer",
  },
  {
    value: "essay",
    label: "Essay",
  },
];

const createEmptyQuestion = (number) => ({
  id: `Q${Date.now()}-${number}`,
  number,
  type: "multiple-choice",
  questionText: "",
  options: ["", "", "", ""],
  correctAnswer: "",
  expectedAnswer: "",
  marks: "1",
});

const normalizeQuestion = (question, index) => ({
  ...question,
  number: index + 1,
});

const ExaminationQuestions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /*
   * Examination configuration comes from D5.2
   * through React Router state.
   */
  const examination =
    location.state?.examination || {
      title: "New Examination",
      subject: "Not selected",
      grade: "Not selected",
      section: "Not selected",
      examCategory: "Class Assessment",
      examType: "Mid Exam",
      examDate: "",
      startTime: "",
      duration: "60",
      totalMarks: "20",
      numberOfQuestions: "20",
      passingMark: "10",
    };

  /*
   * Examination password.
   *
   * If D5.2 already provided one, use it.
   * Otherwise start with an empty password.
   */
  const [examPassword, setExamPassword] = useState(
    examination.examPassword || ""
  );

  const [showPassword, setShowPassword] = useState(false);

  const [questions, setQuestions] = useState(() => [
    createEmptyQuestion(1),
  ]);

  const [expandedQuestionId, setExpandedQuestionId] =
    useState(null);

  const [errors, setErrors] = useState({});

  const [saved, setSaved] = useState(false);

  /*
   * Calculate total marks automatically.
   */
  const totalMarks = useMemo(() => {
    return questions.reduce((total, question) => {
      const marks = Number(question.marks);

      return total + (Number.isFinite(marks) ? marks : 0);
    }, 0);
  }, [questions]);

  const questionCount = questions.length;

  const configuredQuestionCount = Number(
    examination.numberOfQuestions || 0
  );

  const configuredTotalMarks = Number(
    examination.totalMarks || 0
  );

  const remainingConfiguredQuestions =
    configuredQuestionCount - questionCount;

  const isQuestionCountMatched =
    configuredQuestionCount === questionCount;

  const isMarksMatched =
    configuredTotalMarks === totalMarks;

  /*
   * Update a question field.
   */
  const updateQuestion = (
    questionId,
    field,
    value
  ) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              [field]: value,
            }
          : question
      )
    );

    setErrors((currentErrors) => {
      const nextErrors = {
        ...currentErrors,
      };

      delete nextErrors[questionId];

      return nextErrors;
    });

    setSaved(false);
  };

  /*
   * Update a multiple-choice option.
   */
  const updateOption = (
    questionId,
    optionIndex,
    value
  ) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((question) => {
        if (question.id !== questionId) {
          return question;
        }

        const updatedOptions = [
          ...question.options,
        ];

        updatedOptions[optionIndex] = value;

        return {
          ...question,
          options: updatedOptions,
        };
      })
    );

    setSaved(false);
  };

  /*
   * Add a new question.
   */
  const addQuestion = () => {
    const nextNumber = questions.length + 1;

    const newQuestion =
      createEmptyQuestion(nextNumber);

    setQuestions((currentQuestions) => [
      ...currentQuestions,
      newQuestion,
    ]);

    setExpandedQuestionId(newQuestion.id);

    setSaved(false);
  };

  /*
   * Duplicate an existing question.
   */
  const duplicateQuestion = (questionId) => {
    const sourceQuestion = questions.find(
      (question) => question.id === questionId
    );

    if (!sourceQuestion) {
      return;
    }

    const duplicatedQuestion = {
      ...sourceQuestion,
      id: `Q${Date.now()}-${questions.length + 1}`,
      questionText: sourceQuestion.questionText
        ? `${sourceQuestion.questionText} (Copy)`
        : "",
      options: [...sourceQuestion.options],
    };

    const sourceIndex = questions.findIndex(
      (question) => question.id === questionId
    );

    const updatedQuestions = [...questions];

    updatedQuestions.splice(
      sourceIndex + 1,
      0,
      duplicatedQuestion
    );

    setQuestions(
      updatedQuestions.map(normalizeQuestion)
    );

    setExpandedQuestionId(
      duplicatedQuestion.id
    );

    setSaved(false);
  };

  /*
   * Delete a question.
   */
  const removeQuestion = (questionId) => {
    if (questions.length === 1) {
      return;
    }

    const updatedQuestions = questions
      .filter(
        (question) => question.id !== questionId
      )
      .map(normalizeQuestion);

    setQuestions(updatedQuestions);

    if (expandedQuestionId === questionId) {
      setExpandedQuestionId(
        updatedQuestions[0]?.id || null
      );
    }

    setSaved(false);
  };

  /*
   * Move question up/down.
   */
  const moveQuestion = (
    questionId,
    direction
  ) => {
    const currentIndex = questions.findIndex(
      (question) => question.id === questionId
    );

    if (currentIndex === -1) {
      return;
    }

    const targetIndex =
      direction === "up"
        ? currentIndex - 1
        : currentIndex + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= questions.length
    ) {
      return;
    }

    const updatedQuestions = [...questions];

    const [movedQuestion] =
      updatedQuestions.splice(
        currentIndex,
        1
      );

    updatedQuestions.splice(
      targetIndex,
      0,
      movedQuestion
    );

    setQuestions(
      updatedQuestions.map(normalizeQuestion)
    );

    setSaved(false);
  };

  /*
   * Validate examination questions.
   */
  const validateQuestions = () => {
    const validationErrors = {};

    /*
     * Exam password validation.
     */
    if (!examPassword.trim()) {
      validationErrors.examPassword =
        "Exam password is required.";
    } else if (examPassword.trim().length < 4) {
      validationErrors.examPassword =
        "Exam password must contain at least 4 characters.";
    }

    /*
     * Validate every question.
     */
    questions.forEach((question) => {
      if (!question.questionText.trim()) {
        validationErrors[question.id] =
          "Question text is required.";

        return;
      }

      const marks = Number(question.marks);

      if (!marks || marks <= 0) {
        validationErrors[question.id] =
          "Question marks must be greater than 0.";

        return;
      }

      /*
       * Multiple Choice validation.
       */
      if (question.type === "multiple-choice") {
        const hasEmptyOption =
          question.options.some(
            (option) => !option.trim()
          );

        if (hasEmptyOption) {
          validationErrors[question.id] =
            "All four options are required.";

          return;
        }

        if (!question.correctAnswer) {
          validationErrors[question.id] =
            "Select the correct answer.";
        }
      }

      /*
       * True / False validation.
       */
      if (question.type === "true-false") {
        if (!question.correctAnswer) {
          validationErrors[question.id] =
            "Select the correct answer.";
        }
      }

      /*
       * Short Answer validation.
       */
      if (question.type === "short-answer") {
        if (!question.expectedAnswer.trim()) {
          validationErrors[question.id] =
            "Expected answer is required.";
        }
      }

      /*
       * Essay does not require an expected answer.
       * It will be manually graded later.
       */
    });

    setErrors(validationErrors);

    return (
      Object.keys(validationErrors).length === 0
    );
  };

  /*
   * Build the mock examination payload.
   */
  const buildPayload = () => {
    return {
      ...examination,

      examPassword: examPassword.trim(),

      numberOfQuestions: questions.length,

      totalMarks,

      questions,
    };
  };

  /*
   * Save draft.
   *
   * Backend integration will be added later.
   */
  const handleSaveDraft = () => {
    const payload = buildPayload();

    console.log(
      "Mock examination draft:",
      payload
    );

    setSaved(true);
  };

  /*
   * Continue to examination review.
   */
  const handleContinue = () => {
    const isValid = validateQuestions();

    if (!isValid) {
      return;
    }

    const payload = buildPayload();

    console.log(
      "Mock examination ready for review:",
      payload
    );

    navigate(
      "/teacher-dashboard/examinations/create/review",
      {
        state: {
          examination: payload,
        },
      }
    );
  };

  /*
   * Return to D5.2.
   */
  const handleBack = () => {
    navigate(
      "/teacher-dashboard/examinations/create",
      {
        state: {
          examination,
        },
      }
    );
  };

  /*
   * Get readable question type.
   */
  const getQuestionTypeLabel = (type) => {
    const questionType =
      QUESTION_TYPES.find(
        (item) => item.value === type
      );

    return (
      questionType?.label || "Question"
    );
  };

  return (
    <div className="space-y-6 pb-10">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            aria-label="Back to create examination"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Examination Questions
              </h1>

              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                Step 2 of 3
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Add questions, answers, marks, and the
              password students will use to enter the
              examination.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Save size={17} />
            Save Draft
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Continue to Review

            <ChevronDown
              size={17}
              className="-rotate-90"
            />
          </button>
        </div>
      </div>

      {/* =====================================================
          EXAMINATION SUMMARY
      ====================================================== */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
            <FileQuestion size={20} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Examination Summary
            </h2>

            <p className="text-sm text-slate-500">
              Basic information configured in the
              previous step.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-7">
          <SummaryItem
            label="Examination"
            value={examination.title}
          />

          <SummaryItem
            label="Subject"
            value={examination.subject}
          />

          <SummaryItem
            label="Grade"
            value={examination.grade}
          />

          <SummaryItem
            label="Section"
            value={examination.section}
          />

          <SummaryItem
            label="Type"
            value={examination.examType}
          />

          <SummaryItem
            label="Questions"
            value={
              examination.numberOfQuestions
            }
          />

          <SummaryItem
            label="Total Marks"
            value={examination.totalMarks}
          />
        </div>
      </section>

      {/* =====================================================
          EXAM PASSWORD
      ====================================================== */}
      <section className="rounded-xl border border-blue-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
            <LockKeyhole size={20} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Examination Password
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Students must enter this password before
              they can start the examination.
            </p>
          </div>
        </div>

        <div className="max-w-xl">
          <label
            htmlFor="exam-password"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Exam Password

            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <div className="relative">
            <input
              id="exam-password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={examPassword}
              onChange={(event) => {
                setExamPassword(
                  event.target.value
                );

                setSaved(false);

                setErrors((currentErrors) => {
                  const nextErrors = {
                    ...currentErrors,
                  };

                  delete nextErrors.examPassword;

                  return nextErrors;
                });
              }}
              placeholder="Enter examination password"
              className={`w-full rounded-lg border bg-white px-3 py-2.5 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                errors.examPassword
                  ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (current) => !current
                )
              }
              className="absolute right-0 top-0 inline-flex h-full w-11 items-center justify-center text-slate-400 transition hover:text-slate-700"
              aria-label={
                showPassword
                  ? "Hide exam password"
                  : "Show exam password"
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {errors.examPassword && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
              <AlertCircle size={14} />

              {errors.examPassword}
            </p>
          )}

          <div className="mt-3 flex items-start gap-2 rounded-lg bg-slate-50 p-3">
            <Info
              size={16}
              className="mt-0.5 shrink-0 text-slate-500"
            />

            <p className="text-xs leading-5 text-slate-600">
              Use a password that is easy for the
              intended students to enter but difficult
              for unauthorized users to guess. Later,
              the backend will store this password with
              the examination and verify it before a
              student can start the exam.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUESTION PROGRESS
      ====================================================== */}
      <section className="grid gap-4 sm:grid-cols-3">
        <ProgressCard
          label="Questions Added"
          value={questionCount}
          helper={`of ${configuredQuestionCount} configured`}
          matched={isQuestionCountMatched}
        />

        <ProgressCard
          label="Marks Added"
          value={totalMarks}
          helper={`of ${configuredTotalMarks} configured`}
          matched={isMarksMatched}
        />

        <ProgressCard
          label="Remaining Questions"
          value={Math.max(
            remainingConfiguredQuestions,
            0
          )}
          helper={
            remainingConfiguredQuestions > 0
              ? "still need to be added"
              : remainingConfiguredQuestions === 0
                ? "question count completed"
                : "more questions than configured"
          }
          matched={
            remainingConfiguredQuestions === 0
          }
        />
      </section>

      {/* =====================================================
          QUESTIONS
      ====================================================== */}
      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Questions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Build the examination one question at a
              time.
            </p>
          </div>

          <button
            type="button"
            onClick={addQuestion}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <Plus size={17} />
            Add Question
          </button>
        </div>

        {questions.map(
          (question, index) => {
            const isExpanded =
              expandedQuestionId ===
              question.id;

            const questionError =
              errors[question.id];

            return (
              <article
                key={question.id}
                className={`overflow-hidden rounded-xl border bg-white shadow-sm ${
                  questionError
                    ? "border-red-200"
                    : "border-slate-200"
                }`}
              >
                {/* Question Header */}
                <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="hidden cursor-grab text-slate-300 sm:block">
                      <GripVertical size={18} />
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-700">
                      {index + 1}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-slate-900">
                          Question {index + 1}
                        </h3>

                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                          {getQuestionTypeLabel(
                            question.type
                          )}
                        </span>

                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                          {question.marks || 0}{" "}
                          mark
                          {Number(
                            question.marks
                          ) === 1
                            ? ""
                            : "s"}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {question.questionText ||
                          "No question text added yet."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 self-end sm:self-auto">
                    {/* Move Up */}
                    <button
                      type="button"
                      onClick={() =>
                        moveQuestion(
                          question.id,
                          "up"
                        )
                      }
                      disabled={index === 0}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label="Move question up"
                    >
                      <ChevronUp size={16} />
                    </button>

                    {/* Move Down */}
                    <button
                      type="button"
                      onClick={() =>
                        moveQuestion(
                          question.id,
                          "down"
                        )
                      }
                      disabled={
                        index ===
                        questions.length - 1
                      }
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label="Move question down"
                    >
                      <ChevronDown size={16} />
                    </button>

                    {/* Duplicate */}
                    <button
                      type="button"
                      onClick={() =>
                        duplicateQuestion(
                          question.id
                        )
                      }
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                      aria-label="Duplicate question"
                    >
                      <Copy size={16} />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() =>
                        removeQuestion(
                          question.id
                        )
                      }
                      disabled={
                        questions.length === 1
                      }
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label="Delete question"
                    >
                      <Trash2 size={16} />
                    </button>

                    {/* Expand / Collapse */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedQuestionId(
                          isExpanded
                            ? null
                            : question.id
                        )
                      }
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                      aria-label={
                        isExpanded
                          ? "Collapse question"
                          : "Expand question"
                      }
                    >
                      {isExpanded ? (
                        <ChevronUp size={17} />
                      ) : (
                        <ChevronDown size={17} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Validation Error */}
                {questionError && (
                  <div className="flex items-center gap-2 border-b border-red-100 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                    <AlertCircle size={15} />

                    {questionError}
                  </div>
                )}

                {/* Question Editor */}
                {isExpanded && (
                  <div className="space-y-5 p-4 sm:p-6">
                    {/* Type + Marks */}
                    <div className="grid gap-4 md:grid-cols-[1fr_160px]">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Question Type
                        </label>

                        <select
                          value={question.type}
                          onChange={(event) =>
                            updateQuestion(
                              question.id,
                              "type",
                              event.target.value
                            )
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          {QUESTION_TYPES.map(
                            (type) => (
                              <option
                                key={type.value}
                                value={type.value}
                              >
                                {type.label}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Marks
                        </label>

                        <input
                          type="number"
                          min="1"
                          value={question.marks}
                          onChange={(event) =>
                            updateQuestion(
                              question.id,
                              "marks",
                              event.target.value
                            )
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    {/* Question Text */}
                    <div>
                      <label
                        htmlFor={`question-${question.id}`}
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Question

                        <span className="ml-1 text-red-500">
                          *
                        </span>
                      </label>

                      <textarea
                        id={`question-${question.id}`}
                        rows={4}
                        value={
                          question.questionText
                        }
                        onChange={(event) =>
                          updateQuestion(
                            question.id,
                            "questionText",
                            event.target.value
                          )
                        }
                        placeholder="Enter the question..."
                        className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {/* Multiple Choice */}
                    {question.type ===
                      "multiple-choice" && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-800">
                            Answer Options
                          </h4>

                          <p className="mt-1 text-xs text-slate-500">
                            Add four options and
                            select the correct
                            answer.
                          </p>
                        </div>

                        <div className="grid gap-3">
                          {question.options.map(
                            (
                              option,
                              optionIndex
                            ) => {
                              const letter =
                                String.fromCharCode(
                                  65 +
                                    optionIndex
                                );

                              const isCorrect =
                                question.correctAnswer ===
                                letter;

                              return (
                                <div
                                  key={letter}
                                  className={`flex items-center gap-3 rounded-lg border p-3 transition ${
                                    isCorrect
                                      ? "border-green-200 bg-green-50"
                                      : "border-slate-200 bg-slate-50/50"
                                  }`}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateQuestion(
                                        question.id,
                                        "correctAnswer",
                                        letter
                                      )
                                    }
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition ${
                                      isCorrect
                                        ? "border-green-600 bg-green-600 text-white"
                                        : "border-slate-300 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-600"
                                    }`}
                                    aria-label={`Mark option ${letter} as correct`}
                                  >
                                    {isCorrect ? (
                                      <Check
                                        size={
                                          15
                                        }
                                      />
                                    ) : (
                                      letter
                                    )}
                                  </button>

                                  <input
                                    type="text"
                                    value={
                                      option
                                    }
                                    onChange={(
                                      event
                                    ) =>
                                      updateOption(
                                        question.id,
                                        optionIndex,
                                        event
                                          .target
                                          .value
                                      )
                                    }
                                    placeholder={`Option ${letter}`}
                                    className="min-w-0 flex-1 border-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0"
                                  />
                                </div>
                              );
                            }
                          )}
                        </div>

                        {question.correctAnswer && (
                          <div className="flex items-center gap-2 text-xs font-medium text-green-700">
                            <CheckCircle2
                              size={15}
                            />

                            Correct answer:
                            Option{" "}
                            {
                              question.correctAnswer
                            }
                          </div>
                        )}
                      </div>
                    )}

                    {/* True / False */}
                    {question.type ===
                      "true-false" && (
                      <div>
                        <h4 className="mb-3 text-sm font-semibold text-slate-800">
                          Correct Answer
                        </h4>

                        <div className="grid gap-3 sm:grid-cols-2">
                          {[
                            "True",
                            "False",
                          ].map(
                            (answer) => {
                              const isSelected =
                                question.correctAnswer ===
                                answer;

                              return (
                                <button
                                  key={answer}
                                  type="button"
                                  onClick={() =>
                                    updateQuestion(
                                      question.id,
                                      "correctAnswer",
                                      answer
                                    )
                                  }
                                  className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm font-semibold transition ${
                                    isSelected
                                      ? "border-green-300 bg-green-50 text-green-700"
                                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                                  }`}
                                >
                                  <span>
                                    {answer}
                                  </span>

                                  {isSelected && (
                                    <CheckCircle2
                                      size={
                                        18
                                      }
                                    />
                                  )}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}

                    {/* Short Answer */}
                    {question.type ===
                      "short-answer" && (
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Expected Answer

                          <span className="ml-1 text-red-500">
                            *
                          </span>
                        </label>

                        <textarea
                          rows={3}
                          value={
                            question.expectedAnswer
                          }
                          onChange={(event) =>
                            updateQuestion(
                              question.id,
                              "expectedAnswer",
                              event.target.value
                            )
                          }
                          placeholder="Enter the expected answer..."
                          className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <p className="mt-2 text-xs text-slate-500">
                          The expected answer will
                          be used as the reference
                          when reviewing the student's
                          response.
                        </p>
                      </div>
                    )}

                    {/* Essay */}
                    {question.type ===
                      "essay" && (
                      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                        <div className="flex items-start gap-3">
                          <Info
                            size={17}
                            className="mt-0.5 shrink-0 text-amber-600"
                          />

                          <div>
                            <p className="text-sm font-semibold text-amber-800">
                              Essay question
                            </p>

                            <p className="mt-1 text-xs leading-5 text-amber-700">
                              Students will provide
                              a written response. The
                              teacher will review and
                              grade this question
                              manually after
                              submission.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          }
        )}

        {/* Add Another Question */}
        <button
          type="button"
          onClick={addQuestion}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-5 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          <Plus size={18} />
          Add Another Question
        </button>
      </section>

      {/* =====================================================
          CONFIGURATION WARNING
      ====================================================== */}
      {(!isQuestionCountMatched ||
        !isMarksMatched) && (
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0 text-amber-600"
            />

            <div>
              <h3 className="text-sm font-semibold text-amber-800">
                Examination configuration needs
                attention
              </h3>

              <div className="mt-2 space-y-1 text-xs leading-5 text-amber-700">
                {!isQuestionCountMatched && (
                  <p>
                    • Configured questions:{" "}
                    <strong>
                      {configuredQuestionCount}
                    </strong>
                    , currently added:{" "}
                    <strong>
                      {questionCount}
                    </strong>
                    .
                  </p>
                )}

                {!isMarksMatched && (
                  <p>
                    • Configured marks:{" "}
                    <strong>
                      {configuredTotalMarks}
                    </strong>
                    , currently assigned:{" "}
                    <strong>
                      {totalMarks}
                    </strong>
                    .
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          BOTTOM ACTIONS
      ====================================================== */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="flex flex-col gap-3 sm:flex-row">
          {saved && (
            <div className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700">
              <CheckCircle2 size={17} />
              Draft saved
            </div>
          )}

          <button
            type="button"
            onClick={handleSaveDraft}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Save size={17} />
            Save Draft
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Continue to Review

            <ChevronDown
              size={17}
              className="-rotate-90"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   SUMMARY ITEM
========================================================= */

const SummaryItem = ({
  label,
  value,
}) => {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold text-slate-800">
        {value || "Not set"}
      </p>
    </div>
  );
};

/* =========================================================
   PROGRESS CARD
========================================================= */

const ProgressCard = ({
  label,
  value,
  helper,
  matched,
}) => {
  return (
    <div
      className={`rounded-xl border bg-white p-4 shadow-sm ${
        matched
          ? "border-green-200"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">
          {label}
        </p>

        {matched ? (
          <CheckCircle2
            size={18}
            className="text-green-600"
          />
        ) : (
          <AlertCircle
            size={18}
            className="text-amber-500"
          />
        )}
      </div>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {helper}
      </p>
    </div>
  );
};

export default ExaminationQuestions;