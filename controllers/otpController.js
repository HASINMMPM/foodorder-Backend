// controllers/otpController.js
import otpGenerator from "otp-generator";

import Otp from "../Models/otpModel.js";
import Admin from "../Models/adminModel.js";


const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    const checkUserPresent = await Admin.findOne({ email });
    
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await Otp.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await Otp.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await Otp.create(otpPayload);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      email:email,
    });
  } catch (error) {
    console.log("Failed send OTP",error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export { sendOTP };
