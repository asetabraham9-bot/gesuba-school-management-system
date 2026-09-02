import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
} from "lucide-react";

const subjects = [
  {
    id: "SUB001",
    name: "Mathematics",
    code: "MATH-10",
    teacher: "Mr. Daniel",
    lessons: 24,
    completedLessons: 20,
    result: "88%",
  },
  {
    id: "SUB002",
    name: "Physics",
    code: "PHYS-10",
    teacher: "Mr. Samuel",
    lessons: 22,
    completedLessons: 17,
    result: "82%",
  },
  {
    id: "SUB003",
    name: "English",
    code: "ENG-10",
    teacher: "Ms. Hana",
    lessons: 20,
    completedLessons: 19,
    result: "91%",
  },
  {
    id: "SUB004",
    name: "Biology",
    code: "BIO-10",
    teacher: "Ms. Ruth",
    lessons: 21,
    completedLessons: 16,
    result: "79%",
  },
  {
    id: "SUB005",
    name: "Chemistry",
    code: "CHEM-10",
    teacher: "Mr. Michael",
    lessons: 23,
    completedLessons: 18,
    result: "86%",
  },
  {
    id: "SUB006",
    name: "Information Technology",
    code: "IT-10",
    teacher: "Mr. Abraham",
    lessons: 18,
    completedLessons: 15,
    result: "90%",
  },
];

const MySubjects = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <GraduationCap size={17} />

          <span>Student Portal</span>

          <span>/</span>

          <span>Academic</span>

          <span>/</span>

          <span>My Subjects</span>
        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          My Subjects
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          View the subjects you are currently enrolled in and
          monitor your learning progress.
        </p>
      </div>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Subjects
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {subjects.length}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
              <BookOpen size={20} />
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Subjects
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {subjects.length}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Academic Year
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                2026/27
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
              <CalendarDays size={20} />
            </div>
          </div>
        </article>
      </section>

      {/* Subjects */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Enrolled Subjects
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your current subjects and learning progress.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {subjects.map((subject) => {
            const progress = Math.round(
              (subject.completedLessons / subject.lessons) * 100
            );

            return (
              <article
                key={subject.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                    <BookOpen size={21} />
                  </div>

                  <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    Active
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {subject.name}
                </h3>

                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  {subject.code}
                </p>

                <div className="mt-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Teacher
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {subject.teacher}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">
                      Current Result
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {subject.result}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-400">
                      Lessons
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {subject.completedLessons}/{subject.lessons}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      Learning Progress
                    </span>

                    <span className="text-xs font-semibold text-slate-700">
                      {progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-900 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <Clock3 size={15} />

                  <span>
                    Schedule available in class timetable
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Backend Preparation */}
      <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
            <BookOpen size={18} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Subject enrollment
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              These records are currently frontend mock data.
              During backend integration, subjects will be loaded
              from the authenticated student's enrollment and
              academic relationships.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MySubjects;
