import {
  BookOpen,
  Download,
  FileText,
  Search,
} from "lucide-react";
import { useState } from "react";

const materials = [
  {
    id: 1,
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    type: "PDF",
    size: "2.4 MB",
    description:
      "Study notes covering fundamental algebra concepts and examples.",
  },
  {
    id: 2,
    title: "Cell Biology Notes",
    subject: "Biology",
    type: "PDF",
    size: "3.1 MB",
    description:
      "Learning material covering cell structure and biological functions.",
  },
  {
    id: 3,
    title: "Programming Fundamentals",
    subject: "Computer Science",
    type: "PDF",
    size: "4.2 MB",
    description:
      "Introduction to programming concepts, algorithms, and problem solving.",
  },
  {
    id: 4,
    title: "English Grammar Guide",
    subject: "English",
    type: "PDF",
    size: "1.8 MB",
    description:
      "A practical guide to essential English grammar concepts.",
  },
];

const StudyMaterials = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMaterials = materials.filter((material) =>
    `${material.title} ${material.subject}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
            <BookOpen size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Study Materials
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Access learning materials shared by your teachers.
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
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Materials */}
      {filteredMaterials.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredMaterials.map((material) => (
            <article
              key={material.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                  <FileText size={21} />
                </div>

                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {material.type}
                </span>
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-900">
                {material.title}
              </h2>

              <p className="mt-1 text-sm font-medium text-blue-800">
                {material.subject}
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                {material.description}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs text-slate-400">
                  {material.size}
                </span>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <FileText
            size={30}
            className="mx-auto text-slate-400"
          />

          <h2 className="mt-4 font-semibold text-slate-800">
            No materials found
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search term.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudyMaterials;

