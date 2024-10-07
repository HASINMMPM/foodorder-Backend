// // utils/mailSender.js
// import nodemailer from "nodemailer"
// import 'dotenv/config'

// const mailSender = async (email, title, body) => {
//   try {
//     // Create a Transporter to send emails
//     let transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       }
//     });
//     // Send emails to users
//     let info = await transporter.sendMail({
//       from: 'www.sandeepdev.me - Sandeep Singh',
//       to: email,
//       subject: title,
//       html: body,
//     });
//     console.log("Email info: ", info);
//     return info;
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// export default mailSender

// utils/mailSender.js
import nodemailer from "nodemailer";
import 'dotenv/config';

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT, // 465 for SSL, 587 for TLS
      secure: process.env.MAIL_SECURE === 'true', // true for 465, false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // Use App Password here
      },
    });

    // Verify the connection configuration
    await transporter.verify();
    console.log("SMTP connection successful");

    // Send emails to users
    let info = await transporter.sendMail({
      from: `"Hungey Hub" <${process.env.MAIL_USER}>`, 
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully: ", info.response);
    return info;
  } catch (error) {
    console.log("Error sending email:", error.message);
    throw error; // Rethrow the error after logging it
  }
};

export default mailSender;
