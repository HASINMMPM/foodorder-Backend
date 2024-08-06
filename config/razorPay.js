import razorpay from 'razorpay'
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
       key_secret: process.env.Key_SECRET
    })