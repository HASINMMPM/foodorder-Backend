import Order from "../Models/orderModel.js";


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
