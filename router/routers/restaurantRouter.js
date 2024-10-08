import express from "express";
import {
  addBestRestaurant,
  addRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getRestaurantById,
} from "../../controllers/restaurantController.js";
import {
  addVerifyRestaurant,
  deleteVerifyRestaurant,
  getAllVerifyRestaurants,
} from "../../controllers/verifyRestorantController.js";
import upload from "../../Middlewares/multer.js";
import authenticateUser from "../../Middlewares/userAuth.js";
import {
  adminsValidation,
  authenticateSuperAdmin,
} from "../../Middlewares/adminAuth.js";

const restaurantRouter = express.Router();
const verifyRestaurantRouter = express.Router();

restaurantRouter.get("/allrestaurant", getAllRestaurants);
restaurantRouter.get(
  "/restuarant/:id",
  // authenticateUser,
  getRestaurantById
);
restaurantRouter.post(
  "/addrestuarant/:id",
  // authenticateSuperAdmin,
  addRestaurant
);

restaurantRouter.put("/addbestrestaurent/:id", addBestRestaurant);
restaurantRouter.delete(
  "/deletrestauran/:id",

  deleteRestaurant
);

verifyRestaurantRouter.post(
  "/verifyrestaurant",
  upload.single("image"),
  // adminsValidation,
  addVerifyRestaurant
);
verifyRestaurantRouter.get(
  "/verifyrestaurant/all",
  // authenticateSuperAdmin,
  getAllVerifyRestaurants
);
verifyRestaurantRouter.delete(
  "/deletrestauran/:id",
  // authenticateSuperAdmin,
  deleteVerifyRestaurant
);

export { restaurantRouter, verifyRestaurantRouter };
