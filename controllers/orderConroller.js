import OrderItem from "../Models/orderItemsModel.js";
import Order from "../Models/orderModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const addOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress1, place, city, zip, country, phone } =
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

    // Create the order
    const order = new Order({
      orderItems: orderItemsIds,
      shippingAddress1,
      place,
      city,
      zip,
      country,
      phone,
      totalPrice: totalPrice,
      user: userID,
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

export { addOrder, getAllOrders, updateOrder, deleteOrder };
