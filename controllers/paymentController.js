import * as crypto from "crypto";
import razorpayInstance from "../config/razorPay.js";
import Order from "../Models/orderModel.js";
import { User } from "../Models/userModel.js"; // fixed the import
import "dotenv/config";

// Order setup and Razorpay order creation

const orderSetup = async (req, res) => {
  const id = req.params.id;
  try {
    // Create a new order with userId, items, amount, address, and payment set to false
    const newOrder = new Order({
      userId: id,
      name: req.body.name,
      items: req.body.orderItems,
      amount: req.body.totalAmount,
      address: req.body.address,
      city: req.body.city,
      district: req.body.district,
      zip: req.body.zip,
      payment: false, // Initially set payment to false
    });

    // Save the new order to the database
    const savedOrder = await newOrder.save();

    // Calculate the total amount to pay
    const totalAmount = req.body.totalAmount * 100; // Amount in paise
    const options = {
      amount: totalAmount,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"), // Generate random receipt ID
    };

    // Create a Razorpay order
    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
      }

      // Return the Razorpay order and saved order ID
      return res.status(200).json({ order, id: savedOrder._id });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// Payment verification function

const verifyPayment = async (req, res) => {
  const id = req.params.id;
  try {
    // Extract razorpay data from the request body
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_id,
    } = req.body;

    // Check if all required fields are present
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing payment details" });
    }

    const secret = process.env.Key_SECRET;

    // Generate HMAC with the received order_id and payment_id
    const generated_signature = crypto
      .createHmac("SHA256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    // Compare generated signature with the received signature
    if (generated_signature === razorpay_signature) {
      console.log("Payment verification successful");

      // Update the user's cart to clear items
      await User.findByIdAndUpdate(id, { cartData: {} });

      // Update the order's payment status to true
      const updatedOrder = await Order.findByIdAndUpdate(
        order_id,
        { payment: true },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      return res.status(200).json({ message: "Payment successful" });
    } else {
      return res.status(403).json({
        message: "Payment verification failed. Signatures don't match.",
      });
    }
  } catch (error) {
    console.error("Error during payment verification:", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params; // Order ID
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: error.message });
  }
};
// All order
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ dateCreated: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update status
const updateStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    console.log("id is", id);
    const findOrder = await Order.findById(id);
    if (!findOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update the status of the order
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(500).json({ error: "Failed to update status" });
    }

    return res
      .status(200)
      .json({ message: "Status updated successfully", order: updatedOrder });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred" });
  }
};

export { orderSetup, verifyPayment, deleteOrder, getAllOrders, updateStatus };
