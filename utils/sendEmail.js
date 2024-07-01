import { createTransport } from "nodemailer";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config(); // Load environment variables from .env file

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Create a transporter object
const transporter = createTransport({
  host: process.env.SMTP_HOST, // SMTP server for Titan Email
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your Titan Email address
    pass: process.env.SMTP_PASS, // Your Titan Email password
  },
});

// Function to read the HTML template and replace placeholders
export const getHtmlTemplate = (username) => {
  let html = fs.readFileSync(
    path.join(__dirname, "../emails/welcome.html"),
    "utf8"
  );
  html = html.replace("{{username}}", username);
  return html;
};
export const getloginEmail = (username) => {
  let html = fs.readFileSync(
    path.join(__dirname, "../emails/loginEmail.html"),
    "utf8"
  );
  html = html.replace("{{username}}", username);
  return html;
};
// Function to send an email
export const sendEmail = async (to, subject, text, html) => {
  try {
    // Email options
    log(`sending email to this user ${to}`)
    const mailOptions = {
      from: "Info@b2um.com", // Sender address
      to: to, // List of receivers
      subject: subject, // Subject line
      text: text, // Plain text body
      html: html, // HTML body
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

// Usage example
// sendEmail(
//   "recipient@example.com",
//   "Test Email from Node.js",
//   "This is a plain text body",
//   "<p>This is an HTML body</p>"
// );
