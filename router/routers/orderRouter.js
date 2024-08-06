import express from "express";
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  updateOrder,
} from "../../controllers/orderConroller.js";

const orderRouter = express.Router();

orderRouter.post("/addorder", addOrder);
orderRouter.get("/allorders", getAllOrders);
orderRouter.put("/editorder/:id", updateOrder);
orderRouter.delete("/deleteorder/:id", deleteOrder);

export { orderRouter };
