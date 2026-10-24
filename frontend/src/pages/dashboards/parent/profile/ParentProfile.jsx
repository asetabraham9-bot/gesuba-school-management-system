import { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Users,
  GraduationCap,
  ShieldCheck,
  Pencil,
  Save,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

const initialProfile = {
  fullName: "Abebe Kebede",
  relationship: "Father",
  email: "parent@example.com",
  phone: "+251 91 234 5678",
  alternatePhone: "+251 92 345 6789",
  address: "Wolaita Sodo, Ethiopia",
  occupation: "Business Professional",
  preferredContact: "Phone",
  emergencyContact: "Mekdes Kebede",
  emergencyPhone: "+251 93 456 7890",
};

const linkedChildren = [
  {
    id: "GGSS.STU0001",
    name: "Abebe Kebede",
    grade: "Grade 12",
    section: "A",
    relationship: "Son",
  },
  {
    id: "GGSS.STU0002",
    name: "Sara Kebede",
    grade: "Grade 9",
    section: "B",
    relationship: "Daughter",
  },
];

const Field = ({
  label,
  name,
  value,
  onChange,
  editing,
  type = "text",
  options,
}) => (
  <div>
    <label
      htmlFor={name}
      className="mb-2 block text-sm font-medium text-slate-700"
    >
      {label}
    </label>

    {options ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={!editing}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 disabled:text-slate-600"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        readOnly={!editing}
        className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 read-only:bg-slate-50 read-only:text-slate-600"
      />
    )}
  </div>
);

const ParentProfile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [savedProfile, setSavedProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "address",
      "emergencyContact",
      "emergencyPhone",
    ];

    const missingField = requiredFields.find(
      (field) => !String(profile[field] || "").trim()
    );

    if (missingField) {
      setMessage("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setSavedProfile({ ...profile });
    setEditing(false);
    setMessage("Profile changes saved in this session.");
  };

  const handleCancel = () => {
    setProfile({ ...savedProfile });
    setEditing(false);
    setMessage("");
  };

  const handleReset = () => {
    setProfile({ ...initialProfile });
    setSavedProfile({ ...initialProfile });
    setEditing(false);
    setMessage("Sample profile restored.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Parent Portal / Account
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Review and update your contact information.
          </p>
        </div>

        {!editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(true);
              setMessage("");
            }}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Pencil size={17} />
            Edit Profile
          </button>
        )}
      </div>

      {message && (
        <div
          role="status"
          className={`flex items-center gap-2 rounded-xl border p-4 text-sm ${
            message.includes("Please")
              ? "border-amber-200 bg-amber-50 text-amber-800"
              : "border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
        >
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-slate-900 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10">
              <UserRound size={38} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                {profile.fullName || "Parent Name"}
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Parent / Guardian
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-200">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={14} />
                    Parent Account
                  </span>
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                  {linkedChildren.length} linked children
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-7 p-5 sm:p-8">
          <section>
            <h3 className="flex items-center gap-2 font-semibold text-slate-900">
              <UserRound size={19} className="text-blue-600" />
              Personal Information
            </h3>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="Full Name *"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                editing={editing}
              />
              <Field
                label="Relationship to Student"
                name="relationship"
                value={profile.relationship}
                onChange={handleChange}
                editing={editing}
                options={["Father", "Mother", "Guardian", "Other"]}
              />
              <Field
                label="Occupation"
                name="occupation"
                value={profile.occupation}
                onChange={handleChange}
                editing={editing}
              />
              <Field
                label="Preferred Contact Method"
                name="preferredContact"
                value={profile.preferredContact}
                onChange={handleChange}
                editing={editing}
                options={["Phone", "Email", "SMS"]}
              />
            </div>
          </section>

          <div className="border-t border-slate-100" />

          <section>
            <h3 className="flex items-center gap-2 font-semibold text-slate-900">
              <Mail size={19} className="text-blue-600" />
              Contact Information
            </h3>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="Email Address *"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                editing={editing}
              />
              <Field
                label="Phone Number *"
                name="phone"
                type="tel"
                value={profile.phone}
                onChange={handleChange}
                editing={editing}
              />
              <Field
                label="Alternative Phone"
                name="alternatePhone"
                type="tel"
                value={profile.alternatePhone}
                onChange={handleChange}
                editing={editing}
              />
              <Field
                label="Address *"
                name="address"
                value={profile.address}
                onChange={handleChange}
                editing={editing}
              />
            </div>
          </section>

          <div className="border-t border-slate-100" />

          <section>
            <h3 className="flex items-center gap-2 font-semibold text-slate-900">
              <Phone size={19} className="text-blue-600" />
              Emergency Contact
            </h3>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="Contact Name *"
                name="emergencyContact"
                value={profile.emergencyContact}
                onChange={handleChange}
                editing={editing}
              />
              <Field
                label="Emergency Phone *"
                name="emergencyPhone"
                type="tel"
                value={profile.emergencyPhone}
                onChange={handleChange}
                editing={editing}
              />
            </div>
          </section>

          {editing && (
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw size={16} />
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          )}
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
            <Users size={21} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">
              Linked Children
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Students currently associated with this sample parent account.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {linkedChildren.map((child) => (
            <div
              key={child.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <GraduationCap size={23} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {child.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {child.id}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                  {child.grade} · Section {child.section}
                </span>
                <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-600">
                  {child.relationship}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
            <MapPin size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">
              Profile Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Keep your contact details accurate so the school can reach
              you about academic progress, attendance, examinations, and
              important notices.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Changes are held in React state for this demonstration.
              They are not sent to a database.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          <RotateCcw size={15} />
          Restore sample profile
        </button>
      </section>
    </div>
  );
};

export default ParentProfile;