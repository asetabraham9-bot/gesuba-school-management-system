import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

const PublicFooter = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* School */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900 text-white">
                <MapPin size={20} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-white">
                  Gesuba General Secondary School
                </h2>

                <p className="text-xs text-slate-500">
                  Digital School Portal
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              A connected digital platform supporting academic
              management, learning, examinations, and school
              communication.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition hover:border-slate-700 hover:bg-slate-900 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition hover:border-slate-700 hover:bg-slate-900 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link className="hover:text-white" to="/about">
                  About
                </Link>
              </li>

              <li>
                <Link className="hover:text-white" to="/clubs">
                  Clubs & Activities
                </Link>
              </li>

              <li>
                <Link className="hover:text-white" to="/laboratory">
                  Laboratory
                </Link>
              </li>

              <li>
                <Link className="hover:text-white" to="/study-materials">
                  Study Materials
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Resources
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link className="hover:text-white" to="/online-exam">
                  Online Exam
                </Link>
              </li>

              <li>
                <Link className="hover:text-white" to="/contact">
                  Contact
                </Link>
              </li>

              <li>
                <Link className="hover:text-white" to="/login">
                  Student & Staff Login
                </Link>
              </li>

              <li>
                <Link className="hover:text-white" to="/signup">
                  Parent Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Contact
            </h3>

            <div className="mt-4 space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-slate-500"
                />

                <span>
                  Gesuba, Wolaita Zone
                  <br />
                  Ethiopia
                </span>
              </div>

              <div className="flex gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-slate-500"
                />

                <span>info@ggss.edu.et</span>
              </div>

              <div className="flex gap-3">
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-slate-500"
                />

                <span>+251 964 063 992</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Gesuba General Secondary School. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a href="#" className="hover:text-slate-300">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-slate-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;