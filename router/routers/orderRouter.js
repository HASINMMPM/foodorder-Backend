import express from "express";
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  updateOrder,
  verifyPayment,
} from "../../controllers/orderConroller.js";
import authenticateUser from "../../Middlewares/userAuth.js";
import { authenticateSuperAdmin } from "../../Middlewares/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/addorder", authenticateUser, addOrder);
orderRouter.get("/allorders", authenticateSuperAdmin, getAllOrders);
orderRouter.put("/editorder/:id", authenticateSuperAdmin, updateOrder);
orderRouter.delete("/deleteorder/:id", authenticateUser, deleteOrder);
orderRouter.post("/verify/payment", authenticateSuperAdmin, verifyPayment);

export { orderRouter };
