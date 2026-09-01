import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  UserPlus,
  UsersRound,
} from 'lucide-react';
import '../auth/Auth.css';

const API_URL = import.meta.env.VITE_API_URL || '';

const INITIAL_FORM = {
  fullName: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
};

export default function ParentSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const validateForm = () => {
    const newErrors = {};

    const fullName = formData.fullName.trim();
    const username = formData.username.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!fullName) {
      newErrors.fullName = 'Full name is required.';
    } else if (fullName.length < 3) {
      newErrors.fullName =
        'Full name must contain at least 3 characters.';
    }

    if (!username) {
      newErrors.username = 'Username is required.';
    } else if (username.length < 4) {
      newErrors.username =
        'Please enter a valid parent username.';
    }

    if (!email) {
      newErrors.email = 'Email address is required.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password =
        'Password must contain at least 8 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        'Please confirm your password.';
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        'Passwords do not match.';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted =
        'You must accept the terms and conditions.';
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

    setSuccess('');
    setServerError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      /*
       * Public parent registration endpoint.
       *
       * IMPORTANT:
       * The role is NOT taken from the form.
       *
       * The backend must create this account as:
       *
       * Parent
       *
       * This prevents a public user from registering as:
       * Student / Teacher / SchoolAdmin / SystemAdmin.
       */

      const payload = {
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
      };

      /*
       * Production backend contract:
       *
       * POST /auth/parent-register
       */

      const response = await fetch(
        `${API_URL}/auth/parent-register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            'Parent registration failed. Please try again.'
        );
      }

      setSuccess(
        data.message ||
          'Parent account created successfully. You can now sign in.'
      );

      setFormData(INITIAL_FORM);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Parent registration error:', error);

      setServerError(
        error.message ||
          'Unable to create your account. Please try again.'
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
            <UsersRound size={28} />
          </div>

          <h1>Parent Registration</h1>

          <p>
            Create a parent account to stay connected with your
            child's education and school activities.
          </p>
        </div>

        {serverError && (
          <div className="alert alert-error" role="alert">
            {serverError}
          </div>
        )}

        {success && (
          <div
            className="alert alert-success"
            role="status"
          >
            <CheckCircle2 size={18} />
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="auth-form"
          noValidate
        >
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>

            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`form-control ${
                errors.fullName ? 'input-error' : ''
              }`}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />

            {errors.fullName && (
              <span className="field-error">
                {errors.fullName}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>

            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`form-control ${
                errors.username ? 'input-error' : ''
              }`}
              placeholder="Choose your parent username"
              autoComplete="username"
              required
            />

            {errors.username && (
              <span className="field-error">
                {errors.username}
              </span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${
                  errors.email ? 'input-error' : ''
                }`}
                placeholder="parent@example.com"
                autoComplete="email"
                required
              />

              {errors.email && (
                <span className="field-error">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-control ${
                  errors.phone ? 'input-error' : ''
                }`}
                placeholder="+251..."
                autoComplete="tel"
                required
              />

              {errors.phone && (
                <span className="field-error">
                  {errors.phone}
                </span>
              )}
            </div>
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
                className={`form-control password-input ${
                  errors.password ? 'input-error' : ''
                }`}
                placeholder="Create a strong password"
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
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

          <div className="form-group">
            <label
              htmlFor="confirmPassword"
              className="form-label"
            >
              Confirm Password
            </label>

            <div className="input-wrapper">
              <LockKeyhole size={18} className="input-icon" />

              <input
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-control password-input ${
                  errors.confirmPassword
                    ? 'input-error'
                    : ''
                }`}
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    (previous) => !previous
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <span className="field-error">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />

            <label htmlFor="termsAccepted">
              I accept the school's terms and conditions.
            </label>
          </div>

          {errors.termsAccepted && (
            <span className="field-error">
              {errors.termsAccepted}
            </span>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? (
              'Creating account...'
            ) : (
              <>
                <UserPlus size={18} />
                Create Parent Account
              </>
            )}
          </button>
        </form>

        <div className="auth-security-note">
          <LockKeyhole size={17} />

          <p>
            Parent registration creates only a Parent account.
            Other school roles are created and managed by
            authorized school administrators.
          </p>
        </div>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login">Sign In</Link>
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