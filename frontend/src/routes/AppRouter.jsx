import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Clubs from "../pages/public/Clubs";
//import Laboratory from "../pages/public/Laboratory";
import Materials from "../pages/public/Materials";
import OnlineExam from "../pages/public/OnlineExam";
import Contact from "../pages/public/Contact";
import Login from "../pages/auth/Login";
import ParentSignup from "../pages/auth/ParentSignup";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/dashboard/DashboardLayout";

  {/*Student dashboard routes */}
import StudentDashboard from "../pages/dashboards/student/StudentDashboard";
import StudentAcademic from "../pages/dashboards/student/academic/StudentAcademic";
import MySubjects from "../pages/dashboards/student/academic/MySubjects";
import MyTeachers from "../pages/dashboards/student/academic/MyTeachers";
import StudentLessons from "../pages/dashboards/student/lms/StudentLessons";
import StudyMaterials from "../pages/dashboards/student/lms/StudyMaterials";
import StudentAssignments from "../pages/dashboards/student/lms/StudentAssignments";
import MySubmissions from "../pages/dashboards/student/lms/MySubmissions";
import Examinations from "../pages/dashboards/student/examinations/Examinations";
import ExaminationDetails from "../pages/dashboards/student/examinations/ExaminationDetails";
import TakeExamination from "../pages/dashboards/student/examinations/TakeExamination";
import ExaminationResult from "../pages/dashboards/student/examinations/ExaminationResult";
import StudentAttendance from "../pages/dashboards/student/attendance/StudentAttendance";
import Announcements from "../pages/dashboards/student/announcements/Announcements";
import Profile from "../pages/dashboards/student/account/Profile";
import Settings from "../pages/dashboards/student/account/Settings";

  {/*Student dashboard routes */}
import TeacherDashboard from "../pages/dashboards/teacher/TeacherDashboard";
import TeacherAcademic from "../pages/dashboards/teacher/academic/TeacherAcademic";
import AssignedSubjects from "../pages/dashboards/teacher/teaching/AssignedSubjects";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================================
            PUBLIC ROUTES
        ========================================= */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}/>
        <Route path="/clubs" element={<Clubs />}/>
        <Route path="/materials" element={<Materials />}/>
        <Route path="/online-exam" element={<OnlineExam />}/>
        <Route path="/contact" element={<Contact />}/>

        {/* =========================================
            AUTH ROUTES
        ========================================= */}

        <Route path="/login" element={<Login />}/>
        <Route path="/parent-signup" element={<ParentSignup />}/>

        {/* =========================================
            PROTECTED ROUTES
        ========================================= */}

        <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>

          {/* =======================================
              STUDENT DASHBOARD SHELL
          ======================================= */}

          <Route path="/student-dashboard" element={<DashboardLayout />}>

            <Route index element={<StudentDashboard />} />

            {/* Academic */}
            <Route path="academic" element={<StudentAcademic />} />
            <Route path="subjects" element={<MySubjects />} />
            <Route path="teachers" element={<MyTeachers />} />

            {/* Learning */}
            <Route path="lessons" element={<StudentLessons />} />
            <Route path="materials" element={<StudyMaterials />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="submissions" element={<MySubmissions />} />

            {/* Examinations */}
            <Route path="examinations" element={<Examinations />} />
            <Route path="examinations/:examId" element={<ExaminationDetails />}/>
            <Route path="examinations/:examId/take" element={<TakeExamination />}/>
            <Route path="examinations/:examId/result" element={<ExaminationResult />}/>

            {/* Attendance */}
            <Route path="attendance" element={<StudentAttendance />} />

            {/* Announcements */}
            <Route path="announcements" element={<Announcements />} />

            {/* Account */}
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

        </Route>

        <Route element={<ProtectedRoute allowedRoles={["TEACHER"]} />}>

          {/* =======================================
              TEACHER DASHBOARD SHELL
          ======================================= */}
        
          <Route path="/teacher-dashboard" element={<DashboardLayout />} >

             <Route index element={<TeacherDashboard/>}/>

            {/* Academic */}
            <Route path="academic" element={<TeacherAcademic />} />
            <Route path="subjects" element={<AssignedSubjects />} />

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;