import { useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  FileText,
  Plus,
  Search,
  UsersRound,
} from "lucide-react";

const mockLessons = [
  {
    id: "LESSON001",
    title: "Introduction to Algebra",
    subject: "Mathematics",
    grade: "Grade 9",
    section: "A",
    date: "September 8, 2026",
    status: "Published",
    description:
      "Introduction to algebraic expressions, variables, constants, and basic operations.",
  },
  {
    id: "LESSON002",
    title: "Linear Equations",
    subject: "Mathematics",
    grade: "Grade 9",
    section: "B",
    date: "September 9, 2026",
    status: "Published",
    description:
      "Understanding and solving basic linear equations using algebraic operations.",
  },
  {
    id: "LESSON003",
    title: "Cell Structure",
    subject: "Biology",
    grade: "Grade 10",
    section: "A",
    date: "September 10, 2026",
    status: "Draft",
    description:
      "Overview of cell structures, organelles, and their primary functions.",
  },
  {
    id: "LESSON004",
    title: "Chemical Reactions",
    subject: "Chemistry",
    grade: "Grade 10",
    section: "B",
    date: "September 11, 2026",
    status: "Published",
    description:
      "Basic concepts of chemical reactions, reactants, products, and reaction types.",
  },
  {
    id: "LESSON005",
    title: "Introduction to Motion",
    subject: "Physics",
    grade: "Grade 11",
    section: "A",
    date: "September 12, 2026",
    status: "Draft",
    description:
      "Introduction to motion, distance, displacement, speed, and velocity.",
  },
];

const statusStyles = {
  Published:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  Draft:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
};

const TeacherLessons = () => {
  const [lessons] = useState(mockLessons);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const subjects = useMemo(() => {
    return ["All", ...new Set(lessons.map((lesson) => lesson.subject))];
  }, [lessons]);

  const filteredLessons = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return lessons.filter((lesson) => {
      const matchesSearch =
        !normalizedSearch ||
        lesson.title.toLowerCase().includes(normalizedSearch) ||
        lesson.subject.toLowerCase().includes(normalizedSearch) ||
        lesson.grade.toLowerCase().includes(normalizedSearch) ||
        lesson.section.toLowerCase().includes(normalizedSearch);

      const matchesSubject =
        subjectFilter === "All" ||
        lesson.subject === subjectFilter;

      return matchesSearch && matchesSubject;
    });
  }, [lessons, searchTerm, subjectFilter]);

  const handleCreateLesson = () => {
    console.log("Create lesson clicked");
  };

  const handleViewLesson = (lesson) => {
    console.log("View lesson:", lesson);
  };

  return (
    <div className="space-y-6">
      {/* =========================================
          PAGE HEADER
      ========================================= */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <BookOpen size={17} />
            <span>Teaching / LMS</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Lessons
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500 sm:text-base">
            Create, organize, and manage lessons for your assigned
            students.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateLesson}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
        >
          <Plus size={18} />
          Create Lesson
        </button>
      </div>

      {/* =========================================
          SUMMARY CARDS
      ========================================= */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Lessons
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {lessons.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <BookOpen size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Published
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {
                  lessons.filter(
                    (lesson) => lesson.status === "Published"
                  ).length
                }
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <FileText size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Drafts
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {
                  lessons.filter(
                    (lesson) => lesson.status === "Draft"
                  ).length
                }
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
              <FileText size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Subjects
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {subjects.length - 1}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
              <UsersRound size={21} />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          FILTER BAR
      ========================================= */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search lessons, subjects, grades..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Subject filter */}
          <div className="md:w-52">
            <select
              value={subjectFilter}
              onChange={(event) =>
                setSubjectFilter(event.target.value)
              }
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject === "All"
                    ? "All Subjects"
                    : subject}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* =========================================
          LESSON LIST
      ========================================= */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                My Lessons
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredLessons.length} lesson
                {filteredLessons.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <BookOpen
              size={20}
              className="text-slate-400"
            />
          </div>
        </div>

        {filteredLessons.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-5 transition hover:bg-slate-50"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Lesson information */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-slate-900">
                        {lesson.title}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          statusStyles[lesson.status]
                        }`}
                      >
                        {lesson.status}
                      </span>
                    </div>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                      {lesson.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <BookOpen size={15} />
                        {lesson.subject}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <UsersRound size={15} />
                        {lesson.grade} - Section{" "}
                        {lesson.section}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={15} />
                        {lesson.date}
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <button
                    type="button"
                    onClick={() => handleViewLesson(lesson)}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                  >
                    View Lesson
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* =========================================
             EMPTY STATE
          ========================================= */
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <BookOpen size={25} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-slate-900">
              No lessons found
            </h3>

            <p className="mt-1 max-w-md text-sm text-slate-500">
              Try changing your search or subject filter. If you
              haven't created any lessons yet, create your first
              lesson.
            </p>

            <button
              type="button"
              onClick={handleCreateLesson}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              <Plus size={17} />
              Create Lesson
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherLessons;