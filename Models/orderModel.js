import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  // orderItems: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Food",
  //     required: true,
  //   },
  // ],
  // shippingAddress1: {
  //   type: String,
  //   required: true,
  // },
  // place: {
  //   type: String,
  // },
  // city: {
  //   type: String,
  //   required: true,
  // },
  // zip: {
  //   type: Number,
  //   required: true,
  // },
  // country: {
  //   type: String,
  //   required: true,
  // },
  // phone: {
  //   type: Number,
  //   required: true,
  // },
  // status: {
  //   type: String,
  //   required: true,
  //   enum:["Pending","On the way","Deliverd"],
  //   default: "Pending",
  // },
  // totalPrice: {
  //   type: Number,
  // },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  // reciever :{
  //   type: String,
  //   required: true,
  // },
  // dateOrdered: {
  //   type: Date,
  //   default: Date.now,
  // },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  payment:{
    type: Boolean,
   default:false
  }
});

// orderSchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });

// orderSchema.set("toJSON", {
//   virtuals: true,
// });

const Order = mongoose.model("Order", orderSchema);
export default Order;
