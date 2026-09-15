// Vérifie la configuration SMTP et envoie un mail de test.
// Usage : depuis back/ -> node scripts/check-mail.mjs
import "../src/helpers/envLoad.js";
import nodemailer from "nodemailer";

const pass = process.env.MAIL_PASSWORD?.replace(/\s/g, "");
const host = process.env.MAIL_HOST || "smtp.gmail.com";
const port = parseInt(process.env.MAIL_PORT, 10) || 465;

console.log(`Compte   : ${process.env.MAIL_USER}`);
console.log(`Serveur  : ${host}:${port}`);
console.log(`Password : ${pass?.length ?? 0} caractères (16 attendus)\n`);

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  requireTLS: port !== 465,
  auth: { user: process.env.MAIL_USER, pass },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

const start = Date.now();
try {
  await transporter.verify();
  console.log(`OK  Authentification réussie (${Date.now() - start} ms)`);

  const info = await transporter.sendMail({
    from: `"ThinkEat" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER,
    subject: "ThinkEat - test SMTP",
    text: "Si tu lis ceci, la configuration SMTP fonctionne.",
  });
  console.log(`OK  Mail de test envoyé à ${process.env.MAIL_USER} (${info.messageId})`);
} catch (err) {
  console.log(`KO  Échec en ${Date.now() - start} ms`);
  console.log(`    code    : ${err.code}`);
  console.log(`    message : ${err.message.split("\n")[0]}`);
  if (err.code === "EAUTH") {
    console.log("\n    -> Mot de passe d'application invalide ou révoqué.");
    console.log("       Régénère-le sur https://myaccount.google.com/apppasswords");
  }
  if (["ETIMEDOUT", "ESOCKET", "ECONNECTION"].includes(err.code)) {
    console.log("\n    -> Connexion SMTP sortante bloquée. Essaie MAIL_PORT=587.");
  }
}
process.exit(0);
