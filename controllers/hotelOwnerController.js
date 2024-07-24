import bcrypt from "bcrypt";
import generateAccessToken from "../utlis/userToken.js";

import HotelOwner from "../Models/hotelOwnerModel.js";

const hotelOwnerSignup = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, password } = req.body;
    console.log(phoneNumber);

    const hotelOwnerExist = await HotelOwner.findOne({ phoneNumber });
    if (hotelOwnerExist) {
      return res
        .status(400)
        .json({ msg: "user already exist with this number" });
    }

    const saltRounds = 10;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    console.log(hashPassword)

    const newOwner = new User({
      phoneNumber,
      firstName,
      lastName,
      hashPassword,
    });

    // new user save
    const newOwnerCreation = await newOwner.save();

    // if failed
    if (!newOwnerCreation) {
      return res.status(400).json({ msg: "user not created" });
    }

    const token = generateAccessToken(phoneNumber);
    console.log(token);
    res.cookie("token", token);
    res.send("you can add foods ");
  } catch (error) {
    console.log(error);
  }
};

// login

const hotelOwnerLogin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.hashPassword);
    if (!isMatch) {
      return res.status(400).json({ msg: "invalid password" });
    }

    const token = generateAccessToken(phoneNumber);
    res.cookie("token", token);
    res.send("hotel Owner Login success");
  } catch (error) {
    console.log(error);
  }
};



export { hotelOwnerSignup ,
  hotelOwnerLogin 
};
