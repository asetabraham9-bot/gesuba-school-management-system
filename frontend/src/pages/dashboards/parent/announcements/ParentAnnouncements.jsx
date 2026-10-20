import { useMemo, useState } from "react";
import {
  AlertCircle,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronUp,
  Clock,
  GraduationCap,
  Megaphone,
  Pin,
  Search,
  Users,
} from "lucide-react";

const children = [
  {
    id: "GGSS.STU0001",
    name: "Abebe Kebede",
    grade: "Grade 12",
    section: "A",
  },
  {
    id: "GGSS.STU0002",
    name: "Sara Kebede",
    grade: "Grade 9",
    section: "B",
  },
];

const initialAnnouncements = [
  {
    id: 1,
    title: "Grade 12 Regional Model Examination Preparation",
    category: "Examinations",
    priority: "High",
    audience: "Grade 12",
    grades: ["Grade 12"],
    publishedAt: "2026-10-19",
    deadline: "2026-10-25",
    pinned: true,
    author: "Academic Office",
    summary:
      "Students should review the examination timetable and prepare all required learning materials.",
    content:
      "Dear parents and guardians, Grade 12 students are encouraged to follow their revision plans in preparation for the upcoming Regional Model Examination. Please help your child maintain a consistent study schedule, attend all lessons, and get sufficient rest. The detailed timetable will be shared by the school through the appropriate academic channels.",
  },
  {
    id: 2,
    title: "Parent and Teacher Consultation Meeting",
    category: "Meetings",
    priority: "High",
    audience: "Grade 9",
    grades: ["Grade 9"],
    publishedAt: "2026-10-18",
    deadline: "2026-10-27",
    pinned: true,
    author: "School Administration",
    summary:
      "Parents are invited to discuss student progress, attendance, and learning support.",
    content:
      "Dear parents and guardians, the school invites you to a parent and teacher consultation meeting to discuss academic progress, classroom participation, attendance, and ways to support students at home. Please contact the school office or your child's class teacher for the confirmed meeting time and venue.",
  },
  {
    id: 3,
    title: "Monthly Attendance Follow-Up",
    category: "Attendance",
    priority: "Medium",
    audience: "All Grades",
    grades: [],
    publishedAt: "2026-10-17",
    deadline: "2026-10-31",
    pinned: false,
    author: "Student Affairs Office",
    summary:
      "Parents are encouraged to review attendance records and report any discrepancies.",
    content:
      "Regular attendance helps students maintain continuity in their learning. Please review your child's attendance information in the Parent Dashboard. If you notice a missing or incorrect entry, contact the class teacher or Student Affairs Office so it can be reviewed.",
  },
  {
    id: 4,
    title: "Assignment Completion Reminder",
    category: "Academic",
    priority: "Medium",
    audience: "All Grades",
    grades: [],
    publishedAt: "2026-10-16",
    deadline: "2026-10-24",
    pinned: false,
    author: "Academic Office",
    summary:
      "Please help students plan their time and complete assignments before the deadlines.",
    content:
      "Parents and guardians are encouraged to help students establish a regular homework routine. Students should check assignment instructions, confirm due dates, and ask their teachers for clarification when needed. You can review the available assignment information in the Parent Dashboard.",
  },
  {
    id: 5,
    title: "School Library Study Support",
    category: "Activities",
    priority: "Low",
    audience: "All Grades",
    grades: [],
    publishedAt: "2026-10-14",
    deadline: null,
    pinned: false,
    author: "Library Office",
    summary:
      "Students are encouraged to use available library resources for independent study.",
    content:
      "The school encourages students to make effective use of library resources to strengthen their understanding of classroom topics. Parents can support this effort by encouraging reading, independent study, and responsible use of learning materials.",
  },
  {
    id: 6,
    title: "Grade 12 Academic Progress Review",
    category: "Academic",
    priority: "Medium",
    audience: "Grade 12",
    grades: ["Grade 12"],
    publishedAt: "2026-10-12",
    deadline: "2026-10-30",
    pinned: false,
    author: "Grade 12 Coordination Office",
    summary:
      "Review your child's recent results and discuss any learning challenges with teachers.",
    content:
      "Parents of Grade 12 students are encouraged to review examination results and academic progress with their children. Pay attention to subjects where additional practice may be useful. Contact the relevant teacher if you would like guidance on supporting your child's preparation.",
  },
];

const categories = [
  "All Categories",
  "Academic",
  "Examinations",
  "Attendance",
  "Meetings",
  "Activities",
  "General",
];

const priorities = ["All Priorities", "High", "Medium", "Low"];

const formatDate = (date) => {
  if (!date) return null;

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const priorityStyles = {
  High: "bg-red-50 text-red-700 ring-red-200",
  Medium: "bg-amber-50 text-amber-700 ring-amber-200",
  Low: "bg-slate-100 text-slate-600 ring-slate-200",
};

const categoryStyles = {
  Academic: "bg-blue-50 text-blue-700",
  Examinations: "bg-violet-50 text-violet-700",
  Attendance: "bg-amber-50 text-amber-700",
  Meetings: "bg-emerald-50 text-emerald-700",
  Activities: "bg-cyan-50 text-cyan-700",
  General: "bg-slate-100 text-slate-600",
};

const StatCard = ({ label, value, icon: Icon, detail }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
        {detail && (
          <p className="mt-1 text-xs text-slate-500">{detail}</p>
        )}
      </div>
      <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
        <Icon size={21} />
      </div>
    </div>
  </div>
);

const ParentAnnouncements = () => {
  const [announcements] = useState(initialAnnouncements);
  const [selectedChild, setSelectedChild] = useState("all");
  const [category, setCategory] = useState("All Categories");
  const [priority, setPriority] = useState("All Priorities");
  const [search, setSearch] = useState("");
  const [readIds, setReadIds] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [readFilter, setReadFilter] = useState("All");

  const activeChild = children.find((child) => child.id === selectedChild);

  const filteredAnnouncements = useMemo(() => {
    const query = search.trim().toLowerCase();

    return announcements
      .filter((announcement) => {
        const matchesChild =
          selectedChild === "all" ||
          announcement.grades.length === 0 ||
          announcement.grades.includes(activeChild?.grade);

        const matchesCategory =
          category === "All Categories" ||
          announcement.category === category;

        const matchesPriority =
          priority === "All Priorities" ||
          announcement.priority === priority;

        const matchesRead =
          readFilter === "All" ||
          (readFilter === "Unread" &&
            !readIds.includes(announcement.id)) ||
          (readFilter === "Read" &&
            readIds.includes(announcement.id));

        const matchesSearch =
          !query ||
          [
            announcement.title,
            announcement.summary,
            announcement.content,
            announcement.category,
            announcement.author,
            announcement.audience,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query);

        return (
          matchesChild &&
          matchesCategory &&
          matchesPriority &&
          matchesRead &&
          matchesSearch
        );
      })
      .sort(
        (a, b) =>
          Number(b.pinned) - Number(a.pinned) ||
          b.publishedAt.localeCompare(a.publishedAt)
      );
  }, [
    announcements,
    selectedChild,
    activeChild,
    category,
    priority,
    search,
    readFilter,
    readIds,
  ]);

  const unreadCount = announcements.filter(
    (item) => !readIds.includes(item.id)
  ).length;

  const highPriorityCount = announcements.filter(
    (item) => item.priority === "High"
  ).length;

  const markAsRead = (id) => {
    setReadIds((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
  };

  const toggleExpanded = (id) => {
    setExpandedIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );

    markAsRead(id);
  };

  const markAllAsRead = () => {
    setReadIds((previous) => [
      ...new Set([...previous, ...announcements.map((item) => item.id)]),
    ]);
  };

  const clearFilters = () => {
    setSelectedChild("all");
    setCategory("All Categories");
    setPriority("All Priorities");
    setSearch("");
    setReadFilter("All");
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <GraduationCap size={17} />
            Parent Portal
            <span>/</span>
            Communication
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Parent Announcements
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Stay informed about school activities, academic updates,
            examination notices, and important reminders.
          </p>
        </div>

        <button
          type="button"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCheck size={17} />
          Mark all as read
        </button>
      </div>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          icon={Megaphone}
          label="Available Announcements"
          value={announcements.length}
          detail="Across all announcement categories"
        />
        <StatCard
          icon={Bell}
          label="Unread Announcements"
          value={unreadCount}
          detail="Items not yet opened"
        />
        <StatCard
          icon={AlertCircle}
          label="High Priority"
          value={highPriorityCount}
          detail="Important notices to review"
        />
      </section>

      {/* Priority notice */}
      {announcements.some(
        (item) =>
          item.pinned &&
          item.priority === "High" &&
          !readIds.includes(item.id) &&
          (selectedChild === "all" ||
            item.grades.length === 0 ||
            item.grades.includes(activeChild?.grade))
      ) && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="rounded-xl bg-white p-2.5 text-amber-700">
            <AlertCircle size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-amber-900">
              Important notices need your attention
            </h2>
            <p className="mt-1 text-sm leading-6 text-amber-800">
              Review pinned, high-priority announcements for relevant
              examination information and upcoming school activities.
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Search size={19} className="text-blue-600" />
          <h2 className="font-semibold text-slate-900">
            Find Announcements
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="sm:col-span-2 xl:col-span-1">
            <label
              htmlFor="announcement-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Search
            </label>
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="announcement-search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title or content..."
                className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="announcement-child"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Relevant to
            </label>
            <select
              id="announcement-child"
              value={selectedChild}
              onChange={(event) => setSelectedChild(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All my children</option>
              {children.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name} · {child.grade}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="announcement-category"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Category
            </label>
            <select
              id="announcement-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="announcement-priority"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Priority
            </label>
            <select
              id="announcement-priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {priorities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {["All", "Unread", "Read"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setReadFilter(item)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  readFilter === item
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item}
                {item === "Unread" && (
                  <span className="ml-2">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="self-start text-sm font-medium text-blue-700 hover:text-blue-800 sm:self-auto"
          >
            Clear filters
          </button>
        </div>
      </section>

      {/* Announcement list */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-900">
            Latest Announcements
          </h2>
          <p className="text-sm text-slate-500">
            Showing {filteredAnnouncements.length} of {announcements.length}
          </p>
        </div>

        {filteredAnnouncements.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <Megaphone size={26} />
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">
              No announcements found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try changing your search terms or filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredAnnouncements.map((announcement) => {
            const isRead = readIds.includes(announcement.id);
            const isExpanded = expandedIds.includes(announcement.id);

            return (
              <article
                key={announcement.id}
                className={`rounded-2xl border bg-white shadow-sm transition ${
                  !isRead
                    ? "border-blue-200"
                    : "border-slate-200"
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        categoryStyles[announcement.category] ||
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {announcement.category === "Examinations" ? (
                        <GraduationCap size={21} />
                      ) : announcement.category === "Meetings" ? (
                        <Users size={21} />
                      ) : announcement.category === "Attendance" ? (
                        <CalendarDays size={21} />
                      ) : announcement.category === "Academic" ? (
                        <BookOpen size={21} />
                      ) : (
                        <Megaphone size={21} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            categoryStyles[announcement.category] ||
                            "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {announcement.category}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                            priorityStyles[announcement.priority]
                          }`}
                        >
                          {announcement.priority} priority
                        </span>
                        {announcement.pinned && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                            <Pin size={13} />
                            Pinned
                          </span>
                        )}
                        {!isRead && (
                          <span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
                            New
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 text-base font-semibold text-slate-900 sm:text-lg">
                        {announcement.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {announcement.summary}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          Published {formatDate(announcement.publishedAt)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Users size={14} />
                          {announcement.audience}
                        </span>
                        {announcement.deadline && (
                          <span className="inline-flex items-center gap-1.5">
                            <Clock size={14} />
                            Deadline {formatDate(announcement.deadline)}
                          </span>
                        )}
                      </div>

                      {isExpanded && (
                        <div className="mt-5 rounded-xl bg-slate-50 p-4">
                          <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
                            {announcement.content}
                          </p>
                          <div className="mt-4 border-t border-slate-200 pt-3 text-xs text-slate-500">
                            Published by{" "}
                            <span className="font-medium text-slate-700">
                              {announcement.author}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleExpanded(announcement.id)}
                          aria-expanded={isExpanded}
                          className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                        >
                          {isExpanded ? "Show less" : "Read announcement"}
                          {isExpanded ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>

                        {isRead ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                            <Check size={15} />
                            Read
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => markAsRead(announcement.id)}
                            className="text-sm font-medium text-slate-500 transition hover:text-slate-800"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Footer note */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-white p-3 text-blue-700">
            <Bell size={21} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">
              Stay connected with the school
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Check announcements regularly for academic updates, meeting
              information, and important reminders. For urgent questions,
              contact the relevant teacher or school office.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              These announcements are sample frontend data and do not
              represent official school notices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParentAnnouncements;