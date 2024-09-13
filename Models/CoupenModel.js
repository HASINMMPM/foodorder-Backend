import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true }, // e.g., 10 for 10% discount
  expiresAt: { type: Date, required: true },
});

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
