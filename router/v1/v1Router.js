import express from "express";
import { userRouter } from "../routers/userRouter.js";
import { foodRouter } from "../routers/foodRouter.js";
import { adminRouter } from "../routers/adminRouter.js";
import { superAdminRouter } from "../routers/superAdminRouter.js";
import {
  restaurantRouter,
  verifyRestaurantRouter,
} from "../routers/restaurantRouter.js";
import { orderRouter } from "../routers/orderRouter.js";
import { categoryRouter } from "../routers/categoryRouter.js";

const v1Router = express.Router();

v1Router.use("/v1/user", userRouter);
v1Router.use("/v1/food", foodRouter);
v1Router.use("/v1/admin", adminRouter);
v1Router.use("/v1", superAdminRouter);
v1Router.use("/v1/restuarant", restaurantRouter);
v1Router.use("/v1/verify", verifyRestaurantRouter);
v1Router.use("/v1", orderRouter);
v1Router.use("/v1/category", categoryRouter);

export { v1Router };
