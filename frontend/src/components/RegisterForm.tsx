// src/components/RegisterForm.tsx
import { useState } from "react";

interface RegisterFormProps {
  onRegister: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

const RegisterForm = ({ onRegister, loading }: RegisterFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include a letter, a number, and a symbol."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    onRegister(email, password);
  };

  const inputClass =
    "w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 focus:bg-white transition";

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-0.5">Create account</h2>
      <p className="text-xs text-slate-400 mb-5">
        Join IssueHub and start tracking issues
      </p>

      {/* Email */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          Email
        </label>
        <div className="relative">
          <input
            className={`${inputClass}`}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Password */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className={`${inputClass}`}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className={`${inputClass}`}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full h-10 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition shadow-sm shadow-sky-200 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </div>
  );
};

export default RegisterForm;