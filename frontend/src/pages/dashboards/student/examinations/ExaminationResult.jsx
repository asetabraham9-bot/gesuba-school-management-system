import {
  ArrowLeft,
  Award,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  XCircle,
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const examinationResults = {
  1: {
    title: "Mathematics Mid-Term Examination",
    subject: "Mathematics",
    score: 34,
    totalQuestions: 40,
    percentage: 85,
  },

  2: {
    title: "Biology Unit Examination",
    subject: "Biology",
    score: 25,
    totalQuestions: 30,
    percentage: 83,
  },

  3: {
    title: "Computer Science Fundamentals",
    subject: "Computer Science",
    score: 29,
    totalQuestions: 35,
    percentage: 83,
  },

  4: {
    title: "English Grammar Examination",
    subject: "English",
    score: 21,
    totalQuestions: 25,
    percentage: 84,
  },

  5: {
    title: "Mathematics Practice Examination",
    subject: "Mathematics",
    score: 25,
    totalQuestions: 30,
    percentage: 83,
  },
};

const ExaminationResult = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { examId } = useParams();

  /*
   * If the student has just submitted an examination,
   * TakeExamination.jsx sends the questions and answers
   * through navigation state.
   *
   * Otherwise, we fall back to the mock result data.
   */
  const submittedQuestions = location.state?.questions || [];
  const submittedAnswers = location.state?.answers || {};

  const storedResult = examinationResults[examId];

  const examTitle =
    location.state?.examTitle ||
    storedResult?.title ||
    "Examination Result";

  const examSubject =
    storedResult?.subject || "Academic Examination";

  /*
   * Calculate the result from the submitted answers when
   * the student has just completed an examination.
   */
  let score = storedResult?.score || 0;

  let totalQuestions =
    storedResult?.totalQuestions || 0;

  let percentage =
    storedResult?.percentage || 0;

  if (submittedQuestions.length > 0) {
    score = submittedQuestions.reduce(
      (totalScore, question) => {
        return (
          totalScore +
          (submittedAnswers[question.id] === question.answer ? 1 : 0)
        );
      },
      0
    );

    totalQuestions = submittedQuestions.length;

    percentage =
      totalQuestions > 0
        ? Math.round((score / totalQuestions) * 100)
        : 0;
  }

  const incorrectAnswers = totalQuestions - score;

  const passed = percentage >= 50;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate("/student-dashboard/examinations")}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />

          Back to Examinations
        </button>

        <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
          Examination Result
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review your performance in the completed examination.
        </p>
      </div>

      {/* Result Hero */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-slate-900 px-5 py-8 text-center text-white sm:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <Award className="h-8 w-8" />
          </div>

          <p className="mt-5 text-sm text-slate-300">
            {examSubject}
          </p>

          <h2 className="mt-2 text-xl font-bold">
            {examTitle}
          </h2>

          <p className="mt-4 text-4xl font-bold">
            {percentage}%
          </p>

          <p className="mt-2 text-sm text-slate-300">
            {score} out of {totalQuestions} questions correct
          </p>

          <div className="mt-5">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                passed
                  ? "bg-emerald-500/20 text-emerald-200"
                  : "bg-red-500/20 text-red-200"
              }`}
            >
              {passed ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}

              {passed ? "Passed" : "Needs Improvement"}
            </span>
          </div>
        </div>

        {/* Result Summary */}
        <div className="grid divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <ResultStat
            icon={ClipboardCheck}
            label="Score"
            value={`${score} / ${totalQuestions}`}
          />

          <ResultStat
            icon={Award}
            label="Percentage"
            value={`${percentage}%`}
          />

          <ResultStat
            icon={FileText}
            label="Status"
            value={passed ? "Passed" : "Not Passed"}
          />
        </div>
      </section>

      {/* Performance */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="font-semibold text-slate-900">
            Performance Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Overview of your examination performance.
          </p>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
          <PerformanceCard
            icon={CheckCircle2}
            label="Correct Answers"
            value={score}
            wrapper="bg-emerald-50 text-emerald-600"
          />

          <PerformanceCard
            icon={XCircle}
            label="Incorrect Answers"
            value={incorrectAnswers}
            wrapper="bg-red-50 text-red-600"
          />

          <PerformanceCard
            icon={FileText}
            label="Total Questions"
            value={totalQuestions}
            wrapper="bg-slate-100 text-slate-600"
          />
        </div>
      </section>

      {/* Answer Review */}
      {submittedQuestions.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="font-semibold text-slate-900">
              Answer Review
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review your submitted answers.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {submittedQuestions.map((question, index) => {
              const studentAnswer = submittedAnswers[question.id];

              const isCorrect =
                studentAnswer === question.answer;

              return (
                <div
                  key={question.id}
                  className="p-5 sm:p-6"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 rounded-full p-1.5 ${
                        isCorrect
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Question {index + 1}
                      </p>

                      <p className="mt-2 text-sm font-medium leading-6 text-slate-900">
                        {question.question}
                      </p>

                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <div className="rounded-lg bg-slate-50 p-3">
                          <p className="text-xs text-slate-500">
                            Your Answer
                          </p>

                          <p className="mt-1 text-sm font-medium text-slate-900">
                            {studentAnswer || "Not answered"}
                          </p>
                        </div>

                        <div className="rounded-lg bg-slate-50 p-3">
                          <p className="text-xs text-slate-500">
                            Correct Answer
                          </p>

                          <p className="mt-1 text-sm font-medium text-slate-900">
                            {question.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Bottom Action */}
      <div className="flex justify-center pb-4">
        <button
          type="button"
          onClick={() =>
            navigate("/student-dashboard/examinations")
          }
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />

          Return to Examinations
        </button>
      </div>
    </div>
  );
};

const ResultStat = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-center gap-3 p-5 sm:p-6">
      <div className="rounded-lg bg-slate-100 p-2.5 text-slate-600">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <p className="text-xs text-slate-500">
          {label}
        </p>

        <p className="mt-1 text-sm font-bold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
};

const PerformanceCard = ({
  icon: Icon,
  label,
  value,
  wrapper,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2.5 ${wrapper}`}>
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <p className="text-xs text-slate-500">
            {label}
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExaminationResult;