import { Link } from 'react-router-dom';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import {
  Palette,
  BookOpen,
  Leaf,
  Trophy,
  Laptop,
  Target,
  Users,
  Award,
  Star,
  Utensils,
  Music,
  ShieldCheck,
  HeartPulse,
  Handshake,
  ArrowRight,
  Send,
} from 'lucide-react';

const clubs = {
  culture: {
    title: 'Culture and Language',
    description: 'Celebrate and preserve Wolaita culture and traditions',
    invitation:
      'Help preserve our language, traditions, stories, and cultural identity. Join fellow students who are passionate about keeping our heritage alive.',
    joinLabel: 'Join Culture & Language Club',
    icon: BookOpen,
    activities: [
      {
        name: 'Traditional Cooking',
        description: 'Learn traditional Wolaita recipes and nutritional practices',
        icon: Utensils,
      },
      {
        name: 'Cultural Dance',
        description: 'Practice traditional Wolaita dances and performances',
        icon: Music,
      },
      {
        name: 'Traditional Clothing',
        description: 'Study and showcase Wolaita traditional attire',
        icon: Palette,
      },
      {
        name: 'Language Preservation',
        description: 'Promote and teach Wolaita language and literature',
        icon: BookOpen,
      },
    ],
  },

  art: {
    title: 'Art and Literature',
    description: 'Express creativity through various art forms and literary works',
    invitation:
      'Turn your ideas into art, stories, performances, and unforgettable expressions. Join a creative community where imagination has room to grow.',
    joinLabel: 'Join Art & Literature Club',
    icon: Palette,
    activities: [
      {
        name: 'Visual Arts',
        description: 'Painting, drawing, and sculpture workshops',
        icon: Palette,
      },
      {
        name: 'Creative Writing',
        description: 'Poetry, short stories, and essay writing',
        icon: BookOpen,
      },
      {
        name: 'Drama & Theater',
        description: 'Performance arts and theatrical productions',
        icon: Music,
      },
      {
        name: 'Music',
        description: 'Traditional and modern music performances',
        icon: Music,
      },
    ],
  },

  environmental: {
    title: 'Environmental and Safety Awareness',
    description: 'Promoting environmental conservation and community safety',
    invitation:
      'Make your school and community safer, cleaner, and healthier. Join students who are ready to turn environmental awareness into practical action.',
    joinLabel: 'Join Environmental Club',
    icon: Leaf,
    activities: [
      {
        name: 'Environmental Conservation',
        description: 'Tree planting, cleaning campaigns, and eco-projects',
        icon: Leaf,
      },
      {
        name: 'Traffic Safety',
        description: 'Learning and teaching traffic laws and road safety',
        icon: ShieldCheck,
      },
      {
        name: 'Health & Hygiene',
        description: 'Personal hygiene, HIV/AIDS awareness, and health education',
        icon: HeartPulse,
      },
      {
        name: 'Community Service',
        description: 'Ethnic studies and caring for community resources',
        icon: Handshake,
      },
    ],
  },

  sports: {
    title: 'Sports',
    description: 'Developing physical fitness and sportsmanship',
    invitation:
      'Build discipline, teamwork, confidence, and healthy competition. Join a team and represent GGSS with commitment and sportsmanship.',
    joinLabel: 'Join Sports Club',
    icon: Trophy,
    activities: [
      {
        name: 'Football/Soccer',
        description: 'School teams and inter-school competitions',
        icon: Trophy,
      },
      {
        name: 'Volleyball',
        description: 'Indoor and outdoor volleyball training',
        icon: Users,
      },
      {
        name: 'Basketball',
        description: 'Basketball training and tournaments',
        icon: Trophy,
      },
      {
        name: 'Athletics',
        description: 'Track and field events and competitions',
        icon: Target,
      },
    ],
  },

  technology: {
    title: 'Technology and Innovation',
    description: 'Exploring modern technology and innovative solutions',
    invitation:
      'Build, experiment, code, and solve real-world problems. Join students who want to turn technology from something they use into something they create.',
    joinLabel: 'Join Technology Club',
    icon: Laptop,
    activities: [
      {
        name: 'Computer Club',
        description: 'Programming, web development, and software skills',
        icon: Laptop,
      },
      {
        name: 'Robotics',
        description: 'Building and programming robots',
        icon: Target,
      },
      {
        name: 'Innovation Lab',
        description: 'Creating innovative solutions to real-world problems',
        icon: Star,
      },
      {
        name: 'Digital Media',
        description: 'Video production, graphic design, and digital content',
        icon: Palette,
      },
    ],
  },
};

const benefits = [
  { icon: Target, title: 'Skill Development', desc: 'Learn new skills and enhance existing talents' },
  { icon: Users, title: 'Build Friendships', desc: 'Connect with like-minded peers' },
  { icon: Award, title: 'Leadership', desc: 'Develop leadership and teamwork abilities' },
  { icon: Star, title: 'Personal Growth', desc: 'Build confidence and self-expression' },
];

export default function Clubs() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* ── Page Header ─────────────────────────────────── */}
      <section className="relative bg-slate-950 py-20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(30,58,95,0.7),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
            Student Life
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Clubs & Activities
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Discover opportunities to explore your interests, develop new
            skills, and contribute to the GGSS community.
          </p>
        </div>
      </section>

      {/* ── Why Join? ────────────────────────────────────── */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-blue-800">Benefits</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Why Join Our Clubs?
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-500">
              Extracurricular activities are an essential part of student
              life at Gesuba General Secondary School.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center transition duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                  <Icon size={23} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Club Sections ────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {Object.entries(clubs).map(([key, club], clubIndex) => {
          const ClubIcon = club.icon;
          const isEven = clubIndex % 2 === 0;

          return (
            <section
              key={key}
              className="my-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {/* Club Header */}
              <div
                className={`flex items-center gap-4 px-6 py-5 sm:px-8 ${
                  isEven ? 'bg-blue-950' : 'bg-slate-900'
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                  <ClubIcon size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{club.title}</h2>
                  <p className="mt-0.5 text-sm text-slate-300">
                    {club.description}
                  </p>
                </div>
              </div>

              {/* Club Body */}
              <div className="p-6 sm:p-8">
                {/* Activities */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {club.activities.map((activity) => {
                    const ActivityIcon = activity.icon;
                    return (
                      <div
                        key={activity.name}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                          <ActivityIcon size={20} />
                        </div>
                        <h3 className="mt-3 text-sm font-semibold text-slate-900">
                          {activity.name}
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {activity.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Invitation */}
                <div className="mt-6 flex flex-col gap-4 rounded-xl border border-blue-100 bg-blue-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-900 text-white">
                      <Send size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Ready to get involved?
                      </p>
                      <p className="mt-0.5 text-sm leading-6 text-slate-600">
                        {club.invitation}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/clubs/${key}/join`}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                  >
                    {club.joinLabel}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── How to Join ──────────────────────────────────── */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-blue-800">Membership</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              How to Join
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '1',
                title: 'Choose Your Interest',
                desc: 'Explore the clubs and activities that match your interests and passions.',
              },
              {
                step: '2',
                title: 'Submit Your Request',
                desc: 'Complete the club membership request and tell the instructor why you want to join.',
              },
              {
                step: '3',
                title: 'Wait for Review',
                desc: 'The responsible club instructor reviews your request.',
              },
              {
                step: '4',
                title: 'Get Involved',
                desc: 'Once approved, participate in meetings, projects, events, and competitions.',
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-sm font-bold text-white">
                  {step}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-lg rounded-2xl bg-blue-950 px-8 py-10 text-center text-white">
            <p className="text-lg font-semibold">
              Ready to become part of the GGSS community?
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-950 transition hover:bg-slate-100"
            >
              Contact Us for More Information
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}