import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  phoneNumber: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  hashPassword: {
    type: String,
    required: true,
    minlength: 3,
  },
  food: { type: mongoose.Types.ObjectId, ref: "Food" },
});
export const User = mongoose.model("User", userSchema);
