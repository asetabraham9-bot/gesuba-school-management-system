import { useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  Building2,
  Check,
  Clock3,
  FlaskConical,
  GraduationCap,
  Handshake,
  History,
  Lightbulb,
  Mail,
  MapPin,
  Medal,
  Monitor,
  Music,
  Palette,
  Phone,
  Rocket,
  Scale,
  ShieldCheck,
  Target,
  Trophy,
  UsersRound,
  Volleyball,
} from "lucide-react";

import PublicNavbar from "../../components/layout/PublicNavbar";
import PublicFooter from "../../components/layout/PublicFooter";

const ABOUT_VIDEO = "/videos/ggss-about.mp4";

const values = [
  {
    title: "Excellence",
    description:
      "We pursue the highest standards in academic achievement and personal development.",
    icon: Trophy,
  },
  {
    title: "Integrity",
    description:
      "We uphold honesty, ethical behavior, and moral principles in all our actions.",
    icon: Scale,
  },
  {
    title: "Respect",
    description:
      "We value diversity and treat all members of our community with dignity and respect.",
    icon: Handshake,
  },
  {
    title: "Responsibility",
    description:
      "We take ownership of our actions and their impact on our community and environment.",
    icon: Target,
  },
  {
    title: "Innovation",
    description:
      "We encourage creative thinking and embrace new approaches to learning and problem-solving.",
    icon: Lightbulb,
  },
  {
    title: "Collaboration",
    description:
      "We work together, valuing teamwork and collective effort towards common goals.",
    icon: UsersRound,
  },
];

const history = [
  {
    year: "1961",
    title: "School Founded",
    description:
      "Gesuba General Secondary School was established to meet the growing educational needs of the community.",
  },
  {
    year: "1989",
    title: "Laboratory Expansion",
    description:
      "Added state-of-the-art science and computer laboratories to enhance practical learning.",
  },
  {
    year: "1992",
    title: "Academic Recognition",
    description:
      "Achieved top regional ranking in national examinations for three consecutive years.",
  },
  {
    year: "2012",
    title: "Digital Transformation",
    description:
      "Launched online learning platform and digital resources for students.",
  },
  {
    year: "2026",
    title: "Present Day",
    description:
      "Continuing to grow with over 2000 students and 85+ qualified teachers.",
  },
];

const programs = [
  {
    title: "Natural Sciences",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology"],
  },
  {
    title: "Social Sciences",
    subjects: ["History", "Geography", "Civics & Ethics", "Economics"],
  },
  {
    title: "Languages",
    subjects: ["English", "Amharic", "Wolaita Language"],
  },
  {
    title: "Special Programs",
    subjects: [
      "IT & Computer Science",
      "Physical Education",
      "Arts & Music",
      "Career Guidance",
    ],
  },
];

const facilities = [
  {
    title: "Science Laboratories",
    description:
      "Well-equipped physics, chemistry, and biology labs for hands-on experiments.",
    icon: FlaskConical,
  },
  {
    title: "Computer Lab",
    description:
      "Modern computer lab with internet access and latest software.",
    icon: Monitor,
  },
  {
    title: "Library",
    description:
      "Extensive collection of books, journals, and digital resources.",
    icon: BookOpen,
  },
  {
    title: "Sports Facilities",
    description:
      "Football field, basketball court, and volleyball court.",
    icon: Volleyball,
  },
  {
    title: "Auditorium",
    description:
      "Multi-purpose hall for events, performances, and assemblies.",
    icon: Music,
  },
  {
    title: "Modern Classrooms",
    description:
      "Spacious, well-lit classrooms with modern teaching aids.",
    icon: Building2,
  },
];

const achievements = [
  {
    title: "Academic Excellence",
    description: "Top 15 in Regional Rankings for consecutive years.",
    icon: Award,
  },
  {
    title: "University Admission",
    description:
      "75% of graduates admitted to universities and colleges.",
    icon: GraduationCap,
  },
  {
    title: "Science Fair Winners",
    description:
      "Multiple awards in regional and national science competitions.",
    icon: Medal,
  },
  {
    title: "Sports Champions",
    description:
      "Winners of inter-school football and athletics tournaments.",
    icon: Trophy,
  },
  {
    title: "Cultural Recognition",
    description:
      "Excellence in Wolaita cultural performances and traditional arts.",
    icon: Palette,
  },
  {
    title: "Community Impact",
    description:
      "Active participation in environmental and social programs.",
    icon: UsersRound,
  },
];

export default function About() {
  const [principal, setPrincipal] = useState(null);
  const [principalLoading, setPrincipalLoading] = useState(true);

  useEffect(() => {
    /*
     * Future API integration:
     *
     * GET /api/leadership/public/principal
     *
     * The backend should return the active principal
     * from the leadership collection.
     */

    const loadPrincipal = async () => {
      try {
        /*
         * API integration will be connected after the
         * leadership management endpoint is finalized.
         */
        setPrincipal(null);
      } catch (error) {
        console.error("Failed to load principal:", error);
      } finally {
        setPrincipalLoading(false);
      }
    };

    loadPrincipal();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* =====================================================
          PAGE HERO
      ====================================================== */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <video
            src={ABOUT_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-slate-950/70" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
            About GGSS
          </p>

          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            About Gesuba General Secondary School
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            Learn about our mission, vision, history, and commitment
            to excellence.
          </p>
        </div>
      </section>

      <main>
        {/* =====================================================
            SCHOOL OVERVIEW
        ====================================================== */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              <p className="text-sm font-semibold text-blue-800">
                Who We Are
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                School Overview
              </h2>

              <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Gesuba General Secondary School (GGSS) is a premier
                  educational institution located in the Wolaita Zone
                  of Southern Ethiopia. Established to provide quality
                  secondary education to students in grades 9-12, we
                  serve hundreds of students each year with a focus on
                  academic excellence, character development, and
                  holistic growth.
                </p>

                <p>
                  Our school is committed to creating an inclusive and
                  supportive learning environment where every student
                  can thrive. We combine rigorous academic programs
                  with extensive extracurricular activities to ensure
                  our students are well-prepared for higher education
                  and future careers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            VISION & MISSION
        ====================================================== */}
        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                    <Target size={23} />
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    Our Vision
                  </h2>
                </div>

                <p className="mt-6 leading-8 text-slate-600">
                  To be a leading center of academic excellence in
                  Ethiopia, producing well-rounded graduates who are
                  equipped with knowledge, skills, and values to become
                  responsible citizens and future leaders who contribute
                  positively to society and the nation's development.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                    <Rocket size={23} />
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    Our Mission
                  </h2>
                </div>

                <p className="mt-6 leading-8 text-slate-600">
                  To provide quality education that fosters critical
                  thinking, creativity, and innovation while instilling
                  moral values and respect for cultural diversity. We
                  aim to develop students' intellectual, physical, and
                  social capabilities through a comprehensive curriculum
                  and supportive learning environment.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* =====================================================
            CORE VALUES
        ====================================================== */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-blue-800">
                What Guides Us
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Core Values
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <article
                    key={value.title}
                    className="rounded-xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                      <Icon size={21} />
                    </div>

                    <h3 className="mt-5 font-semibold text-slate-900">
                      {value.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {value.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            HISTORY
        ====================================================== */}
        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <History
                size={28}
                className="mx-auto text-blue-900"
              />

              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Our History
              </h2>
            </div>

            <div className="relative mt-12">
              <div className="absolute bottom-0 left-5 top-0 w-px bg-slate-300 sm:left-1/2" />

              <div className="space-y-8">
                {history.map((item, index) => (
                  <div
                    key={item.year}
                    className={`relative flex ${
                      index % 2 === 0
                        ? "sm:justify-start"
                        : "sm:justify-end"
                    }`}
                  >
                    <div className="w-full pl-14 sm:w-[47%] sm:pl-0">
                      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-900">
                          {item.year}
                        </div>

                        <h3 className="mt-4 font-semibold text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {item.description}
                        </p>
                      </article>
                    </div>

                    <div className="absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-full border-4 border-slate-50 bg-blue-900 text-xs font-bold text-white sm:left-1/2 sm:-translate-x-1/2">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ACADEMIC PROGRAMS
        ====================================================== */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold text-blue-800">
                Learning
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Academic Programs
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-slate-500">
                We offer a comprehensive curriculum aligned with the
                Ethiopian Ministry of Education standards for grades
                9-12.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {programs.map((program) => (
                <article
                  key={program.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="font-semibold text-slate-900">
                    {program.title}
                  </h3>

                  <ul className="mt-5 space-y-3">
                    {program.subjects.map((subject) => (
                      <li
                        key={subject}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-blue-800"
                        />

                        <span>{subject}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            FACILITIES
        ====================================================== */}
        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold text-blue-800">
                Our Environment
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Facilities & Resources
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {facilities.map((facility) => {
                const Icon = facility.icon;

                return (
                  <article
                    key={facility.title}
                    className="rounded-xl border border-slate-200 bg-white p-7 text-center transition duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                      <Icon size={23} />
                    </div>

                    <h3 className="mt-5 font-semibold text-slate-900">
                      {facility.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {facility.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            ACHIEVEMENTS
        ====================================================== */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold text-blue-800">
                Our Progress
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Our Achievements
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;

                return (
                  <article
                    key={achievement.title}
                    className="rounded-xl border border-slate-200 bg-white p-7 text-center shadow-sm transition duration-200 hover:-translate-y-0.5"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-blue-900">
                      <Icon size={26} />
                    </div>

                    <h3 className="mt-5 font-semibold text-slate-900">
                      {achievement.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {achievement.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            PRINCIPAL MESSAGE
        ====================================================== */}
        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-900 px-6 py-6 sm:px-8">
                <p className="text-sm font-semibold text-blue-200">
                  School Leadership
                </p>

                <h2 className="mt-1 text-2xl font-bold text-white">
                  Message from the Principal
                </h2>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                {principalLoading ? (
                  <div className="animate-pulse">
                    <div className="mx-auto h-28 w-28 rounded-full bg-slate-200" />
                    <div className="mx-auto mt-5 h-5 w-40 rounded bg-slate-200" />
                    <div className="mt-8 space-y-3">
                      <div className="h-4 rounded bg-slate-100" />
                      <div className="h-4 rounded bg-slate-100" />
                      <div className="h-4 w-4/5 rounded bg-slate-100" />
                    </div>
                  </div>
                ) : principal ? (
                  <div className="flex flex-col gap-8 md:flex-row md:items-start">
                    <div className="shrink-0 text-center md:w-40">
                      <img
                        src={principal.photo}
                        alt={principal.name}
                        className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-slate-100"
                      />

                      <h3 className="mt-4 font-semibold text-slate-900">
                        {principal.name}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-blue-800">
                        {principal.position}
                      </p>
                    </div>

                    <div className="flex-1">
                      <div className="border-l-2 border-blue-900 pl-5">
                        <p className="leading-8 text-slate-600">
                          {principal.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <ShieldCheck
                      size={30}
                      className="mx-auto text-slate-400"
                    />

                    <p className="mt-4 font-medium text-slate-700">
                      Principal's message will appear here.
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Leadership information will be managed through
                      the school administration system.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTACT INFORMATION
        ====================================================== */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900">
                  Contact Information
                </h2>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-slate-50 p-6">
                  <MapPin className="text-blue-900" size={22} />

                  <h3 className="mt-4 font-semibold text-slate-900">
                    Address
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Gesuba, Wolaita Zone
                    <br />
                    Southern Nations, Nationalities, and Peoples'
                    Region
                    <br />
                    Ethiopia
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-6">
                  <Phone className="text-blue-900" size={22} />

                  <h3 className="mt-4 font-semibold text-slate-900">
                    Phone
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    +251 964 063 992
                    <br />
                    +251 955 305 553
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-6">
                  <Mail className="text-blue-900" size={22} />

                  <h3 className="mt-4 font-semibold text-slate-900">
                    Email
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    info@ggss.edu.et
                    <br />
                    admin@ggss.edu.et
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-6">
                  <Clock3 className="text-blue-900" size={22} />

                  <h3 className="mt-4 font-semibold text-slate-900">
                    Working Hours
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Monday - Friday: 2:00 AM - 11:00 AM (LT)
                    <br />
                    Saturday: 3:00 AM - 6:00 AM (LT)
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-slate-50 p-8 text-center">
                <p className="text-lg font-medium text-slate-900">
                  Have questions or want to visit our school?
                </p>

                <a
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  Contact Us
                  <ArrowRightIcon />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}

function ArrowRightIcon() {
  return <span aria-hidden="true">→</span>;
}
