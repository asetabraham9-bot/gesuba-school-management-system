import { useState } from "react";
import {
  Bell,
  Mail,
  MessageSquare,
  Moon,
  Sun,
  Languages,
  ShieldCheck,
  LockKeyhole,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  CheckCircle2,
  Settings,
  //Smartphone,
} from "lucide-react";

const initialSettings = {
  emailNotifications: true,
  announcementNotifications: true,
  academicNotifications: true,
  attendanceNotifications: true,
  assignmentNotifications: true,
  examinationNotifications: true,
  smsNotifications: false,
  weeklySummary: true,
  appearance: "Light",
  language: "English",
  showStudentIds: true,
  showContactDetails: true,
};

const Toggle = ({ label, description, checked, onChange }) => (
  <label className="flex cursor-pointer items-start justify-between gap-4 py-4">
    <div className="pr-2">
      <p className="text-sm font-medium text-slate-800">{label}</p>
      {description && (
        <p className="mt-1 text-sm leading-5 text-slate-500">
          {description}
        </p>
      )}
    </div>

    <input
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      className="peer sr-only"
    />

    <span
      className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-blue-600" : "bg-slate-300"
      }`}
      aria-hidden="true"
    >
      <span
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </span>
  </label>
);

const SectionHeader = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-3">
    <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
      <Icon size={21} />
    </div>
    <div>
      <h2 className="font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm leading-5 text-slate-500">
        {description}
      </p>
    </div>
  </div>
);

const ParentSettings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [savedSettings, setSavedSettings] = useState(initialSettings);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");

  const updateSetting = (name, value) => {
    setSettings((previous) => ({
      ...previous,
      [name]: value,
    }));
    setMessage("");
  };

  const handleSaveSettings = () => {
    setSavedSettings({ ...settings });
    setMessage("Preferences saved in this session.");
  };

  const handleResetSettings = () => {
    setSettings({ ...initialSettings });
    setSavedSettings({ ...initialSettings });
    setMessage("Default preferences restored.");
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((previous) => ({
      ...previous,
      [name]: value,
    }));
    setPasswordMessage("");
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setPasswordMessage("Please complete all password fields.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordMessage(
        "The new password must contain at least 8 characters."
      );
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("The new passwords do not match.");
      return;
    }

    setPasswordMessage(
      "Demo validation passed. Password changes are not connected to a server."
    );

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const notificationGroups = [
    {
      title: "School Communication",
      items: [
        {
          name: "announcementNotifications",
          label: "School announcements",
          description:
            "Notices about school activities, meetings, and important updates.",
          icon: Bell,
        },
        {
          name: "academicNotifications",
          label: "Academic progress",
          description:
            "Updates about academic performance and teacher feedback.",
          icon: Mail,
        },
        {
          name: "attendanceNotifications",
          label: "Attendance alerts",
          description:
            "Alerts about absences, late arrivals, and attendance records.",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "Assignments and Examinations",
      items: [
        {
          name: "assignmentNotifications",
          label: "Assignment reminders",
          description:
            "Reminders about assignment deadlines and submission updates.",
          icon: Mail,
        },
        {
          name: "examinationNotifications",
          label: "Examination updates",
          description:
            "Notices about examination schedules and available results.",
          icon: Bell,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">
          Parent Portal / Account
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          Settings
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your notification, display, privacy, and account preferences.
        </p>
      </div>

      {message && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
        >
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      {/* Notifications */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <SectionHeader
          icon={Bell}
          title="Notification Preferences"
          description="Choose which types of updates you want to receive."
        />

        <div className="mt-5 divide-y divide-slate-100">
          <Toggle
            label="Email notifications"
            description="Enable or disable email-based notifications."
            checked={settings.emailNotifications}
            onChange={(value) =>
              updateSetting("emailNotifications", value)
            }
          />

          {settings.emailNotifications && (
            <div className="ml-4 border-l-2 border-blue-100 pl-4 sm:ml-6 sm:pl-5">
              {notificationGroups.map((group) => (
                <div key={group.title} className="py-3">
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {group.title}
                  </h3>

                  {group.items.map((item) => (
                    <Toggle
                      key={item.name}
                      label={item.label}
                      description={item.description}
                      checked={settings[item.name]}
                      onChange={(value) =>
                        updateSetting(item.name, value)
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          )}

          <Toggle
            label="SMS notifications"
            description="Receive supported urgent notices through SMS."
            checked={settings.smsNotifications}
            onChange={(value) =>
              updateSetting("smsNotifications", value)
            }
          />

          <Toggle
            label="Weekly summary"
            description="Receive a weekly summary of your children's school activities."
            checked={settings.weeklySummary}
            onChange={(value) =>
              updateSetting("weeklySummary", value)
            }
          />
        </div>
      </section>

      {/* Appearance and language */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <SectionHeader
          icon={Settings}
          title="Appearance and Language"
          description="Choose your preferred display options."
        />

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-700">
              Appearance
            </label>

            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Light", icon: Sun },
                { name: "Dark", icon: Moon },
              ].map((item) => {
                const Icon = item.icon;
                const selected = settings.appearance === item.name;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() =>
                      updateSetting("appearance", item.name)
                    }
                    aria-pressed={selected}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-4 text-sm font-medium transition ${
                      selected
                        ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Selection is stored in local component state only. It does
              not change the dashboard theme yet.
            </p>
          </div>

          <div>
            <label
              htmlFor="language"
              className="mb-3 block text-sm font-medium text-slate-700"
            >
              <span className="inline-flex items-center gap-2">
                <Languages size={17} />
                Language
              </span>
            </label>

            <select
              id="language"
              value={settings.language}
              onChange={(event) =>
                updateSetting("language", event.target.value)
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>English</option>
              <option>Amharic</option>
              <option>Afan Oromo</option>
              <option>Wolayttatto</option>
            </select>

            <p className="mt-2 text-xs text-slate-500">
              The selected language does not translate the interface yet.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <SectionHeader
          icon={ShieldCheck}
          title="Privacy Preferences"
          description="Control optional information displayed in your parent portal."
        />

        <div className="mt-4 divide-y divide-slate-100">
          <Toggle
            label="Show student IDs"
            description="Display linked students' school identification numbers."
            checked={settings.showStudentIds}
            onChange={(value) =>
              updateSetting("showStudentIds", value)
            }
          />

          <Toggle
            label="Show contact details"
            description="Allow your contact details to appear in relevant account views."
            checked={settings.showContactDetails}
            onChange={(value) =>
              updateSetting("showContactDetails", value)
            }
          />
        </div>
      </section>

      {/* Password */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <SectionHeader
          icon={LockKeyhole}
          title="Password and Security"
          description="Password change form preview for the future account integration."
        />

        {passwordMessage && (
          <div
            role="status"
            className={`mt-5 rounded-xl border p-3 text-sm ${
              passwordMessage.startsWith("Demo")
                ? "border-blue-200 bg-blue-50 text-blue-800"
                : "border-amber-200 bg-amber-50 text-amber-800"
            }`}
          >
            {passwordMessage}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="mt-5 space-y-4">
          {[
            {
              name: "currentPassword",
              label: "Current Password",
              placeholder: "Enter current password",
            },
            {
              name: "newPassword",
              label: "New Password",
              placeholder: "At least 8 characters",
            },
            {
              name: "confirmPassword",
              label: "Confirm New Password",
              placeholder: "Re-enter new password",
            },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                {field.label}
              </label>

              <div className="relative">
                <input
                  id={field.name}
                  name={field.name}
                  type={showPassword ? "text" : "password"}
                  value={passwordForm[field.name]}
                  onChange={handlePasswordChange}
                  placeholder={field.placeholder}
                  autoComplete="off"
                  className="w-full rounded-xl border border-slate-300 px-3 py-3 pr-12 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                {field.name === "newPassword" && (
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword ? "Hide passwords" : "Show passwords"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <LockKeyhole size={16} />
            Validate Password Change
          </button>
        </form>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          This is a frontend demonstration. No password is changed or sent
          to a server. Real password changes must be handled securely by
          the backend.
        </p>
      </section>

      {/* Save settings */}
      <section className="flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-slate-900">
            Save Your Preferences
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Save the current settings in this session or restore the defaults.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={handleResetSettings}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw size={16} />
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={handleSaveSettings}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Save size={17} />
            Save Preferences
          </button>
        </div>
      </section>

      <p className="text-xs leading-5 text-slate-500">
        Preferences are currently managed in React state and reset on
        page reload. Email, SMS, language translation, theme switching,
        and server-side account security are not connected yet.
      </p>
    </div>
  );
};

export default ParentSettings;