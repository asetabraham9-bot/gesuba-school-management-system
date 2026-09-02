import {
  AlertCircle,
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ClipboardCheck,
  FileText,
  Search,
  Timer,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const examinations = [
  {
    id: 1,
    title: "Mathematics Mid-Term Examination",
    subject: "Mathematics",
    type: "Mid-Term",
    date: "September 15, 2026",
    time: "9:00 AM",
    duration: "90 minutes",
    status: "Upcoming",
    description:
      "Assessment covering algebra, equations, functions, and introductory geometry.",
    questions: 40,
  },
  {
    id: 2,
    title: "Biology Unit Examination",
    subject: "Biology",
    type: "Unit Exam",
    date: "September 18, 2026",
    time: "10:00 AM",
    duration: "60 minutes",
    status: "Upcoming",
    description:
      "Assessment covering cell structure, cell functions, and biological organization.",
    questions: 30,
  },
  {
    id: 3,
    title: "Computer Science Fundamentals",
    subject: "Computer Science",
    type: "Unit Exam",
    date: "September 20, 2026",
    time: "2:00 PM",
    duration: "75 minutes",
    status: "Upcoming",
    description:
      "Assessment covering programming fundamentals, algorithms, and problem solving.",
    questions: 35,
  },
  {
    id: 4,
    title: "English Grammar Examination",
    subject: "English",
    type: "Quiz",
    date: "August 28, 2026",
    time: "11:00 AM",
    duration: "45 minutes",
    status: "Completed",
    description:
      "Assessment covering grammar fundamentals, sentence structure, and vocabulary.",
    questions: 25,
    score: "21 / 25",
    percentage: "84%",
  },
  {
    id: 5,
    title: "Mathematics Practice Examination",
    subject: "Mathematics",
    type: "Practice",
    date: "August 20, 2026",
    time: "9:00 AM",
    duration: "60 minutes",
    status: "Completed",
    description:
      "Practice examination covering previously completed mathematics topics.",
    questions: 30,
    score: "25 / 30",
    percentage: "83%",
  },
];

const Examinations = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const [activeFilter, setActiveFilter] = useState("All");

  const filteredExaminations = useMemo(() => {
    return examinations.filter((exam) => {
      const normalizedSearchTerm = searchTerm
        .trim()
        .toLowerCase();

      const matchesSearch =
        exam.title.toLowerCase().includes(normalizedSearchTerm) ||
        exam.subject.toLowerCase().includes(normalizedSearchTerm) ||
        exam.type.toLowerCase().includes(normalizedSearchTerm);

      const matchesFilter =
        activeFilter === "All" ||
        exam.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  const upcomingCount = examinations.filter(
    (exam) => exam.status === "Upcoming"
  ).length;

  const completedCount = examinations.filter(
    (exam) => exam.status === "Completed"
  ).length;

  const averageScore = 83.5;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Examinations
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View your upcoming examinations, completed exams,
          and results.
        </p>
      </div>

      {/* Summary Cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          icon={ClipboardCheck}
          label="Total Exams"
          value={examinations.length}
          description="Available records"
          iconWrapper="bg-slate-100 text-slate-700"
        />

        <SummaryCard
          icon={CalendarDays}
          label="Upcoming"
          value={upcomingCount}
          description="Scheduled examinations"
          iconWrapper="bg-blue-50 text-blue-600"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Completed"
          value={completedCount}
          description="Finished examinations"
          iconWrapper="bg-emerald-50 text-emerald-600"
        />

        <SummaryCard
          icon={Award}
          label="Average Score"
          value={`${averageScore}%`}
          description="Across graded exams"
          iconWrapper="bg-violet-50 text-violet-600"
        />
      </section>

      {/* Important Notice */}
      <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0 rounded-lg bg-white p-2 text-blue-600">
            <AlertCircle className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-blue-900">
              Examination Reminder
            </h2>

            <p className="mt-1 text-sm leading-6 text-blue-800">
              Please make sure you are ready before starting an
              examination. Once an examination begins, the
              available time will be limited according to its
              scheduled duration.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search examinations..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {["All", "Upcoming", "Completed"].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Examination List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Examination List
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredExaminations.length} examination
              {filteredExaminations.length !== 1 ? "s" : ""}{" "}
              found
            </p>
          </div>
        </div>

        {filteredExaminations.length > 0 ? (
          <div className="space-y-4">
            {filteredExaminations.map((exam) => (
              <ExaminationCard
                key={exam.id}
                exam={exam}
                navigate={navigate}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <FileText className="h-5 w-5" />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No examinations found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search term or examination
              filter.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

const SummaryCard = ({
  icon: Icon,
  label,
  value,
  description,
  iconWrapper,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>

        <div className={`rounded-lg p-2.5 ${iconWrapper}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

const ExaminationCard = ({ exam, navigate }) => {
  const isUpcoming = exam.status === "Upcoming";

  const handleViewDetails = () => {
    navigate(`/student-dashboard/examinations/${exam.id}`);
  };

  const handleViewResult = () => {
    navigate(
      `/student-dashboard/examinations/${exam.id}/result`
    );
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 sm:p-6">
      <div className="flex flex-col gap-5">
        {/* Top Row */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="hidden shrink-0 rounded-xl bg-slate-100 p-3 text-slate-700 sm:block">
              <ClipboardCheck className="h-6 w-6" />
            </div>

            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isUpcoming
                      ? "bg-blue-50 text-blue-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {exam.status}
                </span>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {exam.type}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-3 text-base font-semibold text-slate-900 sm:text-lg">
                {exam.title}
              </h3>

              <p className="mt-1 text-sm font-medium text-slate-600">
                {exam.subject}
              </p>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                {exam.description}
              </p>
            </div>
          </div>

          {/* Action */}
          <div className="shrink-0">
            {isUpcoming ? (
              <button
                type="button"
                onClick={handleViewDetails}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 lg:w-auto"
              >
                View Details

                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleViewResult}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 lg:w-auto"
              >
                View Result

                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Examination Details */}
        <div className="grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          <DetailItem
            icon={CalendarDays}
            label="Date"
            value={exam.date}
          />

          <DetailItem
            icon={Clock3}
            label="Start Time"
            value={exam.time}
          />

          <DetailItem
            icon={Timer}
            label="Duration"
            value={exam.duration}
          />

          <DetailItem
            icon={FileText}
            label="Questions"
            value={`${exam.questions} questions`}
          />
        </div>

        {/* Result */}
        {!isUpcoming && exam.score && (
          <div className="flex flex-col gap-3 rounded-xl bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white p-2 text-emerald-600">
                <Award className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                  Examination Result
                </p>

                <p className="mt-1 text-sm font-semibold text-emerald-900">
                  {exam.score}
                </p>
              </div>
            </div>

            <span className="text-lg font-bold text-emerald-700">
              {exam.percentage}
            </span>
          </div>
        )}
      </div>
    </article>
  );
};

const DetailItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
      <div className="shrink-0 text-slate-500">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-medium text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
};

export default Examinations;