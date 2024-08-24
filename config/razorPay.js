import Razorpay from "razorpay";
import "dotenv/config";

const razorpayInstance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.Key_SECRET,
});
export default razorpayInstance;
