import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  LogIn,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import './Auth.css';

/*
 * Backend integration point.
 *
 * Later, replace this with our production backend API configuration.
 * Example:
 * const API_URL = import.meta.env.VITE_API_URL;
 */
const API_URL = import.meta.env.VITE_API_URL || '';

const ROLE_DASHBOARDS = {
  Student: '/student-dashboard',
  Teacher: '/teacher-dashboard',
  SchoolAdmin: '/schooladmin-dashboard',
  SystemAdmin: '/systemadmin-dashboard',
  Parent: '/parent-dashboard',
};

const getDashboardPath = (role) => {
  return ROLE_DASHBOARDS[role] || '/';
};

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    const username = formData.username.trim();
    const password = formData.password;

    if (!username) {
      newErrors.username = 'Username is required.';
    } else if (username.length < 4) {
      newErrors.username = 'Please enter a valid school username.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must contain at least 8 characters.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: '',
      }));
    }

    if (serverError) {
      setServerError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setServerError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      /*
       * Production backend contract:
       *
       * POST /auth/login
       *
       * Request:
       * {
       *   username,
       *   password
       * }
       *
       * Response:
       * {
       *   success: true,
       *   token: "...",
       *   user: {
       *     userId,
       *     username,
       *     fullName,
       *     role
       *   }
       * }
       */

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Invalid username or password.'
        );
      }

      /*
       * JWT is returned by the backend.
       *
       * We keep token storage here temporarily.
       * Later this can be moved into our centralized auth service/context.
       */
      if (data.token) {
        const storage = formData.rememberMe
          ? localStorage
          : sessionStorage;

        storage.setItem('ggss_token', data.token);
      }

      if (!data.user?.role) {
        throw new Error('Authentication succeeded, but user role is missing.');
      }

      /*
       * onLogin should update the global authenticated-user state.
       */
      onLogin?.(data.user);

      const dashboardPath = getDashboardPath(data.user.role);

      navigate(dashboardPath, { replace: true });
    } catch (error) {
      console.error('Login error:', error);

      setServerError(
        error.message || 'Unable to sign in. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <img
            src="/logo.jpeg"
            alt="Gesuba General Secondary School"
            className="logo"
          />

          <div className="auth-icon">
            <ShieldCheck size={28} />
          </div>

          <h1>Welcome Back</h1>

          <p>
            Sign in using the username and password provided by
            Gesuba General Secondary School.
          </p>
        </div>

        {serverError && (
          <div className="alert alert-error" role="alert">
            {serverError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="auth-form"
          noValidate
        >
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              School Username
            </label>

            <div className="input-wrapper">
              <UserRound size={18} className="input-icon" />

              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`form-control ${errors.username ? 'input-error' : ''
                  }`}
                placeholder="e.g. GGSS.STU0001"
                autoComplete="username"
                required
              />
            </div>

            {errors.username && (
              <span className="field-error">
                {errors.username}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <div className="input-wrapper">
              <LockKeyhole size={18} className="input-icon" />

              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-control password-input ${errors.password ? 'input-error' : ''
                  }`}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.password && (
              <span className="field-error">
                {errors.password}
              </span>
            )}
          </div>

          <div className="form-options">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />

              <label htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="forgot-link"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? (
              'Signing in...'
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="auth-security-note">
          <LockKeyhole size={17} />

          <p>
            Your account is protected by secure authentication.
            Access is limited according to your school role.
          </p>
        </div>

        <div className="auth-footer">
          <p>
            Are you a parent without an account?{' '}
            <Link to="/parent-signup">
              Register as a Parent
            </Link>
          </p>

          <Link to="/" className="back-link">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}