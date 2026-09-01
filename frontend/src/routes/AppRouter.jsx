import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ── Public Pages ───────────────────────────────────────── */
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Clubs from "../pages/public/Clubs";
import Contact from "../pages/public/Contact";
import OnlineExam from "../pages/public/OnlineExam";
import StudyMaterials from "../pages/public/StudyMaterials";

/* ── Auth Pages ─────────────────────────────────────────── */
import Login from "../pages/auth/Login";
import ParentSignup from "../pages/auth/ParentSignup";

/* ── Dashboard Pages ────────────────────────────────────── */
import Dashboard from "../pages/dashboard/Dashboard";

/* ── Utility ─────────────────────────────────────────────── */
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public Routes ──────────────────────────────── */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/online-exam" element={<OnlineExam />} />
        <Route path="/study-materials" element={<StudyMaterials />} />

        {/* ── Auth Routes ────────────────────────────────── */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<ParentSignup />} />
        <Route path="/parent-signup" element={<ParentSignup />} />

        {/* ── Dashboard Routes ───────────────────────────── */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student-dashboard" element={<Dashboard />} />
        <Route path="/teacher-dashboard" element={<Dashboard />} />
        <Route path="/schooladmin-dashboard" element={<Dashboard />} />
        <Route path="/systemadmin-dashboard" element={<Dashboard />} />
        <Route path="/parent-dashboard" element={<Dashboard />} />

        {/* ── 404 Fallback ────────────────────────────────── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;