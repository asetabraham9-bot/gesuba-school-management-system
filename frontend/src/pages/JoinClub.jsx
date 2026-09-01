import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/PublicNavbar';
import Footer from '../components/layout/PublicFooter';
import {
  ArrowLeft,
  Send,
  User,
  GraduationCap,
  MessageSquare,
  CheckCircle,
} from 'lucide-react';

const clubNames = {
  culture: 'Culture and Language',
  art: 'Art and Literature',
  environmental: 'Environmental and Safety Awareness',
  sports: 'Sports',
  technology: 'Technology and Innovation',
};

export default function JoinClub({ user, onLogout }) {
  const { clubKey } = useParams();

  const clubName = clubNames[clubKey];

  if (!clubName) {
    return (
      <>
        <Navbar user={user} onLogout={onLogout} />

        <main className="container page-section">
          <h1>Club Not Found</h1>

          <Link to="/clubs" className="btn btn-primary">
            <ArrowLeft size={18} />
            Back to Clubs
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />

      <main className="container page-section">
        <div className="join-club-page">

          <div className="join-club-header">
            <Link to="/clubs" className="back-link">
              <ArrowLeft size={18} />
              Back to Clubs
            </Link>

            <div className="join-club-icon">
              <Send size={28} />
            </div>

            <h1>Join {clubName}</h1>

            <p>
              Submit your request to become a member of
              this club. Your request will be reviewed by
              the responsible club instructor.
            </p>
          </div>

          <form className="join-club-form">

            <div className="form-section">
              <h2>
                <User size={20} />
                Student Information
              </h2>

              <div className="form-grid">

                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    value={user?.fullName || ''}
                    readOnly
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Student ID</label>

                  <input
                    type="text"
                    value={user?.username || ''}
                    readOnly
                    placeholder="Your student ID"
                  />
                </div>

              </div>
            </div>

            <div className="form-section">
              <h2>
                <GraduationCap size={20} />
                Academic Information
              </h2>

              <div className="form-grid">

                <div className="form-group">
                  <label>Grade</label>

                  <input
                    type="text"
                    placeholder="Your grade"
                  />
                </div>

                <div className="form-group">
                  <label>Section</label>

                  <input
                    type="text"
                    placeholder="Your section"
                  />
                </div>

              </div>
            </div>

            <div className="form-section">
              <h2>
                <MessageSquare size={20} />
                Membership Request
              </h2>

              <div className="form-group">
                <label>
                  Why do you want to join this club?
                </label>

                <textarea
                  rows="6"
                  placeholder="Tell the club instructor about your interest, experience, or what you hope to learn..."
                />
              </div>
            </div>

            <div className="request-notice">
              <CheckCircle size={20} />

              <p>
                Your request will be sent to the instructor
                responsible for this club for review.
              </p>
            </div>

            <div className="form-actions">
              <Link
                to="/clubs"
                className="btn btn-outline"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="btn btn-primary"
              >
                <Send size={18} />
                Submit Join Request
              </button>
            </div>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}