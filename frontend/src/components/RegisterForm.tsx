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

  const handleSubmit = () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    onRegister(email, password);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Create account</h2>
      <p className="text-sm text-gray-500 mb-6">
        Join IssueHub and start tracking issues
      </p>

      <input
        className="w-full mb-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full mb-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        className="w-full mb-5 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-cyan-600 text-white p-3 rounded-xl hover:bg-cyan-700 transition shadow-md disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default RegisterForm;