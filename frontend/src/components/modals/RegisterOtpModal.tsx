import { useEffect, useRef, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import {verifyOtp, resendOtp} from "../../services/authService";

type Props = {email: string; onClose: () => void; onSuccess: (token: string) => void;};

const RegisterOtpModal = ({email, onClose, onSuccess}: Props) => {
  const [otp, setOtp] = useState(["", "", "", "", "", "" ]);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timeLeft, setTimeLeft] =  useState(120);
  const [error, setError] = useState("");
  const inputRefs = useRef< Array<HTMLInputElement | null> >([]);

  // TIMER
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // AUTO FOCUS FIRST INPUT
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // FORMAT TIMER
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs .toString() .padStart(2, "0")}`;
  };

  // HANDLE OTP CHANGE
  const handleChange = ( value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // move next
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // HANDLE BACKSPACE
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if ( e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // HANDLE PASTE
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => { e.preventDefault();
  const pastedData = e.clipboardData .getData("text") .replace(/\D/g, "") .slice(0, 6);
    if (!pastedData) 
        return;
  
    const updatedOtp = ["", "", "", "", "", ""];
    pastedData .split("") .forEach((digit, index) => { updatedOtp[index] = digit; });
    setOtp(updatedOtp);

    const focusIndex = pastedData.length >= 6 ? 5 : pastedData.length;
    inputRefs.current[focusIndex]?.focus();
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      setError("");
      const otpCode = otp.join("");
      const { data } = await verifyOtp({ email,  otp: otpCode, });
      onSuccess(data.token);
    } catch (error: any) {
      setError(error.response?.data?.message ||  "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP
  const handleResendOtp = async () => {
    try {
      setResending(true);
      setError("");
      await resendOtp({email,});
      setTimeLeft(120);
      setOtp(["", "", "", "", "", "",]);
      inputRefs.current[0]?.focus();

    } catch (error: any) {
      setError(error.response?.data?.message ||  "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 animate-in fade-in zoom-in duration-200">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          ✕
        </button>

        {/* ICON */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-100 flex items-center justify-center mb-5">
          <ShieldCheck className="w-8 h-8 text-sky-600" />
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Verify Your Email
        </h2>

        <p className="text-center text-slate-500 text-sm mt-2">
          Enter the 6-digit code sent to
        </p>

        <p className="text-center font-semibold text-slate-700 mt-1 break-all">
          {email}
        </p>

        {/* OTP BOXES */}
        <div className="flex justify-center gap-3 mt-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  index
                )
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
              onPaste={handlePaste}
              className="w-12 h-14 border border-slate-200 rounded-xl text-center text-2xl font-bold outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
            />
          ))}
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-4">
            {error}
          </p>
        )}

        {/* VERIFY BUTTON */}
        <button
          onClick={handleVerifyOtp}
          disabled={
            loading ||
            otp.join("").length !== 6
          }
          className="w-full mt-8 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </button>

        {/* RESEND */}
        <div className="mt-5 text-center">
          {timeLeft > 0 ? (
            <p className="text-sm text-slate-500">
              Resend OTP in{" "}
              <span className="font-semibold text-slate-700">
                {formatTime(timeLeft)}
              </span>
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              disabled={resending}
              className="text-sky-600 hover:text-sky-700 font-semibold text-sm"
            >
              {resending
                ? "Resending..."
                : "Resend OTP"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterOtpModal;