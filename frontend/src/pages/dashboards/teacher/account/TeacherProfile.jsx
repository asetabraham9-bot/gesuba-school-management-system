import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  GraduationCap,
  BookOpen,
  CalendarDays,
  ShieldCheck,
  Pencil,
  LockKeyhole,
  BadgeCheck,
  Building2,
} from "lucide-react";

const teacherProfile = {
  fullName: "Mekdes Alemu",
  username: "GGSS.TEA0001",
  employeeId: "TEA-0001",
  role: "Teacher",
  status: "Active",

  email: "mekdes.alemu@ggss.edu.et",
  phone: "+251 91 234 5678",
  address: "Wolaita Sodo, Ethiopia",

  gender: "Male",
  dateOfBirth: "March 15, 1990",

  department: "Natural Science Department",
  qualification: "BSc in Mathematics",
  specialization: "Mathematics",
  experience: "6 Years",

  joinedDate: "September 12, 2020",

  subjects: [
    "Mathematics",
    "General Mathematics",
  ],

  assignedClasses: [
    {
      grade: "Grade 12",
      section: "Section A",
      subject: "Mathematics",
    },
    {
      grade: "Grade 12",
      section: "Section B",
      subject: "Mathematics",
    },
    {
      grade: "Grade 11",
      section: "Section A",
      subject: "General Mathematics",
    },
  ],
};

const TeacherProfile = () => {
  return (
    <div className="space-y-6">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div>
        <p className="text-sm font-medium text-blue-600">
          Account
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          My Profile
        </h1>

        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          View and manage your personal and professional
          information.
        </p>
      </div>

      {/* =====================================================
          PROFILE HEADER
      ====================================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Cover */}

        <div className="h-28 bg-slate-900 sm:h-32" />

        {/* Profile Information */}

        <div className="px-5 pb-5 sm:px-6">
          <div className="-mt-10 flex flex-col gap-5 sm:-mt-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              {/* Avatar */}

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-blue-600 text-2xl font-bold text-white shadow-sm sm:h-24 sm:w-24">
                {teacherProfile.fullName
                  .charAt(0)
                  .toUpperCase()}
              </div>

              {/* Name */}

              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    {teacherProfile.fullName}
                  </h2>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <BadgeCheck size={13} />

                    {teacherProfile.status}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {teacherProfile.role} ·{" "}
                  {teacherProfile.employeeId}
                </p>
              </div>
            </div>

            {/* Actions */}

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <LockKeyhole size={16} />

                Change Password
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Pencil size={16} />

                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PERSONAL INFORMATION
      ====================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <UserRound size={18} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Personal Information
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Basic personal information associated with
                your account.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 p-5 sm:grid-cols-2 sm:p-6">
          {/* Full Name */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Full Name
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {teacherProfile.fullName}
            </p>
          </div>

          {/* Username */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Username
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {teacherProfile.username}
            </p>
          </div>

          {/* Gender */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Gender
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {teacherProfile.gender}
            </p>
          </div>

          {/* Date of Birth */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Date of Birth
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {teacherProfile.dateOfBirth}
            </p>
          </div>

          {/* Address */}

          <div className="sm:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Address
            </p>

            <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <MapPin
                size={15}
                className="text-slate-400"
              />

              {teacherProfile.address}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT INFORMATION
      ====================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Mail size={18} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Contact Information
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Contact details used by the school.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2 sm:p-6">
          {/* Email */}

          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-slate-400">
              <Mail size={18} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Email Address
              </p>

              <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                {teacherProfile.email}
              </p>
            </div>
          </div>

          {/* Phone */}

          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-slate-400">
              <Phone size={18} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Phone Number
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {teacherProfile.phone}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROFESSIONAL INFORMATION
      ====================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <BriefcaseBusiness size={18} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Professional Information
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Your teaching and employment information.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
          {/* Employee ID */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Employee ID
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {teacherProfile.employeeId}
            </p>
          </div>

          {/* Department */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Department
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {teacherProfile.department}
            </p>
          </div>

          {/* Qualification */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Qualification
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {teacherProfile.qualification}
            </p>
          </div>

          {/* Specialization */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Specialization
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {teacherProfile.specialization}
            </p>
          </div>

          {/* Experience */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Teaching Experience
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {teacherProfile.experience}
            </p>
          </div>

          {/* Joined Date */}

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Joined School
            </p>

            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-800">
              <CalendarDays
                size={15}
                className="text-slate-400"
              />

              {teacherProfile.joinedDate}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          TEACHING INFORMATION
      ====================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <GraduationCap size={18} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Teaching Information
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Subjects and classes currently assigned to
                you.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {/* Subjects */}

          <div>
            <div className="flex items-center gap-2">
              <BookOpen
                size={17}
                className="text-slate-400"
              />

              <p className="text-sm font-semibold text-slate-800">
                Assigned Subjects
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {teacherProfile.subjects.map(
                (subject) => (
                  <span
                    key={subject}
                    className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                  >
                    {subject}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Assigned Classes */}

          <div className="mt-6">
            <div className="flex items-center gap-2">
              <Building2
                size={17}
                className="text-slate-400"
              />

              <p className="text-sm font-semibold text-slate-800">
                Assigned Classes
              </p>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Grade
                    </th>

                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Section
                    </th>

                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Subject
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {teacherProfile.assignedClasses.map(
                    (item, index) => (
                      <tr
                        key={`${item.grade}-${item.section}-${index}`}
                        className="border-b border-slate-100 last:border-b-0"
                      >
                        <td className="px-3 py-3 text-sm font-medium text-slate-800">
                          {item.grade}
                        </td>

                        <td className="px-3 py-3 text-sm text-slate-600">
                          {item.section}
                        </td>

                        <td className="px-3 py-3 text-sm text-slate-600">
                          {item.subject}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ACCOUNT INFORMATION
      ====================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <ShieldCheck size={18} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Account Information
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Basic information about your school account.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 p-5 sm:grid-cols-2 sm:p-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Account Role
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {teacherProfile.role}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Account Status
            </p>

            <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              {teacherProfile.status}
            </span>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Username
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {teacherProfile.username}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Employee ID
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {teacherProfile.employeeId}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherProfile;