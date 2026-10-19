import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  TrendingUp,
  Trophy,
} from "lucide-react";

const academicRecords = {
  "GGSS.STU0001": {
    name: "Abebe Kebede",
    grade: "Grade 12",
    section: "Section A",
    terms: {
      "Term 1": {
        average: 82,
        previousAverage: 78,
        subjects: [
          { name: "Mathematics", score: 90, previous: 85, teacher: "Mr. Daniel" },
          { name: "Physics", score: 84, previous: 80, teacher: "Mr. Daniel" },
          { name: "Chemistry", score: 82, previous: 79, teacher: "Mrs. Hana" },
          { name: "English", score: 88, previous: 85, teacher: "Mrs. Selam" },
          { name: "Biology", score: 76, previous: 72, teacher: "Mr. Samuel" },
        ],
        assessments: [
          { subject: "Mathematics", type: "Assignment", title: "Algebra Practice", score: 18, total: 20, date: "2026-10-03" },
          { subject: "Physics", type: "Quiz", title: "Motion and Force", score: 16, total: 20, date: "2026-10-07" },
          { subject: "Chemistry", type: "Test", title: "Chemical Reactions", score: 39, total: 50, date: "2026-10-11" },
          { subject: "English", type: "Assignment", title: "Essay Writing", score: 19, total: 20, date: "2026-10-14" },
          { subject: "Mathematics", type: "Examination", title: "Midterm Examination", score: 43, total: 50, date: "2026-10-17" },
        ],
        trend: [
          { label: "Term 1", score: 82 },
          { label: "Term 2", score: 85 },
          { label: "Term 3", score: 86 },
        ],
      },
      "Term 2": {
        average: 85,
        previousAverage: 82,
        subjects: [
          { name: "Mathematics", score: 92, previous: 90, teacher: "Mr. Daniel" },
          { name: "Physics", score: 86, previous: 84, teacher: "Mr. Daniel" },
          { name: "Chemistry", score: 85, previous: 82, teacher: "Mrs. Hana" },
          { name: "English", score: 89, previous: 88, teacher: "Mrs. Selam" },
          { name: "Biology", score: 73, previous: 76, teacher: "Mr. Samuel" },
        ],
        assessments: [
          { subject: "Mathematics", type: "Assignment", title: "Functions Worksheet", score: 19, total: 20, date: "2026-10-20" },
          { subject: "Physics", type: "Quiz", title: "Electricity Basics", score: 17, total: 20, date: "2026-10-22" },
          { subject: "Chemistry", type: "Test", title: "Acids and Bases", score: 42, total: 50, date: "2026-10-24" },
          { subject: "English", type: "Assignment", title: "Reading Report", score: 18, total: 20, date: "2026-10-25" },
          { subject: "Biology", type: "Test", title: "Cell Biology", score: 35, total: 50, date: "2026-10-26" },
        ],
        trend: [
          { label: "Term 1", score: 82 },
          { label: "Term 2", score: 85 },
          { label: "Term 3", score: 86 },
        ],
      },
    },
  },

  "GGSS.STU0002": {
    name: "Sara Kebede",
    grade: "Grade 9",
    section: "Section B",
    terms: {
      "Term 1": {
        average: 88,
        previousAverage: 84,
        subjects: [
          { name: "Mathematics", score: 93, previous: 88, teacher: "Mrs. Hana" },
          { name: "English", score: 90, previous: 86, teacher: "Mr. Daniel" },
          { name: "Biology", score: 89, previous: 85, teacher: "Mrs. Selam" },
          { name: "Physics", score: 92, previous: 88, teacher: "Mr. Samuel" },
          { name: "Chemistry", score: 76, previous: 73, teacher: "Mrs. Hana" },
        ],
        assessments: [
          { subject: "Mathematics", type: "Assignment", title: "Number Systems", score: 19, total: 20, date: "2026-10-03" },
          { subject: "English", type: "Quiz", title: "Grammar Review", score: 18, total: 20, date: "2026-10-08" },
          { subject: "Biology", type: "Test", title: "Living Organisms", score: 44, total: 50, date: "2026-10-12" },
          { subject: "Physics", type: "Assignment", title: "Measurements", score: 20, total: 20, date: "2026-10-15" },
          { subject: "Chemistry", type: "Quiz", title: "Matter and Materials", score: 15, total: 20, date: "2026-10-18" },
        ],
        trend: [
          { label: "Term 1", score: 84 },
          { label: "Term 2", score: 86 },
          { label: "Term 3", score: 88 },
        ],
      },
      "Term 2": {
        average: 91,
        previousAverage: 88,
        subjects: [
          { name: "Mathematics", score: 95, previous: 93, teacher: "Mrs. Hana" },
          { name: "English", score: 92, previous: 90, teacher: "Mr. Daniel" },
          { name: "Biology", score: 91, previous: 89, teacher: "Mrs. Selam" },
          { name: "Physics", score: 94, previous: 92, teacher: "Mr. Samuel" },
          { name: "Chemistry", score: 83, previous: 76, teacher: "Mrs. Hana" },
        ],
        assessments: [
          { subject: "Mathematics", type: "Assignment", title: "Algebra Exercises", score: 20, total: 20, date: "2026-10-20" },
          { subject: "English", type: "Quiz", title: "Comprehension", score: 19, total: 20, date: "2026-10-22" },
          { subject: "Biology", type: "Test", title: "Plant Structure", score: 46, total: 50, date: "2026-10-24" },
          { subject: "Physics", type: "Assignment", title: "Simple Machines", score: 19, total: 20, date: "2026-10-25" },
          { subject: "Chemistry", type: "Quiz", title: "Elements and Compounds", score: 17, total: 20, date: "2026-10-27" },
        ],
        trend: [
          { label: "Term 1", score: 84 },
          { label: "Term 2", score: 88 },
          { label: "Term 3", score: 91 },
        ],
      },
    },
  },
};

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function SummaryCard({ title, value, description, icon: Icon, trend }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
          <p className="mt-2 text-xs text-slate-500">{description}</p>
        </div>

        <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
          <Icon size={21} />
        </div>
      </div>

      {trend !== undefined && (
        <div className="mt-4 flex items-center gap-1 text-sm font-medium">
          {trend >= 0 ? (
            <ArrowUpRight size={17} className="text-emerald-600" />
          ) : (
            <ArrowDownRight size={17} className="text-rose-600" />
          )}
          <span className={trend >= 0 ? "text-emerald-700" : "text-rose-700"}>
            {trend > 0 ? "+" : ""}
            {trend} percentage points
          </span>
          <span className="text-slate-400">vs. previous term</span>
        </div>
      )}
    </div>
  );
}

function SubjectRow({ subject }) {
  const difference = subject.score - subject.previous;
  const barColor =
    subject.score >= 85
      ? "bg-emerald-500"
      : subject.score >= 70
        ? "bg-blue-500"
        : "bg-amber-500";

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-semibold text-slate-800">{subject.name}</p>
          <p className="text-xs text-slate-500">{subject.teacher}</p>
        </div>

        <div className="text-right">
          <span className="font-bold text-slate-900">{subject.score}%</span>
          <span
            className={`ml-2 text-xs font-medium ${
              difference >= 0 ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {difference > 0 ? "+" : ""}
            {difference}
          </span>
        </div>
      </div>

      <div
        className="h-2.5 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label={`${subject.name} score`}
        aria-valuenow={subject.score}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${subject.score}%` }}
        />
      </div>
    </div>
  );
}

function ProgressTrend({ points }) {
  const width = 500;
  const height = 190;
  const paddingX = 35;
  const paddingTop = 22;
  const paddingBottom = 35;
  const minScore = 60;
  const maxScore = 100;

  const coordinates = points.map((point, index) => {
    const x =
      points.length === 1
        ? width / 2
        : paddingX +
          (index * (width - paddingX * 2)) / (points.length - 1);

    const y =
      height -
      paddingBottom -
      ((point.score - minScore) / (maxScore - minScore)) *
        (height - paddingTop - paddingBottom);

    return { ...point, x, y };
  });

  const path = coordinates
    .map((point, index) =>
      `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    )
    .join(" ");

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label="Academic average trend across terms"
      >
        {[60, 70, 80, 90, 100].map((score) => {
          const y =
            height -
            paddingBottom -
            ((score - minScore) / (maxScore - minScore)) *
              (height - paddingTop - paddingBottom);

          return (
            <g key={score}>
              <line
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
              />
              <text
                x="5"
                y={y + 4}
                fontSize="11"
                fill="#64748b"
              >
                {score}%
              </text>
            </g>
          );
        })}

        <path
          d={path}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {coordinates.map((point) => (
          <g key={point.label}>
            <circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill="#2563eb"
              stroke="white"
              strokeWidth="2"
            />
            <text
              x={point.x}
              y={point.y - 12}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="#1e293b"
            >
              {point.score}%
            </text>
            <text
              x={point.x}
              y={height - 10}
              textAnchor="middle"
              fontSize="11"
              fill="#64748b"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function AcademicProgress() {
  const childIds = Object.keys(academicRecords);

  const [selectedChildId, setSelectedChildId] = useState(childIds[0]);
  const [selectedTerm, setSelectedTerm] = useState("Term 1");

  const child = academicRecords[selectedChildId];
  const record = child.terms[selectedTerm];

  const assessmentAverage = useMemo(() => {
    const assessments = record.assessments;

    if (!assessments.length) return 0;

    const totalScore = assessments.reduce(
      (sum, item) => sum + item.score,
      0
    );

    const totalPossible = assessments.reduce(
      (sum, item) => sum + item.total,
      0
    );

    return totalPossible
      ? Math.round((totalScore / totalPossible) * 100)
      : 0;
  }, [record]);

  const improvedSubjects = record.subjects.filter(
    (subject) => subject.score > subject.previous
  ).length;

  const needsAttention = record.subjects.filter(
    (subject) => subject.score < 70
  );

  return (
    <div className="space-y-6 pb-8">
      {/* Page heading */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-blue-700">
            <GraduationCap size={18} />
            <span className="font-semibold">Parent Portal</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Academic Progress
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Follow your child&apos;s subject results, assessment scores, and
            academic progress throughout the school year.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-slate-600">Select child</span>
            <select
              value={selectedChildId}
              onChange={(event) => setSelectedChildId(event.target.value)}
              className="min-w-48 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {childIds.map((id) => (
                <option key={id} value={id}>
                  {academicRecords[id].name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-slate-600">Academic term</span>
            <select
              value={selectedTerm}
              onChange={(event) => setSelectedTerm(event.target.value)}
              className="min-w-36 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {Object.keys(child.terms).map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Selected student */}
      <div className="flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white p-3 text-blue-700 shadow-sm">
            <GraduationCap size={25} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">{child.name}</h2>
            <p className="mt-1 text-sm text-slate-600">
              {child.grade} · {child.section} · {selectedTerm}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
          <CalendarDays size={17} />
          Academic year 2026/2027
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Overall average"
          value={`${record.average}%`}
          description="Average across recorded subjects"
          icon={Trophy}
          trend={record.average - record.previousAverage}
        />

        <SummaryCard
          title="Subjects"
          value={record.subjects.length}
          description="Subjects included in this report"
          icon={BookOpen}
        />

        <SummaryCard
          title="Assessment average"
          value={`${assessmentAverage}%`}
          description="Based on listed mock assessments"
          icon={CheckCircle2}
        />

        <SummaryCard
          title="Subjects improved"
          value={`${improvedSubjects}/${record.subjects.length}`}
          description="Compared with previous subject scores"
          icon={TrendingUp}
        />
      </div>

      {/* Subject performance and term trend */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Subject Performance
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Current scores compared with previous scores.
            </p>
          </div>

          <div className="space-y-6">
            {record.subjects.map((subject) => (
              <SubjectRow key={subject.name} subject={subject} />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              85% and above
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              70% to 84%
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              Below 70%
            </span>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-2">
            <h2 className="text-lg font-bold text-slate-900">
              Academic Trend
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Mock overall averages across academic terms.
            </p>
          </div>

          <ProgressTrend points={record.trend} />

          <div className="mt-3 rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">
              Progress insight
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {record.average > record.previousAverage
                ? `The overall average has increased by ${record.average - record.previousAverage} percentage points compared with the previous term.`
                : record.average < record.previousAverage
                  ? `The overall average has decreased by ${record.previousAverage - record.average} percentage points. Review subject results to identify areas needing support.`
                  : "The overall average is unchanged compared with the previous term."}
            </p>
          </div>
        </section>
      </div>

      {/* Attention area */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Areas to Monitor
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Subjects that may benefit from additional attention.
          </p>
        </div>

        {needsAttention.length > 0 ? (
          <div className="space-y-3">
            {needsAttention.map((subject) => (
              <div
                key={subject.name}
                className="flex flex-col gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    {subject.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Consider discussing learning support with {subject.teacher}.
                  </p>
                </div>

                <span className="self-start rounded-full bg-white px-3 py-1 text-sm font-bold text-amber-800 sm:self-center">
                  {subject.score}%
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-700" size={20} />
            <div>
              <p className="font-semibold text-emerald-900">
                No low-scoring subjects flagged
              </p>
              <p className="mt-1 text-sm text-emerald-800">
                Continue encouraging consistent study habits and review each
                subject&apos;s results regularly.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Assessment breakdown */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Assessments
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Assignments, quizzes, tests, and examinations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <BookOpen size={17} />
            {record.assessments.length} records
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Assessment</th>
                <th className="px-5 py-3 font-semibold">Subject</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 text-right font-semibold">Score</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {record.assessments.map((assessment) => {
                const percentage = Math.round(
                  (assessment.score / assessment.total) * 100
                );

                return (
                  <tr
                    key={`${assessment.title}-${assessment.date}`}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-medium text-slate-800">
                      {assessment.title}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {assessment.subject}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {assessment.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {formatDate(assessment.date)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-semibold text-slate-900">
                        {assessment.score}/{assessment.total}
                      </span>
                      <span className="ml-2 text-xs text-slate-500">
                        ({percentage}%)
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
          Sample assessment records for UI development only.
        </div>
      </section>
    </div>
  );
}