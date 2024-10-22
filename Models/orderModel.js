import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  zip:{
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "On the way", "delivered", "cancelled"],
    default: "pending",
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  payment: {
    type: Boolean,
    default: false,
  },
  razorpay_order_id: {
    type: String,
  },
});


const Order = mongoose.model("Order", orderSchema);
export default Order;
