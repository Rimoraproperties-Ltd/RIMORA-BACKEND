const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

module.exports = async function sendMail({ to, subject, text, html }) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
  });
};
