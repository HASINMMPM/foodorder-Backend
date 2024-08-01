import express from 'express'
import upload from '../../Middlewares/multer.js';
import { addRestaurant, deleteRestaurant, getAllRestaurants, getRestaurantById } from '../../controllers/restaurantController.js';
import { addVerifyRestaurant, getAllVerifyRestaurants } from '../../controllers/verifyRestorantController.js';
import authenticateAdmin from '../../Middlewares/adminAuth.js';

const restaurantRouter = express.Router()
const verifyRestaurantRouter =express.Router()

restaurantRouter.get("/allrestaurant",authenticateAdmin,getAllRestaurants)
restaurantRouter.get("/restuarant/:id", getRestaurantById)
restaurantRouter.post("/addrestuarant/:id",addRestaurant)
// restaurantRouter.put("/editfood/:id",updateFood)
restaurantRouter.delete("/deletrestauran/:id",deleteRestaurant)


verifyRestaurantRouter.post("/verifyrestaurant",upload.single('image'), addVerifyRestaurant)
verifyRestaurantRouter.get("/verifyrestaurant/all",getAllVerifyRestaurants)

export { restaurantRouter, verifyRestaurantRouter};


