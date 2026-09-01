import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Handshake,
  Lightbulb,
  Scale,
  Target,
  Trophy,
  UsersRound,
} from "lucide-react";

import PublicNavbar from "../../components/layout/PublicNavbar";
import PublicFooter from "../../components/layout/PublicFooter";

const HERO_VIDEO = "/videos/ggss-campus-hero.mp4";

const campusImages = [
  {
    src: "/campus/campus-01.png",
    title: "Our School Building",
    description:
      "A learning environment built for our school community.",
  },
  {
    src: "/campus/campus-02.jpg",
    title: "Interactive Classrooms",
    description:
      "Learning spaces that encourage participation and growth.",
  },
  {
    src: "/campus/campus-03.jpg",
    title: "Our Library",
    description:
      "A place for students to explore knowledge and ideas.",
  },
  {
    src: "/campus/campus-04.jpg",
    title: "Computer Laboratory",
    description:
      "Technology-supported learning for today's students.",
  },
  {
    src: "/campus/campus-05.jpg",
    title: "Student Activities",
    description:
      "Developing teamwork, creativity, and confidence.",
  },
  {
    src: "/campus/campus-06.jpg",
    title: "Sports Field",
    description:
      "Supporting physical fitness and student wellbeing.",
  },
];

const schoolValues = [
  {
    title: "Excellence",
    description:
      "Striving for academic and personal excellence in all endeavors.",
    icon: Trophy,
  },
  {
    title: "Integrity",
    description:
      "Upholding honesty, ethics, and moral principles.",
    icon: Scale,
  },
  {
    title: "Innovation",
    description:
      "Encouraging creativity and forward-thinking solutions.",
    icon: Lightbulb,
  },
  {
    title: "Respect",
    description:
      "Valuing diversity and treating everyone with dignity.",
    icon: Handshake,
  },
  {
    title: "Responsibility",
    description:
      "Taking ownership of our actions and community.",
    icon: Target,
  },
  {
    title: "Collaboration",
    description:
      "Working together to achieve common goals.",
    icon: UsersRound,
  },
];

const stats = [
  {
    value: "2000+",
    label: "Students Enrolled",
  },
  {
    value: "85+",
    label: "Qualified Teachers",
  },
  {
    value: "95%",
    label: "Success Rate",
  },
  {
    value: "20+",
    label: "Clubs & Activities",
  },
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /*
   * Temporary leadership data.
   *
   * The actual leadership API will be connected later.
   * Keeping this empty allows the public page to display
   * the administration-managed placeholder.
   */
  const leadershipTeam = [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((current) =>
        current === campusImages.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative isolate min-h-[620px] overflow-hidden bg-slate-950">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-slate-950/65" />

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
              Gesuba General Secondary School
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Nurturing Excellence.
              <span className="block text-blue-200">
                Building Future Leaders.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
              A connected school community where academic excellence,
              digital learning, character development, and opportunity
              come together.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/study-materials"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Explore Resources
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Learn About GGSS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CAMPUS LIFE
      ====================================================== */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-blue-800">
              Campus Life
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Learning beyond the classroom.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500">
              Explore the learning spaces, activities, and facilities
              that make up the GGSS school community.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
              {campusImages.map((image, index) => (
                <div
                  key={image.src}
                  className={`absolute inset-0 transition-opacity duration-700 ${index === currentImageIndex
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                    }`}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 pt-20 sm:p-8 sm:pt-24">
                    <h3 className="text-xl font-semibold text-white sm:text-2xl">
                      {image.title}
                    </h3>

                    <p className="mt-2 max-w-xl text-sm text-slate-200 sm:text-base">
                      {image.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-center gap-2">
              {campusImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Show ${image.title}`}
                  aria-current={
                    index === currentImageIndex ? "true" : "false"
                  }
                  className={`h-2 rounded-full transition-all ${index === currentImageIndex
                    ? "w-7 bg-blue-900"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CORE VALUES
      ====================================================== */}
      <section className="border-y border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-blue-800">
              Our Foundation
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Our Core Values
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500">
              The principles that guide our students, educators,
              leadership, and wider school community.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {schoolValues.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                    <Icon size={21} strokeWidth={1.9} />
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
          LEADERSHIP
      ====================================================== */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-blue-800">
              School Leadership
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Meet Our Leadership Team
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500">
              The people responsible for guiding the academic and
              administrative direction of our school.
            </p>
          </div>

          {leadershipTeam.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {leadershipTeam.map((leader) => (
                <article
                  key={leader._id}
                  className="rounded-xl border border-slate-200 bg-white p-6 text-center transition duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-slate-50"
                  />

                  <h3 className="mt-5 font-semibold text-slate-900">
                    {leader.name}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-blue-800">
                    {leader.position}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {leader.description}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
              <UsersRound
                size={28}
                className="mx-auto text-slate-400"
              />

              <p className="mt-4 text-sm font-medium text-slate-700">
                Leadership information will appear here.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Leadership profiles will be managed through the
                school administration system.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          STATISTICS
      ====================================================== */}
      <section className="bg-blue-950 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {stat.value}
                </div>

                <div className="mt-2 text-sm text-blue-200">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Be part of the GGSS community.
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-500 sm:text-lg">
            Explore our learning resources, discover school
            activities, or access the digital school portal.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/study-materials"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Explore Resources
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Parent Sign Up
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default Home;