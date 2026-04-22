// src/components/LoginForm.tsx
import { useState } from "react";

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

const LoginForm = ({ onLogin, loading }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    onLogin(email, password);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back</h2>
      <p className="text-sm text-gray-500 mb-6">
        Login to continue to IssueHub
      </p>

      <input
        className="w-full mb-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full mb-5 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition shadow-md disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default LoginForm;