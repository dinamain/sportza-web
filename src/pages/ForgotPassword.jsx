import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Mail, CheckCircle2 } from "lucide-react";
import { requestPasswordReset } from "../api/auth";
import logo from "../assets/sportza-logo.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await requestPasswordReset({ email });
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-10 overflow-hidden bg-[#0A0A0A] p-4">
      <div
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(241,101,54,0.18), transparent 70%)" }}
      />
      <div className="pointer-events-none absolute -bottom-20 -left-10 select-none whitespace-nowrap text-[220px] font-extrabold leading-none text-white/[0.04]">
        sportza
      </div>

      <img src={logo} alt="Sportza" className="relative z-10 h-auto w-[200px]" />

      <div className="relative z-10 flex w-full max-w-[440px] flex-col gap-6 rounded-[20px] border-[0.5px] border-white/[0.08] bg-[#111111] p-10 shadow-[0_24px_80px_rgba(0,0,0,0.5),0_4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-[#888888] hover:text-white"
              aria-label="Go back"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-2xl font-semibold text-white">Forgot password?</h2>
          </div>
          <p className="pl-7 text-[13px] text-[#888888]">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {submitted ? (
          <>
            <div className="flex flex-col items-center gap-3 rounded-[11px] border border-white/[0.15] bg-[#1A1A1A] px-4 py-8 text-center">
              <CheckCircle2 size={32} className="text-[#F16536]" />
              <p className="text-sm text-white">
                If an account exists for <span className="font-medium">{email}</span>, we've sent
                a password reset link to it.
              </p>
            </div>

            <Link
              to="/login"
              className="h-12 w-full rounded-[11px] bg-[#F16536] text-center text-sm font-semibold leading-[48px] text-white transition-colors hover:bg-[#e0572a]"
            >
              Back to login
            </Link>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-[#888888]">Email address</label>
              <div className="flex h-[52px] items-center gap-3 rounded-[11px] border border-white/[0.15] bg-[#1A1A1A] px-4">
                <Mail size={16} className="shrink-0 text-[#4A4A4A]" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent text-sm text-white placeholder-[#4A4A4A] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-[11px] bg-[#F16536] text-sm font-semibold text-white transition-colors hover:bg-[#e0572a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>

            {error && (
              <div className="rounded border border-red-500/50 bg-red-900/40 p-3 text-center text-sm text-red-400">
                {error}
              </div>
            )}

            <p className="text-center text-xs text-[#888888]">
              Remembered your password?{" "}
              <Link to="/login" className="font-medium text-[#F16536] hover:underline">
                Log in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
