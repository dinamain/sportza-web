import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { registerUser } from "../api/auth";
import logo from "../assets/sportza-logo.png";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.displayName.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!form.email.trim()) {
      setError("Email address is required.");
      return;
    }
    if (!form.password) {
      setError("Password is required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        displayName: form.displayName,
        email: form.email,
        password: form.password,
        phone: form.phone ? `+91 ${form.phone}` : null,
      });
      navigate("/login", {
        state: { message: "Account created successfully! Please log in." },
      });
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

      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex w-full max-w-[440px] flex-col gap-5 rounded-[20px] border-[0.5px] border-white/[0.08] bg-[#111111] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.5),0_4px_20px_rgba(0,0,0,0.3)]"
      >
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
            <h2 className="text-2xl font-semibold text-white">Create account</h2>
          </div>
          <p className="pl-7 text-[13px] text-[#888888]">Join Sportza to manage your club</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#888888]">Full name</label>
          <div className="flex h-[52px] items-center gap-3 rounded-[11px] border border-white/[0.15] bg-[#1A1A1A] px-4">
            <User size={16} className="shrink-0 text-[#4A4A4A]" />
            <input
              name="displayName"
              type="text"
              placeholder="Rajan Kumar"
              value={form.displayName}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-sm text-white placeholder-[#4A4A4A] outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#888888]">Email address</label>
          <div className="flex h-[52px] items-center gap-3 rounded-[11px] border border-white/[0.15] bg-[#1A1A1A] px-4">
            <Mail size={16} className="shrink-0 text-[#4A4A4A]" />
            <input
              name="email"
              type="email"
              placeholder="rajan@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-sm text-white placeholder-[#4A4A4A] outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#888888]">Phone number</label>
          <div className="flex h-[52px] items-center gap-3 rounded-[11px] border border-white/[0.15] bg-[#1A1A1A] px-4">
            <Phone size={16} className="shrink-0 text-[#4A4A4A]" />
            <span className="shrink-0 text-sm text-[#888888]">+91</span>
            <div className="h-5 w-px shrink-0 bg-white/[0.15]" />
            <input
              name="phone"
              type="tel"
              placeholder="98765 43210"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-transparent text-sm text-white placeholder-[#4A4A4A] outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#888888]">Password</label>
          <div className="flex h-[52px] items-center gap-3 rounded-[11px] border border-white/[0.15] bg-[#1A1A1A] px-4">
            <Lock size={16} className="shrink-0 text-[#4A4A4A]" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-sm text-white placeholder-[#4A4A4A] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              className="shrink-0 text-[#4A4A4A] hover:text-[#888888]"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#888888]">Confirm password</label>
          <div className="flex h-[52px] items-center gap-3 rounded-[11px] border border-white/[0.15] bg-[#1A1A1A] px-4">
            <Lock size={16} className="shrink-0 text-[#4A4A4A]" />
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-sm text-white placeholder-[#4A4A4A] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              tabIndex={-1}
              className="shrink-0 text-[#4A4A4A] hover:text-[#888888]"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <label className="flex items-start gap-2 text-[13px] text-[#888888]">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/[0.15] bg-[#1A1A1A] accent-[#F16536]"
          />
          <span>
            I agree to the{" "}
            <Link to="/profile/terms" className="text-[#F16536] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/profile/terms" className="text-[#F16536] hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-[11px] bg-[#F16536] text-sm font-semibold text-white transition-colors hover:bg-[#e0572a] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        {error && (
          <div className="rounded border border-red-500/50 bg-red-900/40 p-3 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        <p className="text-center text-xs text-[#888888]">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-[#F16536] hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
