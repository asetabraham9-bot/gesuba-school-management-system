import {
  Bell,
  Check,
  KeyRound,
  Lock,
  LogOut,
  Mail,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    announcements: true,
    assignments: true,
    examinations: true,
    email: false,
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
  });

  const handleNotificationChange = (key) => {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const handlePrivacyChange = (key) => {
    setPrivacy((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your account preferences, notifications, and security.
        </p>
      </div>

      {/* Account Settings */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={UserRound}
          title="Account Settings"
          description="Manage basic account preferences."
        />

        <div className="space-y-5 p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Display Name
              </label>

              <input
                type="text"
                defaultValue="Abraham Asayehu"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                defaultValue="abraham@example.com"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </section>

      {/* Change Password */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={KeyRound}
          title="Change Password"
          description="Update your account password."
        />

        <div className="space-y-5 p-5 sm:p-6">
          <div className="grid gap-5 md:grid-cols-3">
            <PasswordField
              label="Current Password"
              placeholder="Enter current password"
            />

            <PasswordField
              label="New Password"
              placeholder="Enter new password"
            />

            <PasswordField
              label="Confirm Password"
              placeholder="Confirm new password"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <KeyRound className="h-4 w-4" />
              Update Password
            </button>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={Bell}
          title="Notifications"
          description="Choose which notifications you want to receive."
        />

        <div className="divide-y divide-slate-100">
          <ToggleItem
            title="Announcements"
            description="Receive notifications when the school publishes announcements."
            enabled={notifications.announcements}
            onChange={() => handleNotificationChange("announcements")}
          />

          <ToggleItem
            title="Assignment Notifications"
            description="Get notified about new assignments and upcoming deadlines."
            enabled={notifications.assignments}
            onChange={() => handleNotificationChange("assignments")}
          />

          <ToggleItem
            title="Examination Notifications"
            description="Receive updates about examinations and examination schedules."
            enabled={notifications.examinations}
            onChange={() => handleNotificationChange("examinations")}
          />

          <ToggleItem
            title="Email Notifications"
            description="Receive important school notifications through email."
            enabled={notifications.email}
            onChange={() => handleNotificationChange("email")}
          />
        </div>
      </section>

      {/* Privacy */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={Lock}
          title="Privacy"
          description="Control how your profile information is displayed."
        />

        <div className="divide-y divide-slate-100">
          <ToggleItem
            title="Show Profile to Teachers"
            description="Allow teachers to view your basic student profile information."
            enabled={privacy.showProfile}
            onChange={() => handlePrivacyChange("showProfile")}
          />
        </div>
      </section>

      {/* Security */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={ShieldCheck}
          title="Security"
          description="Review your account security information."
        />

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          <SecurityItem
            icon={Mail}
            title="Email Verification"
            status="Verified"
          />

          <SecurityItem
            icon={Lock}
            title="Password"
            status="Last changed recently"
          />
        </div>
      </section>

      {/* Logout */}
      <section className="rounded-2xl border border-red-200 bg-white shadow-sm">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Sign Out
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Sign out of your GGSS student account on this device.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex items-start gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
      <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <h2 className="font-semibold text-slate-900">{title}</h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
};

const PasswordField = ({ label, placeholder }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type="password"
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
      />
    </div>
  );
};

const ToggleItem = ({
  title,
  description,
  enabled,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between gap-5 p-5 sm:px-6">
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-pressed={enabled}
        className={`relative flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition ${
          enabled ? "bg-slate-900" : "bg-slate-300"
        }`}
      >
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm transition ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        >
          {enabled && (
            <Check className="h-2.5 w-2.5 text-slate-900" />
          )}
        </span>
      </button>
    </div>
  );
};

const SecurityItem = ({ icon: Icon, title, status }) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
      <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <p className="text-sm font-medium text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {status}
        </p>
      </div>
    </div>
  );
};

export default Settings;