import { useMemo, useState } from "react";
import {
  Award,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

const EXAM_TYPES = {
  "Class Assessment": [
    "Mid Exam",
    "Final Exam",
    "Unit Exam",
    "Quiz",
    "Practice",
  ],
  "Model Exam": ["Regional Model", "Zonal Model"],
};

const children = [
  {
    id: "GGSS.STU0001",
    name: "Abebe Kebede",
    grade: "Grade 12",
    section: "A",
  },
  {
    id: "GGSS.STU0002",
    name: "Sara Kebede",
    grade: "Grade 9",
    section: "B",
  },
];

const examRecords = [
  // Abebe Kebede: Grade 12
  {
    id: "abebe-mid",
    studentId: "GGSS.STU0001",
    examCategory: "Class Assessment",
    examType: "Mid Exam",
    title: "First Semester Mid Exam",
    date: "2026-09-15",
    subjects: [
      { name: "Mathematics", mark: 90, total: 100 },
      { name: "Physics", mark: 84, total: 100 },
      { name: "Chemistry", mark: 82, total: 100 },
      { name: "English", mark: 88, total: 100 },
      { name: "Biology", mark: 86, total: 100 },
    ],
  },
  {
    id: "abebe-final",
    studentId: "GGSS.STU0001",
    examCategory: "Class Assessment",
    examType: "Final Exam",
    title: "First Semester Final Exam",
    date: "2026-10-10",
    subjects: [
      { name: "Mathematics", mark: 92, total: 100 },
      { name: "Physics", mark: 87, total: 100 },
      { name: "Chemistry", mark: 85, total: 100 },
      { name: "English", mark: 89, total: 100 },
      { name: "Biology", mark: 88, total: 100 },
    ],
  },
  {
    id: "abebe-unit",
    studentId: "GGSS.STU0001",
    examCategory: "Class Assessment",
    examType: "Unit Exam",
    title: "Mathematics Unit Examination",
    date: "2026-10-05",
    subjects: [
      { name: "Mathematics", mark: 94, total: 100 },
      { name: "Physics", mark: 81, total: 100 },
      { name: "Chemistry", mark: 83, total: 100 },
      { name: "English", mark: 86, total: 100 },
      { name: "Biology", mark: 84, total: 100 },
    ],
  },
  {
    id: "abebe-quiz",
    studentId: "GGSS.STU0001",
    examCategory: "Class Assessment",
    examType: "Quiz",
    title: "October Subject Quiz",
    date: "2026-10-14",
    subjects: [
      { name: "Mathematics", mark: 18, total: 20 },
      { name: "Physics", mark: 16, total: 20 },
      { name: "Chemistry", mark: 17, total: 20 },
      { name: "English", mark: 18, total: 20 },
      { name: "Biology", mark: 16, total: 20 },
    ],
  },
  {
    id: "abebe-practice",
    studentId: "GGSS.STU0001",
    examCategory: "Class Assessment",
    examType: "Practice",
    title: "Entrance Exam Practice",
    date: "2026-10-16",
    subjects: [
      { name: "Mathematics", mark: 88, total: 100 },
      { name: "Physics", mark: 78, total: 100 },
      { name: "Chemistry", mark: 81, total: 100 },
      { name: "English", mark: 85, total: 100 },
      { name: "Biology", mark: 80, total: 100 },
    ],
  },
  {
    id: "abebe-regional",
    studentId: "GGSS.STU0001",
    examCategory: "Model Exam",
    examType: "Regional Model",
    title: "Regional Grade 12 Model Exam",
    date: "2026-10-18",
    subjects: [
      { name: "Mathematics", mark: 86, total: 100 },
      { name: "Physics", mark: 76, total: 100 },
      { name: "Chemistry", mark: 79, total: 100 },
      { name: "English", mark: 83, total: 100 },
      { name: "Biology", mark: 78, total: 100 },
    ],
  },
  {
    id: "abebe-zonal",
    studentId: "GGSS.STU0001",
    examCategory: "Model Exam",
    examType: "Zonal Model",
    title: "Zonal Grade 12 Model Exam",
    date: "2026-10-20",
    subjects: [
      { name: "Mathematics", mark: 89, total: 100 },
      { name: "Physics", mark: 80, total: 100 },
      { name: "Chemistry", mark: 82, total: 100 },
      { name: "English", mark: 85, total: 100 },
      { name: "Biology", mark: 81, total: 100 },
    ],
  },

  // Sara Kebede: Grade 9
  {
    id: "sara-mid",
    studentId: "GGSS.STU0002",
    examCategory: "Class Assessment",
    examType: "Mid Exam",
    title: "First Semester Mid Exam",
    date: "2026-09-15",
    subjects: [
      { name: "Mathematics", mark: 93, total: 100 },
      { name: "English", mark: 90, total: 100 },
      { name: "Biology", mark: 89, total: 100 },
      { name: "Physics", mark: 92, total: 100 },
      { name: "Chemistry", mark: 91, total: 100 },
    ],
  },
  {
    id: "sara-final",
    studentId: "GGSS.STU0002",
    examCategory: "Class Assessment",
    examType: "Final Exam",
    title: "First Semester Final Exam",
    date: "2026-10-10",
    subjects: [
      { name: "Mathematics", mark: 95, total: 100 },
      { name: "English", mark: 92, total: 100 },
      { name: "Biology", mark: 91, total: 100 },
      { name: "Physics", mark: 94, total: 100 },
      { name: "Chemistry", mark: 93, total: 100 },
    ],
  },
  {
    id: "sara-unit",
    studentId: "GGSS.STU0002",
    examCategory: "Class Assessment",
    examType: "Unit Exam",
    title: "Mathematics Unit Examination",
    date: "2026-10-05",
    subjects: [
      { name: "Mathematics", mark: 96, total: 100 },
      { name: "English", mark: 89, total: 100 },
      { name: "Biology", mark: 90, total: 100 },
      { name: "Physics", mark: 93, total: 100 },
      { name: "Chemistry", mark: 92, total: 100 },
    ],
  },
  {
    id: "sara-quiz",
    studentId: "GGSS.STU0002",
    examCategory: "Class Assessment",
    examType: "Quiz",
    title: "October Subject Quiz",
    date: "2026-10-14",
    subjects: [
      { name: "Mathematics", mark: 19, total: 20 },
      { name: "English", mark: 18, total: 20 },
      { name: "Biology", mark: 17, total: 20 },
      { name: "Physics", mark: 19, total: 20 },
      { name: "Chemistry", mark: 18, total: 20 },
    ],
  },
  {
    id: "sara-practice",
    studentId: "GGSS.STU0002",
    examCategory: "Class Assessment",
    examType: "Practice",
    title: "Science and Mathematics Practice",
    date: "2026-10-16",
    subjects: [
      { name: "Mathematics", mark: 92, total: 100 },
      { name: "English", mark: 87, total: 100 },
      { name: "Biology", mark: 88, total: 100 },
      { name: "Physics", mark: 91, total: 100 },
      { name: "Chemistry", mark: 90, total: 100 },
    ],
  },
  {
    id: "sara-regional",
    studentId: "GGSS.STU0002",
    examCategory: "Model Exam",
    examType: "Regional Model",
    title: "Regional Academic Model Exam",
    date: "2026-10-18",
    subjects: [
      { name: "Mathematics", mark: 91, total: 100 },
      { name: "English", mark: 88, total: 100 },
      { name: "Biology", mark: 87, total: 100 },
      { name: "Physics", mark: 90, total: 100 },
      { name: "Chemistry", mark: 89, total: 100 },
    ],
  },
  {
    id: "sara-zonal",
    studentId: "GGSS.STU0002",
    examCategory: "Model Exam",
    examType: "Zonal Model",
    title: "Zonal Academic Model Exam",
    date: "2026-10-20",
    subjects: [
      { name: "Mathematics", mark: 94, total: 100 },
      { name: "English", mark: 90, total: 100 },
      { name: "Biology", mark: 89, total: 100 },
      { name: "Physics", mark: 92, total: 100 },
      { name: "Chemistry", mark: 91, total: 100 },
    ],
  },
];

const getPercentage = (mark, total) =>
  total > 0 ? (mark / total) * 100 : 0;

const getGrade = (percentage) => {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  if (percentage >= 50) return "E";
  return "F";
};

const getResult = (percentage) => (percentage >= 50 ? "Pass" : "Fail");

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const getExamStats = (exam) => {
  const totalMarks = exam.subjects.reduce(
    (sum, subject) => sum + subject.mark,
    0
  );

  const maximumMarks = exam.subjects.reduce(
    (sum, subject) => sum + subject.total,
    0
  );

  const percentage = getPercentage(totalMarks, maximumMarks);

  return {
    totalMarks,
    maximumMarks,
    percentage,
    grade: getGrade(percentage),
    result: getResult(percentage),
    passedSubjects: exam.subjects.filter(
      (subject) => getPercentage(subject.mark, subject.total) >= 50
    ).length,
  };
};

const StatCard = ({ icon: Icon, label, value, detail }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
        {detail && (
          <p className="mt-1 text-xs text-slate-500">{detail}</p>
        )}
      </div>
      <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
        <Icon size={21} />
      </div>
    </div>
  </div>
);

const ExaminationResults = () => {
  const [studentId, setStudentId] = useState("GGSS.STU0001");
  const [category, setCategory] = useState("Class Assessment");
  const [examType, setExamType] = useState("Mid Exam");
  const [examId, setExamId] = useState("abebe-mid");

  const selectedChild = children.find(
    (child) => child.id === studentId
  );

  const childExams = useMemo(
    () =>
      examRecords
        .filter((exam) => exam.studentId === studentId)
        .sort((a, b) => a.date.localeCompare(b.date)),
    [studentId]
  );

  const filteredExams = childExams.filter(
    (exam) =>
      (category === "All Categories" ||
        exam.examCategory === category) &&
      (examType === "All Types" || exam.examType === examType)
  );

  const selectedExam =
    filteredExams.find((exam) => exam.id === examId) ||
    filteredExams[0] ||
    null;

  const stats = selectedExam ? getExamStats(selectedExam) : null;

  const subjectInsights = useMemo(() => {
    if (!selectedExam) return { strongest: [], support: [] };

    const subjects = [...selectedExam.subjects].sort(
      (a, b) =>
        getPercentage(b.mark, b.total) -
        getPercentage(a.mark, a.total)
    );

    return {
      strongest: subjects.filter(
        (subject) => getPercentage(subject.mark, subject.total) >= 85
      ),
      support: subjects.filter(
        (subject) => getPercentage(subject.mark, subject.total) < 60
      ),
    };
  }, [selectedExam]);

  const handleChildChange = (newStudentId) => {
    setStudentId(newStudentId);
    setExamId("");
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setExamType("All Types");
    setExamId("");
  };

  const handleTypeChange = (newType) => {
    setExamType(newType);
    setExamId("");
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <GraduationCap size={17} />
            Parent Portal
            <span>/</span>
            Academic
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Examination Results
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Review your child&apos;s examination performance and academic
            progress.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <ClipboardList size={18} className="text-blue-600" />
          {childExams.length} available exams
        </div>
      </div>

      {/* Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen size={19} className="text-blue-600" />
          <h2 className="font-semibold text-slate-900">
            Select Examination
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <label
              htmlFor="child"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Child
            </label>
            <select
              id="child"
              value={studentId}
              onChange={(event) => handleChildChange(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {children.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="exam-category"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Examination Category
            </label>
            <select
              id="exam-category"
              value={category}
              onChange={(event) =>
                handleCategoryChange(event.target.value)
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>All Categories</option>
              {Object.keys(EXAM_TYPES).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="exam-type"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Examination Type
            </label>
            <select
              id="exam-type"
              value={examType}
              onChange={(event) => handleTypeChange(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>All Types</option>
              {(category === "All Categories"
                ? Object.values(EXAM_TYPES).flat()
                : EXAM_TYPES[category]
              ).map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="exam"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Examination
            </label>
            <select
              id="exam"
              value={selectedExam?.id || ""}
              onChange={(event) => setExamId(event.target.value)}
              disabled={filteredExams.length === 0}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
            >
              {filteredExams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="rounded-lg bg-blue-50 px-3 py-2 font-medium text-blue-700">
            {selectedChild?.grade} Section {selectedChild?.section}
          </span>
          <span className="rounded-lg bg-slate-100 px-3 py-2">
            Student ID: {selectedChild?.id}
          </span>
          {selectedExam && (
            <span className="rounded-lg bg-slate-100 px-3 py-2">
              Published sample date: {formatDate(selectedExam.date)}
            </span>
          )}
        </div>
      </section>

      {!selectedExam || !stats ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <ClipboardList
            size={36}
            className="mx-auto text-slate-400"
          />
          <h2 className="mt-3 font-semibold text-slate-900">
            No examination results found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Try choosing another category or examination type.
          </p>
        </div>
      ) : (
        <>
          {/* Selected examination */}
          <section className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-200">
                    {selectedExam.examCategory}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                    {selectedExam.examType}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-bold sm:text-2xl">
                  {selectedExam.title}
                </h2>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-300">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {formatDate(selectedExam.date)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Users size={16} />
                    {selectedChild?.name}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 sm:min-w-36 sm:text-center">
                <p className="text-sm text-slate-300">Overall percentage</p>
                <p className="mt-1 text-4xl font-bold">
                  {stats.percentage.toFixed(1)}%
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  {stats.result}
                </p>
              </div>
            </div>
          </section>

          {/* Summary cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={Award}
              label="Total Marks"
              value={`${stats.totalMarks} / ${stats.maximumMarks}`}
              detail="Across all listed subjects"
            />
            <StatCard
              icon={BarChart3}
              label="Overall Grade"
              value={stats.grade}
              detail="Based on the sample grading scale"
            />
            <StatCard
              icon={CheckCircle2}
              label="Subjects Passed"
              value={`${stats.passedSubjects} / ${selectedExam.subjects.length}`}
              detail="Pass mark: 50%"
            />
            <StatCard
              icon={TrendingUp}
              label="Subject Average"
              value={`${stats.percentage.toFixed(1)}%`}
              detail="Average across listed subjects"
            />
          </section>

          {/* Subject results table */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Subject-by-Subject Results
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Detailed marks for {selectedChild?.name}.
                </p>
              </div>
              <span className="self-start rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                {selectedExam.subjects.length} subjects
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Subject</th>
                    <th className="px-5 py-4 font-semibold">Marks</th>
                    <th className="px-5 py-4 font-semibold">Percentage</th>
                    <th className="px-5 py-4 font-semibold">Grade</th>
                    <th className="px-5 py-4 font-semibold">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedExam.subjects.map((subject) => {
                    const percentage = getPercentage(
                      subject.mark,
                      subject.total
                    );
                    const passed = percentage >= 50;

                    return (
                      <tr
                        key={subject.name}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4 font-medium text-slate-800">
                          {subject.name}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {subject.mark} / {subject.total}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-blue-600"
                                style={{
                                  width: `${Math.min(percentage, 100)}%`,
                                }}
                              />
                            </div>
                            <span className="font-medium text-slate-700">
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-semibold text-slate-700">
                          {getGrade(percentage)}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                              passed
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {passed ? (
                              <CheckCircle2 size={13} />
                            ) : (
                              <XCircle size={13} />
                            )}
                            {getResult(percentage)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-500">
              Sample grading scale: A ≥ 90, B ≥ 80, C ≥ 70, D ≥ 60,
              E ≥ 50, F below 50. Confirm the official school grading
              policy before production.
            </div>
          </section>

          {/* Performance insights */}
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                  <TrendingUp size={21} />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Strong Subjects
                  </h2>
                  <p className="text-sm text-slate-500">
                    Scores of 85% or above
                  </p>
                </div>
              </div>

              {subjectInsights.strongest.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {subjectInsights.strongest.map((subject) => (
                    <span
                      key={subject.name}
                      className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800"
                    >
                      {subject.name}:{" "}
                      {getPercentage(
                        subject.mark,
                        subject.total
                      ).toFixed(1)}
                      %
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">
                  No subjects have reached 85% in this examination.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-amber-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                  <BookOpen size={21} />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Subjects Needing Support
                  </h2>
                  <p className="text-sm text-slate-500">
                    Scores below 60%
                  </p>
                </div>
              </div>

              {subjectInsights.support.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {subjectInsights.support.map((subject) => (
                    <span
                      key={subject.name}
                      className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800"
                    >
                      {subject.name}:{" "}
                      {getPercentage(
                        subject.mark,
                        subject.total
                      ).toFixed(1)}
                      %
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-600">
                  No subjects are below 60% in this examination.
                  Continue supporting consistent study habits.
                </p>
              )}
            </div>
          </section>

          {/* Performance history */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <BarChart3 size={21} />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">
                  Examination Performance History
                </h2>
                <p className="text-sm text-slate-500">
                  Compare this child&apos;s available examination results.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {childExams.map((exam) => {
                const examStats = getExamStats(exam);
                const isSelected = exam.id === selectedExam.id;

                return (
                  <button
                    key={exam.id}
                    type="button"
                    onClick={() => {
                      setCategory("All Categories");
                      setExamType("All Types");
                      setExamId(exam.id);
                    }}
                    className={`block w-full rounded-xl p-3 text-left transition ${
                      isSelected
                        ? "bg-blue-50 ring-1 ring-blue-200"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {exam.examType}
                          {isSelected && (
                            <span className="ml-2 text-xs font-semibold text-blue-700">
                              Selected
                            </span>
                          )}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {exam.title} · {formatDate(exam.date)}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-slate-900">
                        {examStats.percentage.toFixed(1)}%
                      </p>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${
                          examStats.percentage >= 50
                            ? "bg-blue-600"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${Math.min(
                            examStats.percentage,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Select any examination above to review its detailed results.
              All scores shown here are demonstration data.
            </p>
          </section>
        </>
      )}

      {/* Parent guidance */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-white p-3 text-blue-700">
            <GraduationCap size={21} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">
              Supporting Your Child&apos;s Progress
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review results regularly, celebrate improvement, and
              encourage a balanced study routine. For Grade 12 students,
              use Regional and Zonal Model Exam results to identify
              areas that need more preparation for the university
              entrance examination.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExaminationResults;