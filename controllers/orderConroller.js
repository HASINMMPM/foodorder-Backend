import OrderItem from "../Models/orderItemsModel.js";
import Order from "../Models/orderModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import razorpayInstance from "../config/razorPay.js";

const addOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress1, place, city, zip, country, phone ,reciever} =
      req.body;

    // Check if order items exist
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    // Create OrderItems and get their IDs
    const orderItemsIds = await Promise.all(
      orderItems.map(async (item) => {
        let newOrderItem = new OrderItem({
          quantity: item.quantity,
          food: item.food,
        });

        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      })
    );

    // Calculate total price
    const totalPrices = await Promise.all(
      orderItemsIds.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          "food",
          "Price"
        );

        console.log("order item", orderItem);
        const itemPrice = orderItem.food.Price;
        console.log("item price", itemPrice);
        const totalPrice = itemPrice * orderItem.quantity;
        return totalPrice;
      })
    );
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    const token = req.cookies.token;
    let userID;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      console.log("order result", result);
      userID = result.id;
    });

    const options = {
      amount: totalPrice * 100, // Amount in paise
      currency: "INR",
      receipt: `${userID}_receipt_order_${Date.now()}`,
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Create the order
    const order = new Order({
      orderItems: orderItemsIds,
      shippingAddress1,
      place,
      city,
      zip,
      country,
      phone,
      reciever,
      totalPrice: totalPrice,
      user: userID,
      razorpayOrderId: razorpayOrder.id,
    });

    const newOrder = await order.save();

    if (!newOrder) {
      return res.status(400).json({ message: "Failed to create order" });
    }

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

// Verify
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest === razorpay_signature) {
      // Payment is verified, update the order status
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: 'Paid' },
        { new: true }
      );

      res.json({ message: 'Payment verified successfully', order });
    } else {
      res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

// get all orders

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name");

    if (orders.length == 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// update order

const updateOrder = async (req, res) => {
  try {
    const Id = req.params.id;
    const status = req.body;
    console.log(Id);
    const updatedOrder = await Order.findByIdAndUpdate(Id, status, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// delete order

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

export { addOrder, getAllOrders, updateOrder, deleteOrder,verifyPayment };
