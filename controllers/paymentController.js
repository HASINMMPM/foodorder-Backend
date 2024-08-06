import razorpay from "razorpay";
import crypto from "crypto";

const createPayment = async (req, res) => {
  // initializing razorpay
  const razorpay = new Razorpay({
    key_id: req.body.keyId,
    key_secret: req.body.keySecret,
  });

  // setting up options for razorpay order.
  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: "any unique id for every order",
    payment_capture: 1,
  };
  try {
    const response = await razorpay.orders.create(options);
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    res.status(400).send("Not able to create order. Please try again!", err);
  }
};

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
