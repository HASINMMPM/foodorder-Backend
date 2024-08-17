import bcrypt from "bcrypt";
import generateAdminToken from "../utlis/adminToken.js";
import Admin from "../Models/adminModel.js";

const adminsignup = async (req, res) => {
  console.log("try adminsignup");
  try {
    const { fullName, phoneNumber, password, role } = req.body;
    console.log(phoneNumber);

    const adminexist = await Admin.findOne({ phoneNumber: phoneNumber });
    if (adminexist) {
      return res
        .status(400)
        .json({ msg: "admin already exist with this number" });
    }

    const saltRounds = 10;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    console.log(hashPassword);

    const newAdmin = new Admin({
      phoneNumber,
      fullName,
      hashPassword,
      role: "Admin",
    });

    const newAdminCreation = await newAdmin.save();

    if (!newAdminCreation) {
      return res.status(400).json({ msg: "admin not created" });
    }
    const admin = newAdminCreation

    const token = generateAdminToken(admin);
    console.log(token);
    res.send(admin);
    res.cookie("token", token);
  } catch (error) {
    console.log(error);
  }
};

// login

const adminlog = async (req, res) => {
  try {
    console.log("try to admin login");
    const { phoneNumber, password } = req.body;

    const admin = await Admin.findOne({ phoneNumber: phoneNumber });
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
    res.json({ msg: "admin deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export { adminsignup, adminlog, getAdmins, deleteAdmin };
