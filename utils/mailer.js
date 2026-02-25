// const nodemailer = require("nodemailer");

// // Create transporter
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: true, // true for 465
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // app password (NO spaces)
//   },
// });

// // Optional: verify connection at startup
// // transporter.verify((error, success) => {
// //   if (error) {
// //     console.error("❌ SMTP Connection Error:", error);

// //   } else {
// //     console.log("✅ SMTP Server is ready to send emails");
// //   }
// // });

// // Send email function
// const sendEmail = async (to, subject, html) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Fairsay" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log("📧 Email sent successfully!");
//     console.log("Message ID:", info.messageId);

//     return info;
//   } catch (error) {
//     console.error("❌ Email sending failed:");
//     console.error("Error message:", error.message);
//     console.error("Full error:", error);

//     throw error; // rethrow so controller can catch it
//   }
// };

// module.exports = sendEmail;


const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const msg = {
      to,
      from: process.env.EMAIL_FROM, // must be verified in SendGrid
      subject,
      html,
    };

    const response = await sgMail.send(msg);

    console.log("📧 Email sent successfully!");
    return response;
  } catch (error) {
    console.error("❌ SendGrid Email Error:", error.response?.body || error);
    throw error;
  }
};

module.exports = sendEmail;