import { useState } from "react";
import { verifyOtp, resendOtp } from "../../services/authService";

interface Props {
  email: string;
  onSuccess: () => void;
  onClose: () => void;
}

const RegisterOtpModal = ({ email, onSuccess, onClose }: Props) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    try {
      setLoading(true);

      await verifyOtp({ email, otp });

      alert("Email verified successfully!");
      onSuccess();
      onClose();

    } catch (error) {
      alert("Invalid or expired OTP");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email });
      alert("OTP resent successfully");
    } catch {
      alert("Failed to resend OTP");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-80 shadow-lg">
        <h2 className="text-lg font-bold mb-2">Verify OTP</h2>
        <p className="text-xs text-slate-500 mb-4">
          Enter the OTP sent to <b>{email}</b>
        </p>

        <input
          className="w-full border p-2 rounded mb-3 text-center tracking-widest"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-sky-500 text-white py-2 rounded mb-2"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          onClick={handleResend}
          className="text-sm text-sky-600 w-full"
        >
          Resend OTP
        </button>

        <button
          onClick={onClose}
          className="text-xs text-gray-400 mt-3 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RegisterOtpModal;