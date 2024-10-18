import bcrypt from "bcrypt";
import generateAdminToken from "../utlis/adminToken.js";
import Admin from "../Models/adminModel.js";
import { Restaurant } from "../Models/restorantModel.js";
import Food from "../Models/foodModel.js";
import Otp from "../Models/otpModel.js";

const adminsignup = async (req, res) => {
  console.log("try adminsignup");
  try {
    const { fullName, email, password, otp } = req.body;
    console.log(email);

    const adminexist = await Admin.findOne({ email: email });
    if (adminexist) {
      return res
        .status(400)
        .json({ msg: "Admin already exists with this email" });
    }
    const response = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    console.log("hashPassword", hashPassword);

    const newAdmin = new Admin({
      email,
      fullName,
      hashPassword,
      role: "Admin",
    });
    const newAdminCreation = await newAdmin.save();

    if (!newAdminCreation) {
      return res.status(400).json({ msg: "Admin not created" });
    }

    const token = generateAdminToken(newAdminCreation);
    console.log(token);
    res.cookie("token", token, { httpOnly: true }); 
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// login

const adminlog = async (req, res) => {
  console.log("try to admin login")
  try {
    console.log("try to admin login");
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(400).json({ msg: "admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.hashPassword);
    if (!isMatch) {
      return res.status(400).json({ msg: "invalid password" });
    }
    console.log(admin);

    const token = generateAdminToken(admin);
    console.log(token);
    res.cookie("token", token);
    res.json({ token });
    res.send("Admin Login success");
  } catch (error) {
    console.log(error);
  }
};

// get all admin

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.json(admins);
  } catch (error) {
    console.log(error);
  }
};
// delete admin

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.find({ _id: id });
    console.log(admin);
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }
    const deleteadmin = await Admin.findByIdAndDelete({ _id: id });
    if (!deleteadmin) {
      return res.status(404).json({ msg: "Failed to delete" });
    }
    const restaurant = await Restaurant.findOneAndDelete({ Owner: id });

    if (!restaurant) {
      return res
        .status(404)
        .json({ msg: "No restaurant found for this admin" });
    }
    const foods = await Food.deleteMany({ restaurant: restaurant });
    res.json({
      msg: "admin deleted successfully and his restaurent and foods",
    });
  } catch (error) {
    console.log(error);
  }
};
// get admin

const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found with this id" });
    }

    // Find restaurant by owner ID (matching with admin ID)
    const restaurant = await Restaurant.findOne({ Owner: id });

    if (!restaurant) {
      return res
        .status(404)
        .json({ msg: "No restaurant found for this admin" });
    }

    // Send both admin and restaurant details in the response
    res.json({ admin, restaurant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// delete all admin

const deleteAllAdmins = async (req, res) => {
  try {
    const deleteAll = await Admin.deleteMany({});
    if (!deleteAll) {
      return res.status(404).json({ msg: "Failed to delete all" });
    }
    res.json({ msg: "All admins deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export {
  adminsignup,
  adminlog,
  getAdmins,
  deleteAdmin,
  getAdmin,
  deleteAllAdmins,
};
