import { useState } from "react";
import {
  Settings as SettingsIcon,
  LockKeyhole,
  Bell,
  Monitor,
  ShieldCheck,
  Save,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

const TeacherSettings = () => {
  const [notifications, setNotifications] = useState({
    announcements: true,
    assignments: true,
    examinations: true,
    attendance: false,
  });

  const [preferences, setPreferences] = useState({
    language: "English",
    theme: "Light",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [saved, setSaved] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPasswordMessage("");
  };

  const handleSavePreferences = () => {
    console.log("Teacher settings:", {
      notifications,
      preferences,
    });

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordMessage("Please fill in all password fields.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage("New passwords do not match.");
      return;
    }

    console.log("Mock password change:", passwordData);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordMessage("Password changed successfully.");

    setTimeout(() => {
      setPasswordMessage("");
    }, 3000);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <p className="text-sm font-medium text-blue-600">
          Account
        </p>

        <div className="mt-1 flex items-center gap-3">
          <SettingsIcon
            size={24}
            className="text-slate-700"
          />

          <h1 className="text-2xl font-bold text-slate-900">
            Settings
          </h1>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Manage your account preferences, notifications,
          security, and other settings.
        </p>
      </div>

      {/* Save Success Message */}
      {saved && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2 size={18} />

          <span>
            Settings saved successfully.
          </span>
        </div>
      )}

      {/* Account Security */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Account Security
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your password and account security.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleChangePassword}
          className="space-y-5 p-5 sm:p-6"
        >
          <div>
            <label
              htmlFor="currentPassword"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Current Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="currentPassword"
                name="currentPassword"
                type={
                  showPasswords.current
                    ? "text"
                    : "password"
                }
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() =>
                  togglePasswordVisibility("current")
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                aria-label={
                  showPasswords.current
                    ? "Hide current password"
                    : "Show current password"
                }
              >
                {showPasswords.current ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                New Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="newPassword"
                  name="newPassword"
                  type={
                    showPasswords.new
                      ? "text"
                      : "password"
                  }
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    togglePasswordVisibility("new")
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  aria-label={
                    showPasswords.new
                      ? "Hide new password"
                      : "Show new password"
                  }
                >
                  {showPasswords.new ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Confirm New Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showPasswords.confirm
                      ? "text"
                      : "password"
                  }
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    togglePasswordVisibility("confirm")
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  aria-label={
                    showPasswords.confirm
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showPasswords.confirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {passwordMessage && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                passwordMessage.includes("successfully")
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {passwordMessage}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
            >
              <LockKeyhole size={17} />
              Change Password
            </button>
          </div>
        </form>
      </section>

      {/* Notification Settings */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <Bell size={20} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose which notifications you want to receive.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {/* Announcements */}
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Announcements
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Receive notifications about school announcements.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handleNotificationChange("announcements")
              }
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                notifications.announcements
                  ? "bg-blue-900"
                  : "bg-slate-300"
              }`}
              aria-label="Toggle announcement notifications"
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                  notifications.announcements
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Assignments */}
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Assignments
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Receive updates related to assignments and submissions.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handleNotificationChange("assignments")
              }
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                notifications.assignments
                  ? "bg-blue-900"
                  : "bg-slate-300"
              }`}
              aria-label="Toggle assignment notifications"
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                  notifications.assignments
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Examinations */}
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Examinations
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Receive examination-related notifications.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handleNotificationChange("examinations")
              }
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                notifications.examinations
                  ? "bg-blue-900"
                  : "bg-slate-300"
              }`}
              aria-label="Toggle examination notifications"
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                  notifications.examinations
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Attendance */}
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Attendance
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Receive notifications related to attendance records.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handleNotificationChange("attendance")
              }
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                notifications.attendance
                  ? "bg-blue-900"
                  : "bg-slate-300"
              }`}
              aria-label="Toggle attendance notifications"
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                  notifications.attendance
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <Monitor size={20} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Preferences
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Customize your dashboard experience.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {/* Language */}
          <div className="grid gap-2 sm:grid-cols-[220px_1fr] sm:items-center">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Language
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Select your preferred interface language.
              </p>
            </div>

            <select
              value={preferences.language}
              onChange={(e) =>
                handlePreferenceChange(
                  "language",
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="English">English</option>
              <option value="Amharic">Amharic</option>
            </select>
          </div>

          {/* Theme */}
          <div className="grid gap-2 sm:grid-cols-[220px_1fr] sm:items-center">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Theme
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Choose how the dashboard should appear.
              </p>
            </div>

            <select
              value={preferences.theme}
              onChange={(e) =>
                handlePreferenceChange(
                  "theme",
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
              <option value="System">System Default</option>
            </select>
          </div>

          <div className="flex justify-end border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={handleSavePreferences}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
            >
              <Save size={17} />
              Save Settings
            </button>
          </div>
        </div>
      </section>

      {/* Account Information */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <SettingsIcon size={20} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Account Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Basic information about your system account.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Account Role
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-800">
              Teacher
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Account Status
            </p>

            <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Active
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Username
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-800">
              GGSS.TCH0001
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Employee ID
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-800">
              TCH-0001
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherSettings;