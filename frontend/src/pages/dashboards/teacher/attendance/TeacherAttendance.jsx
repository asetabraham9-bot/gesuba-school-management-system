import { useMemo, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Users,
  UserX,
  ChevronRight,
  X,
  Save,
} from "lucide-react";

/* =========================================================
   MOCK DATA
   Replace these with backend data later.
========================================================= */

const initialAttendanceSummary = {
  totalStudents: 40,
  present: 34,
  absent: 4,
  late: 2,
};

const initialRecentSessions = [
  {
    id: 1,
    date: "2026-10-04",
    subject: "Mathematics",
    grade: "Grade 12",
    section: "Section A",
    present: 34,
    absent: 4,
    late: 2,
    percentage: 85,
    students: [
      {
        id: "GGSS.STU0001",
        name: "Abebe Kebede",
        status: "Present",
      },
      {
        id: "GGSS.STU0002",
        name: "Sara Mohammed",
        status: "Present",
      },
      {
        id: "GGSS.STU0003",
        name: "Daniel Tesfaye",
        status: "Present",
      },
      {
        id: "GGSS.STU0004",
        name: "Hana Bekele",
        status: "Present",
      },
      {
        id: "GGSS.STU0005",
        name: "Yonas Alemu",
        status: "Absent",
      },
      {
        id: "GGSS.STU0006",
        name: "Mekdes Girma",
        status: "Present",
      },
      {
        id: "GGSS.STU0007",
        name: "Samuel Worku",
        status: "Late",
      },
      {
        id: "GGSS.STU0008",
        name: "Rahel Tadesse",
        status: "Present",
      },
    ],
  },
  {
    id: 2,
    date: "2026-10-03",
    subject: "Mathematics",
    grade: "Grade 12",
    section: "Section A",
    present: 36,
    absent: 3,
    late: 1,
    percentage: 90,
    students: [
      {
        id: "GGSS.STU0001",
        name: "Abebe Kebede",
        status: "Present",
      },
      {
        id: "GGSS.STU0002",
        name: "Sara Mohammed",
        status: "Present",
      },
      {
        id: "GGSS.STU0003",
        name: "Daniel Tesfaye",
        status: "Present",
      },
      {
        id: "GGSS.STU0004",
        name: "Hana Bekele",
        status: "Present",
      },
      {
        id: "GGSS.STU0005",
        name: "Yonas Alemu",
        status: "Present",
      },
      {
        id: "GGSS.STU0006",
        name: "Mekdes Girma",
        status: "Present",
      },
      {
        id: "GGSS.STU0007",
        name: "Samuel Worku",
        status: "Late",
      },
      {
        id: "GGSS.STU0008",
        name: "Rahel Tadesse",
        status: "Present",
      },
    ],
  },
  {
    id: 3,
    date: "2026-10-02",
    subject: "Physics",
    grade: "Grade 12",
    section: "Section A",
    present: 33,
    absent: 5,
    late: 2,
    percentage: 82.5,
    students: [
      {
        id: "GGSS.STU0001",
        name: "Abebe Kebede",
        status: "Present",
      },
      {
        id: "GGSS.STU0002",
        name: "Sara Mohammed",
        status: "Present",
      },
      {
        id: "GGSS.STU0003",
        name: "Daniel Tesfaye",
        status: "Absent",
      },
      {
        id: "GGSS.STU0004",
        name: "Hana Bekele",
        status: "Present",
      },
      {
        id: "GGSS.STU0005",
        name: "Yonas Alemu",
        status: "Absent",
      },
      {
        id: "GGSS.STU0006",
        name: "Mekdes Girma",
        status: "Present",
      },
      {
        id: "GGSS.STU0007",
        name: "Samuel Worku",
        status: "Late",
      },
      {
        id: "GGSS.STU0008",
        name: "Rahel Tadesse",
        status: "Present",
      },
    ],
  },
  {
    id: 4,
    date: "2026-10-01",
    subject: "Mathematics",
    grade: "Grade 12",
    section: "Section B",
    present: 31,
    absent: 6,
    late: 3,
    percentage: 77.5,
    students: [
      {
        id: "GGSS.STU0009",
        name: "Liya Solomon",
        status: "Present",
      },
      {
        id: "GGSS.STU0010",
        name: "Nahom Girma",
        status: "Absent",
      },
      {
        id: "GGSS.STU0011",
        name: "Meron Tesfaye",
        status: "Late",
      },
      {
        id: "GGSS.STU0012",
        name: "Bethel Alemu",
        status: "Present",
      },
    ],
  },
];

/* =========================================================
   MOCK STUDENTS BY GRADE + SECTION

   Later this will come from:
   GET /api/teacher/students?grade=...&section=...
========================================================= */

const studentsByClass = {
  "Grade 12-Section A": [
    {
      id: "GGSS.STU0001",
      name: "Abebe Kebede",
    },
    {
      id: "GGSS.STU0002",
      name: "Sara Mohammed",
    },
    {
      id: "GGSS.STU0003",
      name: "Daniel Tesfaye",
    },
    {
      id: "GGSS.STU0004",
      name: "Hana Bekele",
    },
    {
      id: "GGSS.STU0005",
      name: "Yonas Alemu",
    },
    {
      id: "GGSS.STU0006",
      name: "Mekdes Girma",
    },
    {
      id: "GGSS.STU0007",
      name: "Samuel Worku",
    },
    {
      id: "GGSS.STU0008",
      name: "Rahel Tadesse",
    },
  ],

  "Grade 12-Section B": [
    {
      id: "GGSS.STU0009",
      name: "Liya Solomon",
    },
    {
      id: "GGSS.STU0010",
      name: "Nahom Girma",
    },
    {
      id: "GGSS.STU0011",
      name: "Meron Tesfaye",
    },
    {
      id: "GGSS.STU0012",
      name: "Bethel Alemu",
    },
    {
      id: "GGSS.STU0013",
      name: "Henok Tadesse",
    },
    {
      id: "GGSS.STU0014",
      name: "Selamawit Bekele",
    },
    {
      id: "GGSS.STU0015",
      name: "Dawit Abraham",
    },
    {
      id: "GGSS.STU0016",
      name: "Rahel Worku",
    },
  ],

  "Grade 11-Section A": [
    {
      id: "GGSS.STU0017",
      name: "Biruk Alemu",
    },
    {
      id: "GGSS.STU0018",
      name: "Marta Kebede",
    },
    {
      id: "GGSS.STU0019",
      name: "Natnael Tesfaye",
    },
    {
      id: "GGSS.STU0020",
      name: "Hanna Mohammed",
    },
    {
      id: "GGSS.STU0021",
      name: "Robel Girma",
    },
    {
      id: "GGSS.STU0022",
      name: "Eden Bekele",
    },
  ],

  "Grade 10-Section A": [
    {
      id: "GGSS.STU0023",
      name: "Michael Abraham",
    },
    {
      id: "GGSS.STU0024",
      name: "Saron Kebede",
    },
    {
      id: "GGSS.STU0025",
      name: "Yonatan Girma",
    },
    {
      id: "GGSS.STU0026",
      name: "Selam Tesfaye",
    },
    {
      id: "GGSS.STU0027",
      name: "Henok Worku",
    },
  ],

  "Grade 9-Section A": [
    {
      id: "GGSS.STU0028",
      name: "Daniyal Mohammed",
    },
    {
      id: "GGSS.STU0029",
      name: "Mimi Bekele",
    },
    {
      id: "GGSS.STU0030",
      name: "Abel Tesfaye",
    },
    {
      id: "GGSS.STU0031",
      name: "Hirut Alemu",
    },
  ],
};

/* =========================================================
   OPTIONS
========================================================= */

const gradeOptions = [
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

const sectionOptions = [
  "Section A",
  "Section B",
  "Section C",
];

const subjectOptions = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
];

/* =========================================================
   COMPONENT
========================================================= */

const TeacherAttendance = () => {
  const [attendanceSummary, setAttendanceSummary] =
    useState(initialAttendanceSummary);

  const [recentSessions, setRecentSessions] =
    useState(initialRecentSessions);

  const [isTakingAttendance, setIsTakingAttendance] =
    useState(false);

  const [showHistory, setShowHistory] =
    useState(false);

  const [selectedDate, setSelectedDate] =
    useState("2026-10-04");

  const [selectedGrade, setSelectedGrade] =
    useState("Grade 12");

  const [selectedSection, setSelectedSection] =
    useState("Section A");

  const [selectedSubject, setSelectedSubject] =
    useState("Mathematics");

  const [attendanceRecords, setAttendanceRecords] =
    useState({});

  /* ---------------------------------------------------------
     Get students according to selected Grade + Section
  --------------------------------------------------------- */

  const selectedStudents = useMemo(() => {
    const key = `${selectedGrade}-${selectedSection}`;

    return studentsByClass[key] || [];
  }, [selectedGrade, selectedSection]);

  /* ---------------------------------------------------------
     Attendance counts for current session
  --------------------------------------------------------- */

  const currentAttendanceCounts = useMemo(() => {
    const records = Object.values(attendanceRecords);

    const present = records.filter(
      (status) => status === "Present"
    ).length;

    const absent = records.filter(
      (status) => status === "Absent"
    ).length;

    const late = records.filter(
      (status) => status === "Late"
    ).length;

    return {
      present,
      absent,
      late,
      total: selectedStudents.length,
    };
  }, [attendanceRecords, selectedStudents]);

  /* ---------------------------------------------------------
     Attendance percentage
  --------------------------------------------------------- */

  const attendancePercentage =
    attendanceSummary.totalStudents > 0
      ? Math.round(
          (attendanceSummary.present /
            attendanceSummary.totalStudents) *
            100
        )
      : 0;

  /* ---------------------------------------------------------
     Start Attendance
  --------------------------------------------------------- */

  const handleTakeAttendance = () => {
    const initialRecords = {};

    selectedStudents.forEach((student) => {
      initialRecords[student.id] = "Present";
    });

    setAttendanceRecords(initialRecords);
    setIsTakingAttendance(true);
    setShowHistory(false);
  };

  /* ---------------------------------------------------------
     Change student attendance status
  --------------------------------------------------------- */

  const handleAttendanceChange = (
    studentId,
    status
  ) => {
    setAttendanceRecords((previous) => ({
      ...previous,
      [studentId]: status,
    }));
  };

  /* ---------------------------------------------------------
     Save Attendance
  --------------------------------------------------------- */

  const handleSaveAttendance = () => {
    if (selectedStudents.length === 0) {
      return;
    }

    const students = selectedStudents.map(
      (student) => ({
        ...student,
        status:
          attendanceRecords[student.id] ||
          "Present",
      })
    );

    const present = students.filter(
      (student) => student.status === "Present"
    ).length;

    const absent = students.filter(
      (student) => student.status === "Absent"
    ).length;

    const late = students.filter(
      (student) => student.status === "Late"
    ).length;

    const percentage =
      students.length > 0
        ? Math.round(
            ((present + late) / students.length) *
              100
          )
        : 0;

    const newSession = {
      id: Date.now(),
      date: selectedDate,
      subject: selectedSubject,
      grade: selectedGrade,
      section: selectedSection,
      present,
      absent,
      late,
      percentage,
      students,
    };

    setRecentSessions((previous) => [
      newSession,
      ...previous,
    ]);

    setAttendanceSummary({
      totalStudents: students.length,
      present,
      absent,
      late,
    });

    setIsTakingAttendance(false);
    setShowHistory(false);
    setAttendanceRecords({});
  };

  /* ---------------------------------------------------------
     Cancel Attendance
  --------------------------------------------------------- */

  const handleCancelAttendance = () => {
    setIsTakingAttendance(false);
    setAttendanceRecords({});
  };

  /* ---------------------------------------------------------
     History
  --------------------------------------------------------- */

  const handleViewHistory = () => {
    setShowHistory((previous) => !previous);
    setIsTakingAttendance(false);
  };

  return (
    <div className="space-y-6">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Attendance Management
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Attendance
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Monitor student attendance, record daily
            attendance, and review attendance history for
            your assigned classes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleTakeAttendance}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <CalendarCheck size={17} />

          {isTakingAttendance
            ? "Attendance in Progress"
            : "Take Attendance"}
        </button>
      </div>

      {/* =====================================================
          TAKE ATTENDANCE
          Appears only after clicking Take Attendance
      ====================================================== */}

      {isTakingAttendance && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          {/* Session Selection */}

          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Attendance Session
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select the class and subject before marking
                student attendance.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Date */}

              <div>
                <label
                  htmlFor="attendance-date"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Date
                </label>

                <input
                  id="attendance-date"
                  type="date"
                  value={selectedDate}
                  onChange={(event) =>
                    setSelectedDate(
                      event.target.value
                    )
                  }
                  className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Grade */}

              <div>
                <label
                  htmlFor="attendance-grade"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Grade
                </label>

                <select
                  id="attendance-grade"
                  value={selectedGrade}
                  onChange={(event) =>
                    setSelectedGrade(
                      event.target.value
                    )
                  }
                  className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {gradeOptions.map((grade) => (
                    <option
                      key={grade}
                      value={grade}
                    >
                      {grade}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section */}

              <div>
                <label
                  htmlFor="attendance-section"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Section
                </label>

                <select
                  id="attendance-section"
                  value={selectedSection}
                  onChange={(event) =>
                    setSelectedSection(
                      event.target.value
                    )
                  }
                  className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {sectionOptions.map((section) => (
                    <option
                      key={section}
                      value={section}
                    >
                      {section}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}

              <div>
                <label
                  htmlFor="attendance-subject"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Subject
                </label>

                <select
                  id="attendance-subject"
                  value={selectedSubject}
                  onChange={(event) =>
                    setSelectedSubject(
                      event.target.value
                    )
                  }
                  className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {subjectOptions.map((subject) => (
                    <option
                      key={subject}
                      value={subject}
                    >
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Selected Class */}

          <div className="mt-5 flex flex-col gap-4 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Selected Class
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {selectedGrade} / {selectedSection} /{" "}
                {selectedSubject}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Attendance date: {selectedDate}
              </p>
            </div>

            <div className="flex items-center gap-5 text-sm">
              <span className="text-emerald-600">
                Present:{" "}
                <strong>
                  {currentAttendanceCounts.present}
                </strong>
              </span>

              <span className="text-red-600">
                Absent:{" "}
                <strong>
                  {currentAttendanceCounts.absent}
                </strong>
              </span>

              <span className="text-amber-600">
                Late:{" "}
                <strong>
                  {currentAttendanceCounts.late}
                </strong>
              </span>
            </div>
          </div>

          {/* Student List */}

          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Students
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Mark each student as Present, Absent, or
                Late.
              </p>
            </div>

            {selectedStudents.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        #
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Student
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Student ID
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Attendance
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedStudents.map(
                      (student, index) => {
                        const status =
                          attendanceRecords[
                            student.id
                          ] || "Present";

                        return (
                          <tr
                            key={student.id}
                            className="border-b border-slate-100 last:border-b-0"
                          >
                            <td className="px-4 py-4 text-sm text-slate-500">
                              {index + 1}
                            </td>

                            <td className="px-4 py-4">
                              <p className="text-sm font-semibold text-slate-800">
                                {student.name}
                              </p>
                            </td>

                            <td className="px-4 py-4 text-sm text-slate-500">
                              {student.id}
                            </td>

                            <td className="px-4 py-4">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAttendanceChange(
                                      student.id,
                                      "Present"
                                    )
                                  }
                                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                                    status === "Present"
                                      ? "bg-emerald-600 text-white"
                                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                  }`}
                                >
                                  Present
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAttendanceChange(
                                      student.id,
                                      "Absent"
                                    )
                                  }
                                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                                    status === "Absent"
                                      ? "bg-red-600 text-white"
                                      : "bg-red-50 text-red-700 hover:bg-red-100"
                                  }`}
                                >
                                  Absent
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAttendanceChange(
                                      student.id,
                                      "Late"
                                    )
                                  }
                                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                                    status === "Late"
                                      ? "bg-amber-500 text-white"
                                      : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                                  }`}
                                >
                                  Late
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-5 py-10 text-center">
                <Users
                  size={28}
                  className="mx-auto text-slate-400"
                />

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  No students found
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  No students are available for the
                  selected grade and section.
                </p>
              </div>
            )}
          </div>

          {/* Attendance Actions */}

          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancelAttendance}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <X size={17} />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveAttendance}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Save size={17} />
              Save Attendance
            </button>
          </div>
        </section>
      )}

      {/* =====================================================
          CURRENT CLASS
      ====================================================== */}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Current Class
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-slate-900">
                Grade 12
              </h2>

              <span className="text-slate-300">
                /
              </span>

              <span className="text-sm font-medium text-slate-700">
                Section A
              </span>

              <span className="text-slate-300">
                /
              </span>

              <span className="text-sm font-medium text-slate-700">
                Mathematics
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Attendance session for October 4, 2026
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
            <CalendarCheck
              size={18}
              className="text-slate-500"
            />

            <div>
              <p className="text-xs text-slate-500">
                Session Date
              </p>

              <p className="text-sm font-semibold text-slate-800">
                October 4, 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {/* Total Students */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Users size={20} />
            </div>

            <span className="text-xs font-medium text-slate-400">
              Students
            </span>
          </div>

          <p className="mt-4 text-2xl font-bold text-slate-900">
            {attendanceSummary.totalStudents}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Total students
          </p>
        </div>

        {/* Present */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>

            <span className="text-xs font-medium text-emerald-600">
              Present
            </span>
          </div>

          <p className="mt-4 text-2xl font-bold text-slate-900">
            {attendanceSummary.present}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Students present
          </p>
        </div>

        {/* Absent */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <UserX size={20} />
            </div>

            <span className="text-xs font-medium text-red-600">
              Absent
            </span>
          </div>

          <p className="mt-4 text-2xl font-bold text-slate-900">
            {attendanceSummary.absent}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Students absent
          </p>
        </div>

        {/* Late */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={20} />
            </div>

            <span className="text-xs font-medium text-amber-600">
              Late
            </span>
          </div>

          <p className="mt-4 text-2xl font-bold text-slate-900">
            {attendanceSummary.late}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Students late
          </p>
        </div>

        {/* Attendance Rate */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <CalendarCheck size={20} />
            </div>

            <span className="text-xs font-medium text-blue-600">
              Rate
            </span>
          </div>

          <p className="mt-4 text-2xl font-bold text-slate-900">
            {attendancePercentage}%
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Today's attendance
          </p>
        </div>
      </section>

      {/* =====================================================
          RECENT ATTENDANCE SESSIONS
      ====================================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Recent Attendance Sessions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Recent attendance records for your assigned
              classes.
            </p>
          </div>

          <button
            type="button"
            onClick={handleViewHistory}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            {showHistory
              ? "Hide history"
              : "View history"}

            <ChevronRight
              size={16}
              className={
                showHistory
                  ? "rotate-90"
                  : ""
              }
            />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Class
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Subject
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Present
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Absent
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Late
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Attendance
                </th>
              </tr>
            </thead>

            <tbody>
              {recentSessions.map((session) => (
                <tr
                  key={session.id}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="px-5 py-4 text-sm text-slate-700">
                    {session.date}
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800">
                      {session.grade}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {session.section}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {session.subject}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-emerald-600">
                    {session.present}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-red-600">
                    {session.absent}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-amber-600">
                    {session.late}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{
                            width: `${session.percentage}%`,
                          }}
                        />
                      </div>

                      <span className="text-sm font-semibold text-slate-700">
                        {session.percentage}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===================================================
            FULL ATTENDANCE HISTORY
        ==================================================== */}

        {showHistory && (
          <div className="border-t border-slate-200 bg-slate-50 p-5">
            <div className="mb-4">
              <h3 className="text-base font-semibold text-slate-900">
                Attendance History
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                View complete student attendance for
                recorded sessions.
              </p>
            </div>

            <div className="space-y-4">
              {recentSessions.map((session) => (
                <details
                  key={`history-${session.id}`}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  <summary className="cursor-pointer list-none px-4 py-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {session.subject} ·{" "}
                          {session.grade} ·{" "}
                          {session.section}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {session.date}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs font-semibold">
                        <span className="text-emerald-600">
                          Present: {session.present}
                        </span>

                        <span className="text-red-600">
                          Absent: {session.absent}
                        </span>

                        <span className="text-amber-600">
                          Late: {session.late}
                        </span>

                        <span className="text-blue-600">
                          Rate:{" "}
                          {session.percentage}%
                        </span>
                      </div>
                    </div>
                  </summary>

                  <div className="border-t border-slate-200">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px]">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                              #
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Student
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Student ID
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Status
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {session.students.map(
                            (
                              student,
                              index
                            ) => (
                              <tr
                                key={
                                  student.id
                                }
                                className="border-t border-slate-100"
                              >
                                <td className="px-4 py-3 text-sm text-slate-500">
                                  {index + 1}
                                </td>

                                <td className="px-4 py-3 text-sm font-medium text-slate-800">
                                  {student.name}
                                </td>

                                <td className="px-4 py-3 text-sm text-slate-500">
                                  {student.id}
                                </td>

                                <td className="px-4 py-3">
                                  <span
                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                      student.status ===
                                      "Present"
                                        ? "bg-emerald-50 text-emerald-700"
                                        : student.status ===
                                          "Absent"
                                        ? "bg-red-50 text-red-700"
                                        : "bg-amber-50 text-amber-700"
                                    }`}
                                  >
                                    {
                                      student.status
                                    }
                                  </span>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TeacherAttendance;