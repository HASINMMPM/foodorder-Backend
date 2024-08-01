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
    const newUserCreation = await newUser.save();

    // if failed
    if (!newUserCreation) {
      return res.status(400).json({ msg: "user not created" });
    }

    const token = generateAccessToken(phoneNumber);
    console.log(token);
    res.cookie("token", token);
    res.send("welcome and enjoy");
  } catch (error) {
    console.log(error);
  }
};

// login

const userLogin = async (req, res) => {
  try {
    console.log("try to login");
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).send("User Not found");
    }

    const isMatch = await bcrypt.compare(password, user.hashPassword);
    if (!isMatch) {
      console.log("password matched");
      return res.status(400).json({ msg: "invalid password" });
    }

    const token = generateAccessToken(phoneNumber);
    res.cookie("token", token);
    res.send("UserLogin success");
  } catch (error) {
    console.log(error);
  }
};

export { userSignup, userLogin };
