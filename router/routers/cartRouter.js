import express from "express";
import authenticateUser from "../../Middlewares/userAuth.js";
import {
  additemToCart,
  getCartItems,
  removeFromCart,
} from "../../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add/:id", authenticateUser, additemToCart);
cartRouter.delete("/remove/:id", authenticateUser, removeFromCart);
cartRouter.get("/getall/:id", authenticateUser, getCartItems);

export { cartRouter };
