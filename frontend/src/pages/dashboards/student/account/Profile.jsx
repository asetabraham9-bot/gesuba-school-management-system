import {
  Award,
  CalendarDays,
  CheckCircle2,
  Edit3,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

const Profile = () => {
  const student = {
    fullName: "Abraham Asayehu",
    username: "GGSS.STU0001",
    email: "abraham@example.com",
    phone: "+251 912 345 678",
    grade: "Grade 10",
    section: "Section A",
    gender: "Male",
    dateOfBirth: "January 15, 2010",
    address: "Gesuba, Ethiopia",
    enrollmentDate: "September 2025",
    status: "Active",
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage your personal and academic information.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          <Edit3 className="h-4 w-4" />
          Edit Profile
        </button>
      </div>

      {/* Profile Overview */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-28 bg-slate-900 sm:h-32" />

        <div className="px-5 pb-6 sm:px-6">
          <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              {/* Avatar */}
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-slate-100 text-2xl font-bold text-slate-700 shadow-sm sm:h-28 sm:w-28">
                AA
              </div>

              <div className="pb-1">
                <h2 className="text-xl font-bold text-slate-900">
                  {student.fullName}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Student ID: {student.username}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pb-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {student.status}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Academic Summary */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
              <GraduationCap className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Grade
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {student.grade}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-violet-50 p-2.5 text-violet-600">
              <Award className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Section
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {student.section}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Account
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                Active
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Information */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
              <User className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Personal Information
              </h2>

              <p className="text-sm text-slate-500">
                Your basic personal information.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
          <InfoItem
            icon={User}
            label="Full Name"
            value={student.fullName}
          />

          <InfoItem
            icon={User}
            label="Username"
            value={student.username}
          />

          <InfoItem
            icon={User}
            label="Gender"
            value={student.gender}
          />

          <InfoItem
            icon={CalendarDays}
            label="Date of Birth"
            value={student.dateOfBirth}
          />

          <InfoItem
            icon={MapPin}
            label="Address"
            value={student.address}
          />

          <InfoItem
            icon={CalendarDays}
            label="Enrollment Date"
            value={student.enrollmentDate}
          />
        </div>
      </section>

      {/* Contact Information */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="font-semibold text-slate-900">
            Contact Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Contact details associated with your account.
          </p>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <InfoItem
            icon={Mail}
            label="Email Address"
            value={student.email}
          />

          <InfoItem
            icon={Phone}
            label="Phone Number"
            value={student.phone}
          />
        </div>
      </section>

      {/* Academic Information */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="font-semibold text-slate-900">
            Academic Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your current academic placement.
          </p>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
          <InfoItem
            icon={GraduationCap}
            label="Current Grade"
            value={student.grade}
          />

          <InfoItem
            icon={GraduationCap}
            label="Section"
            value={student.section}
          />

          <InfoItem
            icon={CalendarDays}
            label="Enrollment Date"
            value={student.enrollmentDate}
          />
        </div>
      </section>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-lg bg-slate-100 p-2 text-slate-600">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
};

export default Profile;