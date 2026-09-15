import './envLoad.js';
import nodemailer from "nodemailer";

const MAIL_PORT = parseInt(process.env.MAIL_PORT, 10) || 465;

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.gmail.com",
  port: MAIL_PORT,
  secure: MAIL_PORT === 465, // 465 = TLS implicite, 587 = STARTTLS
  requireTLS: MAIL_PORT !== 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD?.replace(/\s/g, ""), // les mots de passe d'application Google sont affichés avec des espaces
  },
  // Sans ces timeouts, une sortie SMTP bloquée laisse la requête HTTP en attente 2 minutes
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

export async function sendMailValidateAccount(mailTo, uuid) {
  return await transporter.sendMail({
    from: `"ThinkEat" <${process.env.MAIL_USER}>`,
    to: mailTo,
    subject: "Validate your account",
    text: `Please validate your email on: ${process.env.BASE_URL}/validate/account/${uuid}`
  });
}

export async function sendMailResetPassword(mailTo, uuid) {
  return await transporter.sendMail({
    from: `"ThinkEat" <${process.env.MAIL_USER}>`,
    to: mailTo,
    subject: "Reset your password",
    text: `Please change your password on: ${process.env.BASE_URL}/validate/password/${uuid}`
  });
}



