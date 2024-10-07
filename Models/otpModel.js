// // models/otpModel.js
// import mongoose from "mongoose";
// import mailSender from "../utlis/mailSender";

// const otpSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//   },
//   otp: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     expires: 60 * 50, // The document will be automatically deleted after 5 minutes of its creation time
//   },
// });
// // Define a function to send emails
// async function sendVerificationEmail(email, otp) {
//   try {
//     const mailResponse = await mailSender(
//       email,
//       "Verification Email",
//       `<h1>Please confirm your OTP</h1>
//        <p>Here is your OTP code: ${otp}</p>`
//     );
//     console.log("Email sent successfully: ", mailResponse);
//   } catch (error) {
//     console.log("Error occurred while sending email: ", error);
//     throw error;
//   }
// }
// otpSchema.pre("save", async function (next) {
//   console.log("New document saved to the database");
//   // Only send an email when a new document is created
//   if (this.isNew) {
//     await sendVerificationEmail(this.email, this.otp);
//   }
//   next();
// });
// export const Otp =  mongoose.model("OTP", otpSchema);

// models/otpModel.js
import mongoose from "mongoose";
import mailSender from "../utlis/mailSender.js";

const otpSchema = new mongoose.Schema({
  email: {
    // or phoneNumber if using phone-based OTP
    type: String,
    required: true,
    unique: true, // Ensure uniqueness if necessary
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "is invalid"], // Validate email format
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 5 minutes in seconds (corrected from 60*50)
  },
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code for signup as an admin: </p>   
         <h2 style="color: #399918; font-size: 32px; background-color: white;">${otp}</h2>
       <img src="https://designmodo.com/wp-content/uploads/2021/06/Subscription-Confirmation-Email-522x292.jpg" />
      ` 
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
  
}

otpSchema.pre("save", async function (next) {
  console.log("New OTP document saved to the database");
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
