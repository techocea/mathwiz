import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export default async function sendMail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject,
    html,
  });
}
