import bcrypt from "bcrypt";
import { User } from "../Models/userModel.js";
import "dotenv/config";
import generateAccessToken from "../utlis/userToken.js";
import twilio from "twilio";

const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
// console.log("Twilio Account SID:", process.env.TWILIO_ACCOUNT_SID);
// console.log("Twilio Auth Token:", process.env.TWILIO_AUTH_TOKEN);
// console.log("VERIFY_SERVICE_SID:", serviceSid);

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
// console.log("client", client);
const generateOtp = () => crypto.randomInt(100000, 999999);

// Step 1: User Signup - Send OTP
const userSignup = async (req, res) => {
  console.log("userSignup req.body", req.body);
  try {
    const { firstName, lastName, phoneNumber, password } = req.body;

    // Check if user already exists
    const userExist = await User.findOne({ phoneNumber });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Generate OTP and send it via Twilio
    // await client.verify.v2
    //   .services(serviceSid)
    //   .verifications.create({ to: `+${phoneNumber}`, channel: "sms" });
    // console.log("client service", serviceSid);
    await client.verify.v2
      .services(serviceSid)
      .verifications.create({ to: `+${phoneNumber}`, channel: "sms" })
      .then((verification) => console.log(verification.sid));

    res.json({ msg: "OTP sent to your phone number" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Otp send error", error });
  }
};

// Step 2: Verify OTP and complete signup
const verifyOtp = async (req, res) => {
  console.log("verify Otp running with", req.body);
  try {
    const { firstName, lastName, phoneNumber, password, otp } = req.body;

    // Verify OTP via Twilio
    const verificationCheck = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: `+${phoneNumber}`, code: otp });

    if (verificationCheck.status !== "approved") {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Create new user in the database
    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      hashPassword:hashPassword,
    });

    const user = await newUser.save();

    // Generate token
    const token = generateAccessToken(user);

    res.json({ msg: "Signup successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "verification error", error });
  }
};

const userLogin = async (req, res) => {
  console.log("Login attempt with data:", req.body);

  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      console.log("User not found");
      return res.status(400).send("User Not found");
    }

    const isMatch = await bcrypt.compare(password, user.hashPassword);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = generateAccessToken(user);
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side access to the cookie
      secure: false, // Set to true if you are using HTTPS
      sameSite: "Lax", // Prevents CSRF attacks
    });

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Server error");
  }
};

export { userSignup, verifyOtp, userLogin };
