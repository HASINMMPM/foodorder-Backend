import bcrypt from "bcrypt";
import generateAdminToken from "../utlis/adminToken.js";
import SuperAdmin from "../Models/superAdmin.js";

const superAdminsignup = async (req, res) => {
  console.log("super signup");
  try {
    const { name, email, password, role} = req.body;
    console.log(email);

    const superAdminexist = await SuperAdmin.findOne({ email });
    if (superAdminexist) {
      return res.status(400).json({ msg: " already exist with this mail" });
    }

    const saltRounds = 10;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    console.log(hashPassword);

    const newAdmin = new SuperAdmin({
      email,
      name,
      hashPassword,
      role: "Super admin",
    });

    const newSuperAdminCreation = await newAdmin.save();

    if (!newSuperAdminCreation) {
      return res.status(400).json({ msg: "super admin not created" });
    }
    const admin =newSuperAdminCreation
    const token = generateAdminToken(admin);
    console.log(token);
    res.cookie("token", token);
    res.send("super Admin created and you can controll it ");
    
  } catch (error) {
    console.log(error);
  }
};

// login

const superAdminlog = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await SuperAdmin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: " super admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.hashPassword);
    if (!isMatch) {
      return res.status(400).json({ msg: "invalid password" });
    }

    const token = generateAdminToken(admin);
    res.cookie("token", token);
    res.json({token})
    res.send("super Admin logined you can controll it");
  } catch (error) {
    console.log(error);
  }
};

export { superAdminsignup, superAdminlog };
