import nodemailer from "nodemailer";

export interface SendEmail {
  email: string;
  url: string;
  token: string;
}

export async function sendLoginEmail({ email, url, token }: SendEmail) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: "'Jane Doe' <j.doe@example.com>",
    to: email,
    subject: "Login to your account",
    html: `Login by clicking here <a href="${url}/login#token=${token}">HERE</a>`,
  });

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
