// // import OrderItem from "../Models/orderItemsModel.js";
import Order from "../Models/orderModel.js";
// import jwt from "jsonwebtoken";
// import "dotenv/config";
// import razorpayInstance from "../config/razorPay.js";
// import {User} from "../Models/userModel.js"



// // get all orders

// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate("user", "name");

//     if (orders.length == 0) {
//       return res.status(404).json({ message: "No orders found" });
//     }
//     res.json(orders);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "An error occurred", error: error.message });
//   }
// };

// // update order

// const updateOrder = async (req, res) => {
//   try {
//     const Id = req.params.id;
//     const status = req.body;
//     console.log(Id);
//     const updatedOrder = await Order.findByIdAndUpdate(Id, status, {
//       new: true,
//     });

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.json(updatedOrder);
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "An error occurred", error: error.message });
//   }
// };

// // delete order

// const deleteOrder = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const deletedOrder = await Order.findByIdAndDelete(id);

//     if (!deletedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.json({ message: "Order deleted successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "An error occurred", error: error.message });
//   }
// };



// // delete all 

const deleteAll =async (req,res)=>{
  try {
    await Order.deleteMany({});
    res.json({ message: "All orders deleted successfully" });
  } catch (error) {
    res
     .status(500)
     .json({ message: "An error occurred", error: error.message });
  }
}



export { 
// addOrder, getAllOrders, updateOrder, deleteOrder,verifyPayment,
  deleteAll  // added function to delete all orders
 };
