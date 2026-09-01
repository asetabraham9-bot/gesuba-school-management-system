import { Link } from 'react-router-dom';
import {
  Award,
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  FileQuestion,
  GraduationCap,
  LockKeyhole,
  MonitorCheck,
  Settings2,
  ShieldCheck,
  Users,
} from 'lucide-react';

import Navbar from '../../components/layout/PublicNavbar';
import Footer from '../../components/layout/PublicFooter';

const examFeatures = [
  {
    icon: BookOpenCheck,
    title: 'For Students',
    description:
      'Access assigned examinations, complete questions, submit answers, and follow your academic performance.',
    features: [
      'View available examinations',
      'Take exams with a timer',
      'Submit answers securely',
      'View results and feedback',
      'Review completed examinations',
    ],
  },
  {
    icon: GraduationCap,
    title: 'For Instructors',
    description:
      'Prepare and manage examinations for students through the instructor dashboard.',
    features: [
      'Create and schedule examinations',
      'Add different question types',
      'Set examination time limits',
      'Review and grade submissions',
      'Monitor examination performance',
    ],
  },
  {
    icon: Settings2,
    title: 'For Administrators',
    description:
      'Manage examination activities and maintain proper system administration.',
    features: [
      'Manage examination access',
      'Monitor examination activities',
      'Manage user permissions',
      'Review examination records',
      'Maintain system settings',
    ],
  },
];

const examinationHighlights = [
  {
    icon: Clock3,
    title: 'Timed Examinations',
    description:
      'Students complete examinations within the time limit configured by the instructor.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Access',
    description:
      'Examinations are available according to the permissions and schedules defined by the school.',
  },
  {
    icon: BarChart3,
    title: 'Performance Tracking',
    description:
      'Students can follow their examination results and academic progress through their dashboard.',
  },
  {
    icon: Award,
    title: 'Results & Feedback',
    description:
      'Students can access results and instructor feedback after examinations are processed.',
  },
];

export default function OnlineExam() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Page Header ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(30,58,95,0.7),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <MonitorCheck size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Online Examination System
              </h1>
              <p className="mt-2 max-w-2xl text-slate-300">
                Take examinations, view results, and track academic progress
                through the GGSS digital examination platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* ── Access Section ──────────────────────────── */}
        <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <LockKeyhole size={32} />
          </div>

          <span className="mt-4 inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
            Authentication Required
          </span>

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Sign In to Access Examinations
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-500">
            Online examinations are available to authenticated GGSS system
            users. Please sign in to access your examination dashboard and
            assigned examinations.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              <LockKeyhole size={17} />
              Sign In
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Users size={17} />
              Create Account
            </Link>
          </div>
        </section>

        {/* ── System Overview ─────────────────────────── */}
        <section className="mt-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-blue-800">
              GGSS Digital Assessment
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Examination System Features
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-500">
              A structured examination environment designed to support
              students, instructors, and school administrators.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {examFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {feature.features.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-blue-700"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Highlights ──────────────────────────────── */}
        <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
              <FileQuestion size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">
                How the Examination System Works
              </h2>
              <p className="text-sm text-slate-500">
                The examination process connects students and instructors through
                a structured digital workflow.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {examinationHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Workflow ─────────────────────────────────── */}
        <section className="mt-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-blue-800">
              Simple & Structured
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Examination Workflow
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Exam Preparation',
                desc: 'Instructors prepare questions, configure examination settings, and schedule the examination.',
              },
              {
                step: '02',
                title: 'Student Access',
                desc: "Students access examinations assigned to their grade, section, subject, or class.",
              },
              {
                step: '03',
                title: 'Examination',
                desc: 'Students answer questions within the configured examination period and submit their responses.',
              },
              {
                step: '04',
                title: 'Results & Feedback',
                desc: 'Results are processed and students can view their performance and available instructor feedback.',
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 text-sm font-bold text-white">
                  {step}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────── */}
        <section className="mt-16 rounded-2xl bg-blue-950 px-8 py-12 text-center text-white">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <BookOpenCheck size={26} />
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            Ready for Your Examination?
          </h2>

          <p className="mx-auto mt-3 max-w-md text-slate-300">
            Sign in to your GGSS account to access examinations assigned to you.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-950 transition hover:bg-slate-100"
          >
            Sign In to Continue
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
