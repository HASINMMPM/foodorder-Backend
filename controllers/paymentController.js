import razorpay from "razorpay";
import crypto from "crypto";
import razorpayInstance from "../config/razorPay";

const createPayment = async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    const options = {
      amount: amount * 100, // Amount in the smallest currency unit (e.g., paise for INR)
      currency,
      receipt,
      payment_capture: 1, // Auto capture
    };

    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
}

const paymentCapture = (req, res) => {
  const secret_key = process.env.CRYPTO_SEC;

  // do a validation

  const data = crypto.createHmac("sha256", secret_key);

  data.update(JSON.stringify(req.body));

  const digest = data.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");

    //We can send the response and store information in a database.

    res.json({
      status: "ok",
    });
  } else {
    res.status(400).send("Invalid signature");
  }
};
const paymentRefund = async (req, res) => {
  try {
    //Verify the payment Id first, then access the Razorpay API.

    const options = {
      payment_id: req.body.paymentId,

      amount: req.body.amount,
    };

    const razorpayResponse = await razorpay.refund(options);

    //We can send the response and store information in a database

    res.send("Successfully refunded");
  } catch (error) {
    console.log(error);

    res.status(400).send("unable to issue a refund");
  }
};

export { createPayment, paymentCapture, paymentRefund };
