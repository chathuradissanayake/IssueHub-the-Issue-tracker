import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (
  to: string,
  otp: string
) => {
  await resend.emails.send({
    from: `IssueHub <${process.env.EMAIL_FROM}>`,
    to,
    subject: "IssueHub OTP Verification",
    html: `
      <div style="font-family:sans-serif;">
        <h2>IssueHub Verification</h2>

        <p>Your OTP Code:</p>

        <h1 style="letter-spacing:5px;">
          ${otp}
        </h1>

        <p>This OTP expires in 2 minutes.</p>
      </div>
    `,
  });
};