import mongoose from "mongoose";

const superadminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  hashPassword: {
    type: String,
    required: true,
    minlength: 3,
  },
  role: {
    type: String,
    enum: ["Super admin"],
  },
});
const SuperAdmin = mongoose.model("SuperAdmin", superadminSchema);

export default SuperAdmin;
