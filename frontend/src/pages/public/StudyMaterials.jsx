import { useState } from 'react';
import {
  BookOpen,
  CalendarDays,
  Download,
  FileText,
  GraduationCap,
  Library,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';

import Navbar from '../../components/layout/PublicNavbar';
import Footer from '../../components/layout/PublicFooter';

const grades = [9, 10, 11, 12];

/*
 * Temporary public-page data structure.
 *
 * Later:
 * This structure will be populated from the GGSS backend/database
 * when the Instructor/Teacher material management module is connected.
 */
const studyMaterials = {
  9: [],
  10: [],
  11: [],
  12: [],
};

const guidanceMaterials = [
  {
    title: 'Study Skills Guide',
    description: 'Effective study techniques and time management.',
    type: 'Guide',
  },
  {
    title: 'Time Management Tips',
    description: 'Balance academics, activities, and personal time effectively.',
    type: 'Guide',
  },
  {
    title: 'Exam Preparation Strategies',
    description: 'Practical strategies for preparing for tests and examinations.',
    type: 'Guide',
  },
  {
    title: 'Career Guidance',
    description: 'Explore university programs and possible career pathways.',
    type: 'Career',
  },
  {
    title: 'University Entrance Information',
    description: 'Information about applications, requirements, and preparation.',
    type: 'Information',
  },
];

export default function StudyMaterials() {
  const [selectedGrade, setSelectedGrade] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');

  const currentMaterials = studyMaterials[selectedGrade] || [];

  const filteredMaterials = currentMaterials.filter((material) => {
    const search = searchTerm.toLowerCase();

    return (
      material.title?.toLowerCase().includes(search) ||
      material.subject?.toLowerCase().includes(search) ||
      material.type?.toLowerCase().includes(search)
    );
  });

  const handleDownload = (material) => {
    /*
     * Backend integration point.
     *
     * Later this will use the secure file URL/path returned
     * by the GGSS backend.
     */
    if (material?.file_url) {
      window.open(material.file_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Page Header ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(30,58,95,0.7),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <Library size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Study Materials
              </h1>
              <p className="mt-2 max-w-2xl text-slate-300">
                Access textbooks, guides, practice exams, and other educational
                resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* ── Introduction ─────────────────────────────── */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">
                Ethiopian Curriculum Resources
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                Resources organized to support the Ethiopian Ministry of
                Education curriculum for grades 9–12.
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
            <GraduationCap size={18} className="mt-0.5 shrink-0 text-blue-700" />
            <p className="text-sm leading-6 text-blue-800">
              <strong>Browse resources by grade level.</strong> Select a grade
              tab below to view available learning materials.
            </p>
          </div>
        </section>

        {/* ── Grade Resources ──────────────────────────── */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">Learning Resources</h2>
              <p className="mt-0.5 text-sm text-slate-500">
                Browse available learning materials by grade level.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
              <FileText size={16} />
              <span>{filteredMaterials.length} resources</span>
            </div>
          </div>

          {/* Grade Selector */}
          <div
            className="mt-5 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Grade level selector"
          >
            {grades.map((grade) => (
              <button
                key={grade}
                type="button"
                role="tab"
                aria-selected={selectedGrade === grade}
                onClick={() => setSelectedGrade(grade)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  selectedGrade === grade
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <GraduationCap size={15} />
                Grade {grade}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={`Search Grade ${selectedGrade} materials...`}
                aria-label="Search study materials"
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
              <CalendarDays size={16} />
              <span>Grade {selectedGrade}</span>
            </div>
          </div>

          {/* Materials Table / Empty State */}
          <div className="mt-6">
            {filteredMaterials.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <FileText size={28} />
                </div>

                <h3 className="mt-4 font-semibold text-slate-700">
                  No materials available yet
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Study materials for Grade {selectedGrade} will appear here
                  when they are published by the school instructors.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      {['Title', 'Subject', 'Type', 'Date Added', 'Action'].map(
                        (h) => (
                          <th
                            key={h}
                            className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredMaterials.map((material) => (
                      <tr key={material.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <div className="flex items-start gap-2">
                            <FileText
                              size={18}
                              className="mt-0.5 shrink-0 text-slate-400"
                            />
                            <div>
                              <p className="font-medium text-slate-900">
                                {material.title}
                              </p>
                              {material.description && (
                                <p className="text-xs text-slate-500">
                                  {material.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3 text-slate-600">
                          {material.subject || 'General'}
                        </td>

                        <td className="px-4 py-3">
                          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                            {material.type || 'File'}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-slate-600">
                          {material.created_at
                            ? new Date(
                                material.created_at
                              ).toLocaleDateString()
                            : 'Recently'}
                        </td>

                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => handleDownload(material)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-900 transition hover:bg-blue-100"
                          >
                            <Download size={14} />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* ── Guidance Materials ───────────────────────── */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">
                Guidance & Support Materials
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                Helpful resources to support academic success, personal
                development, and future planning.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guidanceMaterials.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-900 shadow-sm">
                  <BookOpen size={20} />
                </div>

                <span className="mt-3 inline-block rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  {item.type}
                </span>

                <h3 className="mt-3 text-sm font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>

                <button
                  type="button"
                  disabled
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-400 cursor-not-allowed"
                >
                  <Download size={14} />
                  Available Soon
                </button>
              </article>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
            <Users size={17} className="mt-0.5 shrink-0 text-blue-700" />
            <p className="text-sm leading-6 text-blue-800">
              Guidance and support resources will be published here by
              authorized school instructors and will be available for students
              to download.
            </p>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────── */}
        <section className="mt-8 rounded-2xl bg-slate-900 px-8 py-12 text-center text-white">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <Library size={26} />
          </div>

          <h2 className="mt-4 text-2xl font-bold">Need More Resources?</h2>

          <p className="mx-auto mt-3 max-w-md text-slate-300">
            Contact your teachers or visit the school library for additional
            study materials and academic support.
          </p>

          <a
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Contact Us
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
