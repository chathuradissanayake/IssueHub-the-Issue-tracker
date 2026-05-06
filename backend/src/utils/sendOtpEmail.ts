import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const sendOtpEmail = async (to: string, otp: string) => {
  const command = new SendEmailCommand({
    Source: process.env.SES_FROM_EMAIL!,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: "IssueHub OTP Verification",
      },
      Body: {
        Html: {
          Data: `
            <div style="font-family:Arial;">
              <h2>IssueHub Verification</h2>
              <p>Your OTP code is:</p>
              <h1 style="letter-spacing:5px;">${otp}</h1>
              <p>This code expires in 2 minutes.</p>
            </div>
          `,
        },
      },
    },
  });

  await ses.send(command);
};