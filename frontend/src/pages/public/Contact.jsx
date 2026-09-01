import { useState } from 'react';
import {
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';

import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const SCHOOL_LOCATION =
  'https://maps.app.goo.gl/r8an5RWZMciUSsVY8';

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: '',
      }));
    }

    if (submitted) {
      setSubmitted(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name) {
      newErrors.name = 'Full name is required.';
    } else if (name.length < 3) {
      newErrors.name = 'Please enter your full name.';
    }

    if (!email) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (phone && !/^[0-9+\-\s()]{7,20}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!subject) {
      newErrors.subject = 'Subject is required.';
    }

    if (!message) {
      newErrors.message = 'Message is required.';
    } else if (message.length < 10) {
      newErrors.message = 'Message must contain at least 10 characters.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitted(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      /*
       * Backend integration point.
       *
       * Later:
       * POST /contact/messages
       */

      const response = await fetch('/api/contact/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Unable to send your message.'
        );
      }

      setSubmitted(true);
      setFormData(INITIAL_FORM);
    } catch (error) {
      console.error('Contact form error:', error);

      setErrors({
        form:
          error.message ||
          'Unable to send your message. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';
  const inputError = 'border-red-400 focus:border-red-400 focus:ring-red-400/20';

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* ── Page Header ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(30,58,95,0.7),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
            Get in Touch
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300">
            Get in touch with Gesuba General Secondary School
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* ── Contact Information ─────────────────────── */}
          <aside className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900">
              Contact Information
            </h2>

            <div className="mt-6 space-y-4">
              {[
                {
                  icon: MapPin,
                  title: 'Address',
                  content: (
                    <>
                      Gesuba, Wolaita Zone
                      <br />
                      Southern Ethiopia, Ethiopia
                      <br />
                      <a
                        href={SCHOOL_LOCATION}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:underline"
                      >
                        <MapPin size={13} />
                        View on Google Maps
                      </a>
                    </>
                  ),
                },
                {
                  icon: Phone,
                  title: 'Phone',
                  content: (
                    <>
                      Main Office: +251 964 063 992
                      <br />
                      Principal: +251 955 305 553
                    </>
                  ),
                },
                {
                  icon: Mail,
                  title: 'Email',
                  content: (
                    <>
                      info@ggss.edu.et
                      <br />
                      admin@ggss.edu.et
                    </>
                  ),
                },
                {
                  icon: Clock3,
                  title: 'Working Hours',
                  content: (
                    <>
                      Monday – Friday: 2:00 AM – 11:00 AM (LT)
                      <br />
                      Saturday: 3:00 AM – 6:00 AM (LT)
                      <br />
                      Sunday: Closed
                    </>
                  ),
                },
              ].map(({ icon: Icon, title, content }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Contacts */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-blue-900" />
                <h3 className="font-semibold text-slate-900">
                  Additional Contacts
                </h3>
              </div>

              <div className="mt-4 space-y-3 text-sm text-slate-600">
                {[
                  ["Principal's Office", 'principal@ggss.edu.et'],
                  ["Registrar's Office", 'registrar@ggss.edu.et'],
                  ['ICT Support', 'ict@ggss.edu.et'],
                ].map(([label, email]) => (
                  <div key={label} className="flex justify-between gap-2">
                    <span className="font-medium text-slate-700">{label}:</span>
                    <span className="text-slate-500">{email}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Contact Form ─────────────────────────────── */}
          <section className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-slate-500">
                    Have a question or need assistance? We'll respond promptly.
                  </p>
                </div>
              </div>

              {/* Success */}
              {submitted && (
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                  <Send size={16} />
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {/* Error */}
              {errors.form && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errors.form}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-4"
                noValidate
              >
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.name ? inputError : ''}`}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email + Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.email ? inputError : ''}`}
                      placeholder="Enter your email"
                      autoComplete="email"
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Phone Number{' '}
                      <span className="text-slate-400">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.phone ? inputError : ''}`}
                      placeholder="+251..."
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.subject ? inputError : ''}`}
                    placeholder="What would you like to ask?"
                    required
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputBase} resize-none ${errors.message ? inputError : ''}`}
                    rows={6}
                    placeholder="Write your message here..."
                    required
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={17} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>
        </div>

        {/* ── Location ─────────────────────────────────── */}
        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
              <MapPin size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Our Location</h2>
              <p className="text-sm text-slate-500">
                Find Gesuba General Secondary School on Google Maps.
              </p>
            </div>
          </div>

          <a
            href={SCHOOL_LOCATION}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center transition hover:border-blue-400 hover:bg-blue-50"
          >
            <MapPin size={40} className="text-slate-400" />
            <div>
              <p className="font-semibold text-slate-900">
                Gesuba, Wolaita Zone, Southern Ethiopia
              </p>
              <p className="mt-1 text-sm text-blue-700 underline">
                Open location in Google Maps
              </p>
            </div>
          </a>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}