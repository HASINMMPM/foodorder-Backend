import mongoose from "mongoose";

const adminschema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    phoneNumber: {
      type: Number,
      required: true,
      minlength: 1,
      unique: true,
      // maxlength: 10,
    },
    hashPassword: {
      type: String,
      required: true,
      minlength: 3,
    },
    role: {
      type: String,
      enum: ["Admin"],
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  { timestamps: true }
);
const Admin = mongoose.model("Admin", adminschema);
export default Admin;


