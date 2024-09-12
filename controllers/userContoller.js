import bcrypt from "bcrypt";
import generateAccessToken from "../utlis/userToken.js";
import { User } from "../Models/userModel.js";

const userSignup = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, password } = req.body;
    console.log(phoneNumber);

    const userExist = await User.findOne({ phoneNumber });
    if (userExist) {
      return res
        .status(400)
        .json({ msg: "user already exist with this number" });
    }

    const saltRounds = 10;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    console.log(hashPassword);

    const newUser = new User({
      phoneNumber,
      firstName,
      lastName,
      hashPassword,
    });

    // new user save
    const user = await newUser.save();

    // if failed
    if (!user) {
      return res.status(400).json({ msg: "user not created" });
    }

    const token = generateAccessToken(user);
    console.log(token);
    res.cookie("token", token);
    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};

// login

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

export { userSignup, userLogin };
