import {
  AlertCircle,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  ChevronRight,
  //FileText,
  Megaphone,
  Pin,
  Search,
  ShieldAlert,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

const announcementsData = [
  {
    id: 1,
    title: "Mid-Term Examination Schedule Released",
    category: "Examination",
    priority: "High",
    date: "September 2, 2026",
    time: "10:30 AM",
    author: "Academic Office",
    description:
      "The official mid-term examination schedule has been released. Students are advised to review the schedule carefully and prepare according to their subjects.",
    pinned: true,
    read: false,
  },
  {
    id: 2,
    title: "School Science Laboratory Orientation",
    category: "Academic",
    priority: "Normal",
    date: "September 1, 2026",
    time: "2:15 PM",
    author: "Science Department",
    description:
      "Students participating in laboratory activities are invited to attend the upcoming laboratory orientation session. Attendance is required for students joining practical sessions.",
    pinned: true,
    read: false,
  },
  {
    id: 3,
    title: "Student Council Meeting",
    category: "Event",
    priority: "Normal",
    date: "August 31, 2026",
    time: "9:00 AM",
    author: "Student Affairs Office",
    description:
      "The student council will hold its monthly meeting this week. Representatives are requested to prepare their reports and discussion points.",
    pinned: false,
    read: true,
  },
  {
    id: 4,
    title: "Library Opening Hours Updated",
    category: "General",
    priority: "Low",
    date: "August 29, 2026",
    time: "11:20 AM",
    author: "School Library",
    description:
      "The school library has updated its opening hours. Students are encouraged to make use of the extended study period during weekdays.",
    pinned: false,
    read: true,
  },
  {
    id: 5,
    title: "School Sports Club Registration",
    category: "Event",
    priority: "Normal",
    date: "August 28, 2026",
    time: "3:40 PM",
    author: "Sports Department",
    description:
      "Registration is now open for students interested in joining school sports clubs. Students can contact the Sports Department for additional information.",
    pinned: false,
    read: false,
  },
  {
    id: 6,
    title: "Important Student Attendance Reminder",
    category: "Academic",
    priority: "High",
    date: "August 27, 2026",
    time: "8:30 AM",
    author: "School Administration",
    description:
      "Students are reminded that regular attendance is important for academic progress. Students should report to classes on time and maintain the required attendance level.",
    pinned: false,
    read: true,
  },
  {
    id: 7,
    title: "School Community Clean-Up Program",
    category: "General",
    priority: "Normal",
    date: "August 25, 2026",
    time: "1:10 PM",
    author: "School Administration",
    description:
      "The school community will participate in a scheduled clean-up activity. Students are encouraged to participate and help maintain a clean learning environment.",
    pinned: false,
    read: true,
  },
];

const categoryStyles = {
  Examination: {
    icon: ClipboardCheck,
    iconClass: "text-violet-600",
    background: "bg-violet-50",
    badge: "bg-violet-50 text-violet-700 ring-violet-200",
  },

  Academic: {
    icon: BookOpen,
    iconClass: "text-blue-600",
    background: "bg-blue-50",
    badge: "bg-blue-50 text-blue-700 ring-blue-200",
  },

  Event: {
    icon: CalendarDays,
    iconClass: "text-emerald-600",
    background: "bg-emerald-50",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },

  General: {
    icon: Megaphone,
    iconClass: "text-slate-600",
    background: "bg-slate-100",
    badge: "bg-slate-100 text-slate-700 ring-slate-200",
  },
};

const priorityStyles = {
  High: {
    icon: ShieldAlert,
    className: "text-red-600",
    label: "High priority",
  },

  Normal: {
    icon: AlertCircle,
    className: "text-amber-600",
    label: "Normal priority",
  },

  Low: {
    icon: CheckCircle2,
    className: "text-slate-400",
    label: "Low priority",
  },
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(announcementsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(announcementsData.map((item) => item.category)),
    ];
  }, []);

  const unreadCount = announcements.filter(
    (announcement) => !announcement.read
  ).length;

  const pinnedCount = announcements.filter(
    (announcement) => announcement.pinned
  ).length;

  const filteredAnnouncements = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    return announcements
      .filter((announcement) => {
        const matchesSearch =
          !normalizedSearch ||
          announcement.title.toLowerCase().includes(normalizedSearch) ||
          announcement.description
            .toLowerCase()
            .includes(normalizedSearch) ||
          announcement.author.toLowerCase().includes(normalizedSearch);

        const matchesCategory =
          categoryFilter === "All" ||
          announcement.category === categoryFilter;

        const matchesStatus =
          statusFilter === "All" ||
          (statusFilter === "Unread" && !announcement.read) ||
          (statusFilter === "Read" && announcement.read);

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (a.pinned !== b.pinned) {
          return Number(b.pinned) - Number(a.pinned);
        }

        return Number(a.read) - Number(b.read);
      });
  }, [announcements, searchTerm, categoryFilter, statusFilter]);

  const markAsRead = (announcementId) => {
    setAnnouncements((currentAnnouncements) =>
      currentAnnouncements.map((announcement) =>
        announcement.id === announcementId
          ? {
              ...announcement,
              read: true,
            }
          : announcement
      )
    );
  };

  const markAllAsRead = () => {
    setAnnouncements((currentAnnouncements) =>
      currentAnnouncements.map((announcement) => ({
        ...announcement,
        read: true,
      }))
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <Bell className="h-4 w-4" />
            <span>Student Communication</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Announcements
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500 sm:text-base">
            Stay updated with important school news, academic information,
            events, and notices.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <CheckCircle2 className="h-4 w-4" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Total Announcements"
          value={announcements.length}
          description="Available notices"
          icon={Megaphone}
          iconClass="text-blue-600"
          iconBackground="bg-blue-50"
        />

        <SummaryCard
          title="Unread"
          value={unreadCount}
          description="Need your attention"
          icon={Bell}
          iconClass="text-violet-600"
          iconBackground="bg-violet-50"
        />

        <SummaryCard
          title="Pinned"
          value={pinnedCount}
          description="Important notices"
          icon={Pin}
          iconClass="text-amber-600"
          iconBackground="bg-amber-50"
        />
      </div>

      {/* Information Notice */}
      <div className="flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <div className="mt-0.5 shrink-0">
          <Bell className="h-5 w-5 text-blue-600" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-blue-900">
            Keep checking announcements
          </h2>

          <p className="mt-1 text-sm leading-6 text-blue-800">
            Important examination schedules, academic notices, events, and
            administrative information will be published here.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-slate-500" />

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Find Announcements
            </h2>

            <p className="text-sm text-slate-500">
              Search and filter school announcements.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search announcements..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All" ? "All Categories" : category}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All Announcements</option>
            <option value="Unread">Unread</option>
            <option value="Read">Read</option>
          </select>
        </div>
      </section>

      {/* Announcement List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Latest Announcements
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredAnnouncements.length} announcement
              {filteredAnnouncements.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {filteredAnnouncements.length > 0 ? (
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onMarkAsRead={markAsRead}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <Search className="mx-auto h-8 w-8 text-slate-300" />

            <h3 className="mt-3 text-sm font-semibold text-slate-900">
              No announcements found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filter options.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

const SummaryCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
  iconBackground,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>

          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>

        <div className={`rounded-xl p-3 ${iconBackground}`}>
          <Icon className={`h-5 w-5 ${iconClass}`} />
        </div>
      </div>
    </div>
  );
};

const AnnouncementCard = ({ announcement, onMarkAsRead }) => {
  const categoryStyle =
    categoryStyles[announcement.category] || categoryStyles.General;

  const CategoryIcon = categoryStyle.icon;

  const priorityStyle =
    priorityStyles[announcement.priority] || priorityStyles.Normal;

  const PriorityIcon = priorityStyle.icon;

  return (
    <article
      className={`rounded-2xl border bg-white shadow-sm transition hover:shadow-md ${
        announcement.read
          ? "border-slate-200"
          : "border-blue-200 ring-1 ring-blue-50"
      }`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex gap-4">
          {/* Category Icon */}
          <div
            className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:flex ${categoryStyle.background}`}
          >
            <CategoryIcon
              className={`h-6 w-6 ${categoryStyle.iconClass}`}
            />
          </div>

          <div className="min-w-0 flex-1">
            {/* Title and Priority */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {!announcement.read && (
                    <span
                      className="h-2 w-2 rounded-full bg-blue-600"
                      title="Unread"
                    />
                  )}

                  {announcement.pinned && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-200">
                      <Pin className="h-3 w-3" />
                      Pinned
                    </span>
                  )}

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${categoryStyle.badge}`}
                  >
                    {announcement.category}
                  </span>
                </div>

                <h3
                  className={`mt-3 text-base font-semibold sm:text-lg ${
                    announcement.read
                      ? "text-slate-800"
                      : "text-slate-900"
                  }`}
                >
                  {announcement.title}
                </h3>
              </div>

              <div
                className={`flex shrink-0 items-center gap-1.5 text-xs font-medium ${priorityStyle.className}`}
              >
                <PriorityIcon className="h-4 w-4" />
                {priorityStyle.label}
              </div>
            </div>

            {/* Description */}
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {announcement.description}
            </p>

            {/* Footer */}
            <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {announcement.date}
                </span>

                <span>{announcement.time}</span>

                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  {announcement.author}
                </span>
              </div>

              {!announcement.read ? (
                <button
                  type="button"
                  onClick={() => onMarkAsRead(announcement.id)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Mark as read
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Read
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Announcements;
