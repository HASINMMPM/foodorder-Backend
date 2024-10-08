import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discount: {
    type: Number,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    // TTL index: MongoDB will automatically delete documents after expiration.
    index: { expires: 0 } // TTL index, document will be removed after 'expiresAt'
  }
});
const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
