import express from "express";
import { deleteOrder, getAllOrders, orderSetup,  removeSingleItem,  updateStatus,  verifyPayment } from "../../controllers/paymentController.js";
import { deleteAll } from "../../controllers/orderConroller.js";


const orderRouter = express.Router();

orderRouter.post("/order/:id",orderSetup)
orderRouter.post("/verify/:id",verifyPayment)
orderRouter.delete("/d/order",deleteAll)
orderRouter.delete("/order/cancel/:id",deleteOrder)
orderRouter.get("/get/order",getAllOrders)
orderRouter.put ("/change/status/:id",updateStatus)
orderRouter.put("/remove-item/:id",removeSingleItem)


export { orderRouter };

