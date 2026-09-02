import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Flag,
  Send,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const exam = {
  id: 1,
  title: "Mathematics Mid-Term Examination",
  subject: "Mathematics",
  duration: 90,
  questions: [
    {
      id: 1,
      question: "What is the value of x if 2x + 4 = 10?",
      options: ["2", "3", "4", "5"],
      answer: "3",
    },
    {
      id: 2,
      question: "Which expression represents the area of a rectangle?",
      options: [
        "Length + Width",
        "Length × Width",
        "2 × Length",
        "Length ÷ Width",
      ],
      answer: "Length × Width",
    },
    {
      id: 3,
      question: "What is the solution of x² = 25?",
      options: ["x = 2", "x = 3", "x = ±5", "x = 10"],
      answer: "x = ±5",
    },
    {
      id: 4,
      question: "Which of the following is a linear equation?",
      options: [
        "x² + 2 = 0",
        "2x + 5 = 10",
        "x³ = 8",
        "xy = 20",
      ],
      answer: "2x + 5 = 10",
    },
    {
      id: 5,
      question: "What is the value of 5²?",
      options: ["10", "15", "20", "25"],
      answer: "25",
    },
  ],
};

const TakeExamination = () => {
  const navigate = useNavigate();
  const { examId } = useParams();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const question = exam.questions[currentQuestion];

  const answeredCount = Object.keys(answers).length;

  const progress = useMemo(() => {
    return (answeredCount / exam.questions.length) * 100;
  }, [answeredCount]);

  /*
   * Submit examination.
   *
   * useCallback keeps this function stable enough for the timer effect
   * and avoids accessing a function before it has been declared.
   */
  const handleSubmitExam = useCallback(() => {
    if (submitted) {
      return;
    }

    setShowSubmitModal(false);
    setSubmitted(true);

    navigate(`/student-dashboard/examinations/${examId}/result`, {
      state: {
        answers,
        questions: exam.questions,
        examTitle: exam.title,
      },
    });
  }, [answers, examId, navigate, submitted]);

  /*
   * Examination timer.
   *
   * When the timer reaches zero, the examination is automatically
   * submitted.
   */
 useEffect(() => {
  if (submitted || timeLeft <= 0) {
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((previousTime) => {
      if (previousTime <= 1) {
        clearInterval(timer);
        return 0;
      }

      return previousTime - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [submitted, timeLeft]);
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(remainingSeconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleAnswer = (answer) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [question.id]: answer,
    }));
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previousQuestion) => previousQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion((previousQuestion) => previousQuestion + 1);
    }
  };

  const answered = Boolean(answers[question.id]);

  return (
    <div className="space-y-5">
      {/* Examination Header */}
      <header className="sticky top-0 z-30 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {exam.subject}
            </p>

            <h1 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
              {exam.title}
            </h1>
          </div>

          <div
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-mono text-sm font-bold ${
              timeLeft <= 300
                ? "bg-red-50 text-red-700"
                : "bg-slate-100 text-slate-900"
            }`}
          >
            <Clock3 className="h-4 w-4" />

            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-slate-100">
          <div
            className="h-full bg-slate-900 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Examination Layout */}
      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        {/* Question Area */}
        <main className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-semibold text-slate-500">
              Question {currentQuestion + 1} of {exam.questions.length}
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Flag className="h-3.5 w-3.5" />

              {answered ? "Answered" : "Not answered"}
            </span>
          </div>

          {/* Question */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold leading-8 text-slate-900 sm:text-xl">
              {question.question}
            </h2>

            {/* Options */}
            <div className="mt-7 space-y-3">
              {question.options.map((option, index) => {
                const selected = answers[question.id] === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleAnswer(option)}
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-slate-900 bg-slate-50"
                        : "border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                        selected
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-300 text-slate-600"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span className="text-sm font-medium text-slate-700">
                      {option}
                    </span>

                    {selected && (
                      <CheckCircle2 className="ml-auto h-5 w-5 text-slate-900" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Navigation */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" />

              Previous
            </button>

            {currentQuestion === exam.questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <Send className="h-4 w-4" />

                Submit Examination
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Next

                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </main>

        {/* Question Navigator */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Question Navigator
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Select a question to jump directly to it.
          </p>

          <div className="mt-5 grid grid-cols-5 gap-2">
            {exam.questions.map((item, index) => {
              const isAnswered = Boolean(answers[item.id]);

              const isCurrent = index === currentQuestion;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentQuestion(index)}
                  className={`flex h-9 items-center justify-center rounded-lg text-xs font-semibold transition ${
                    isCurrent
                      ? "bg-slate-900 text-white"
                      : isAnswered
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
            <LegendItem
              className="bg-slate-900"
              label="Current"
            />

            <LegendItem
              className="bg-emerald-500"
              label="Answered"
            />

            <LegendItem
              className="bg-slate-200"
              label="Not answered"
            />
          </div>

          {/* Answered Count */}
          <div className="mt-5 rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500">
              Answered
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {answeredCount} / {exam.questions.length}
            </p>
          </div>
        </aside>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="p-5 sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <AlertCircle className="h-5 w-5" />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                Submit Examination?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                You have answered {answeredCount} out of{" "}
                {exam.questions.length} questions. Are you sure you want
                to submit your examination?
              </p>

              {answeredCount < exam.questions.length && (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <p className="text-xs font-medium leading-5 text-amber-800">
                    You still have{" "}
                    {exam.questions.length - answeredCount} unanswered
                    question
                    {exam.questions.length - answeredCount !== 1
                      ? "s"
                      : ""}
                    .
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Continue Exam
                </button>

                <button
                  type="button"
                  onClick={handleSubmitExam}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                >
                  <Send className="h-4 w-4" />

                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LegendItem = ({ className, label }) => {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <span className={`h-3 w-3 rounded-sm ${className}`} />

      {label}
    </div>
  );
};

export default TakeExamination;