import express from 'express'
import { addFood, deleteFood, getAllFood, getFoodById, updateFood } from '../../controllers/foodController.js';
import upload from '../../Middlewares/multer.js';

const foodRouter = express.Router()

foodRouter.get("/allfood",getAllFood)
foodRouter.get("/food/:id", getFoodById)
foodRouter.post("/addfood", upload.single('image'),addFood)
foodRouter.put("/editfood/:id",updateFood)
foodRouter.delete("/deletfood/:id",deleteFood)



export  {foodRouter};