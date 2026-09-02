
import {
  BookOpen,
  CalendarDays,
  Clock3,
  GraduationCap,
  Search,
} from "lucide-react";
import { useState } from "react";

const lessons = [
  {
    id: 1,
    title: "Introduction to Algebra",
    subject: "Mathematics",
    teacher: "Mathematics Teacher",
    grade: "Grade 10",
    date: "Monday, September 7",
    duration: "45 min",
    status: "Available",
  },
  {
    id: 2,
    title: "Cell Structure and Functions",
    subject: "Biology",
    teacher: "Biology Teacher",
    grade: "Grade 10",
    date: "Tuesday, September 8",
    duration: "40 min",
    status: "Available",
  },
  {
    id: 3,
    title: "Introduction to Programming",
    subject: "Computer Science",
    teacher: "Computer Science Teacher",
    grade: "Grade 10",
    date: "Wednesday, September 9",
    duration: "50 min",
    status: "Available",
  },
  {
    id: 4,
    title: "English Grammar Fundamentals",
    subject: "English",
    teacher: "English Teacher",
    grade: "Grade 10",
    date: "Thursday, September 10",
    duration: "40 min",
    status: "Available",
  },
];

const StudentLessons = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLessons = lessons.filter((lesson) =>    `${lesson.title} ${lesson.subject}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
            <BookOpen size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Lessons
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Access lessons provided by your teachers.
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Lessons */}
      {filteredLessons.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredLessons.map((lesson) => (
            <article
              key={lesson.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                  <GraduationCap size={21} />
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {lesson.status}
                </span>
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-900">
                {lesson.title}
              </h2>

              <p className="mt-1 text-sm font-medium text-blue-800">
                {lesson.subject}
              </p>

              <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <GraduationCap size={16} />
                  <span>{lesson.teacher}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={16} />
                  <span>{lesson.date}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock3 size={16} />
                  <span>{lesson.duration}</span>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                View Lesson
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <BookOpen
            size={30}
            className="mx-auto text-slate-400"
          />

          <h2 className="mt-4 font-semibold text-slate-800">
            No lessons found
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search term.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentLessons;

