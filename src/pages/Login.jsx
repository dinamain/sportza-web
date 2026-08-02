import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { loginUser } from "../api/auth";
import logo from "../assets/sportza-logo.png";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      if (data.userId) {
        localStorage.setItem("userId", data.userId);
      }
      navigate("/profile");
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
        className="relative z-10 flex w-full max-w-[440px] flex-col gap-6 rounded-[20px] border-[0.5px] border-white/[0.08] bg-[#111111] p-10 shadow-[0_24px_80px_rgba(0,0,0,0.5),0_4px_20px_rgba(0,0,0,0.3)]"
      >
        <div className="flex flex-col gap-1.5">
          <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
          <p className="text-[13px] text-[#888888]">Sign in to your account</p>
        </div>

        {successMessage && (
          <div className="rounded border border-green-500/50 bg-green-900/40 p-3 text-center text-sm text-green-400">
            {successMessage}
          </div>
        )}

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

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#888888]">Password</label>
          <div className="flex h-[52px] items-center gap-3 rounded-[11px] border border-white/[0.15] bg-[#1A1A1A] px-4">
            <Lock size={16} className="shrink-0 text-[#4A4A4A]" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <div className="text-right">
          <button type="button" className="text-xs font-medium text-[#F16536] hover:underline">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-[11px] bg-[#F16536] text-sm font-semibold text-white transition-colors hover:bg-[#e0572a] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {error && (
          <div className="rounded border border-red-500/50 bg-red-900/40 p-3 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/[0.08]" />
          <span className="text-xs text-[#4A4A4A]">or</span>
          <div className="h-px flex-1 bg-white/[0.08]" />
        </div>

        <p className="text-center text-xs text-[#888888]">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-[#F16536] hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
