import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
        padding: "2rem 1rem",
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "#ffffff",
          maxWidth: "480px",
          animation: "fadeIn 0.4s ease-out",
        }}
      >
        <div
          style={{
            fontSize: "7rem",
            fontWeight: 800,
            lineHeight: 1,
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1rem",
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "#f1f5f9",
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "#94a3b8",
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          The page you are looking for does not exist or may have been moved.
        </p>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#1e40af",
              color: "#ffffff",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.75rem",
              fontWeight: 600,
              fontSize: "0.9375rem",
              textDecoration: "none",
              transition: "background 0.15s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#1d4ed8")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#1e40af")}
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(255,255,255,0.1)",
              color: "#e2e8f0",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.75rem",
              fontWeight: 600,
              fontSize: "0.9375rem",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
              transition: "background 0.15s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.18)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default NotFound;
