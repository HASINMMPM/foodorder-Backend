import express from 'express'
import upload from '../../Middlewares/multer.js';
import { addRestaurant, getAllRestaurants } from '../../controllers/restaurantController.js';

const restaurantRouter = express.Router()

restaurantRouter.get("/allrestaurant",getAllRestaurants)
// restaurantRouter.get("/food/:id", getFoodById)
restaurantRouter.post("/addrestuarant", upload.single('image'),addRestaurant)
// restaurantRouter.put("/editfood/:id",updateFood)
// restaurantRouter.delete("/deletfood/:id",deleteFood)



export  {restaurantRouter};