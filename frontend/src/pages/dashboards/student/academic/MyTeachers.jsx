import {
  BookOpen,
  GraduationCap,
  Mail,
  UsersRound,
} from "lucide-react";

const teachers = [
  {
    id: "TEA001",
    name: "Mr. Daniel",
    position: "Mathematics Teacher",
    subject: "Mathematics",
    email: "daniel@ggss.edu.et",
    initials: "MD",
  },
  {
    id: "TEA002",
    name: "Mr. Samuel",
    position: "Physics Teacher",
    subject: "Physics",
    email: "samuel@ggss.edu.et",
    initials: "MS",
  },
  {
    id: "TEA003",
    name: "Ms. Hana",
    position: "English Teacher",
    subject: "English",
    email: "hana@ggss.edu.et",
    initials: "MH",
  },
  {
    id: "TEA004",
    name: "Ms. Ruth",
    position: "Biology Teacher",
    subject: "Biology",
    email: "ruth@ggss.edu.et",
    initials: "MR",
  },
  {
    id: "TEA005",
    name: "Mr. Michael",
    position: "Chemistry Teacher",
    subject: "Chemistry",
    email: "michael@ggss.edu.et",
    initials: "MM",
  },
  {
    id: "TEA006",
    name: "Mr. Abraham",
    position: "Information Technology Teacher",
    subject: "Information Technology",
    email: "abraham@ggss.edu.et",
    initials: "MA",
  },
];

const MyTeachers = () => {
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

          <span>My Teachers</span>
        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          My Teachers
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          View the teachers responsible for your current subjects
          and academic learning.
        </p>
      </div>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                My Teachers
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {teachers.length}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Currently assigned teachers
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
              <UsersRound size={21} />
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Current Class
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                Grade 10-A
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Academic Year 2026/27
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
              <GraduationCap size={21} />
            </div>
          </div>
        </article>
      </section>

      {/* Teachers */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Teachers Assigned to Me
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Teachers currently connected to your subjects.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {teachers.map((teacher) => (
            <article
              key={teacher.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              {/* Teacher */}
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-900 text-sm font-semibold text-white">
                  {teacher.initials}
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900">
                    {teacher.name}
                  </h3>

                  <p className="mt-1 text-sm text-blue-800">
                    {teacher.position}
                  </p>
                </div>
              </div>

              {/* Subject */}
              <div className="mt-6 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-2">
                  <BookOpen
                    size={17}
                    className="text-slate-400"
                  />

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Teaching Subject
                  </p>
                </div>

                <span className="mt-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">
                  {teacher.subject}
                </span>
              </div>

              {/* Contact */}
              <div className="mt-5 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-2">
                  <Mail
                    size={16}
                    className="shrink-0 text-slate-400"
                  />

                  <span className="truncate text-sm text-slate-600">
                    {teacher.email}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Backend Preparation */}
      <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
            <UsersRound size={18} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Teacher information
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Teacher information is currently frontend mock data.
              Later, teachers will be loaded from the student's
              grade, section, subject, and enrollment relationships.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyTeachers;

