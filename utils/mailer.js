const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",          // or your email provider
  port: 465,
  secure: true,                     // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,   // your email
    pass: process.env.EMAIL_PASS    // app password if using Gmail
  }
});

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"Veriflux Chain" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
};

module.exports = sendEmail;
