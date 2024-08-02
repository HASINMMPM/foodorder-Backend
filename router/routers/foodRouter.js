import express from "express";
import {
  addFood,
  deleteFood,
  getAllFood,
  getFoodById,
  updateFood,
} from "../../controllers/foodController.js";
import upload from "../../Middlewares/multer.js";
import authenticateUser from "../../Middlewares/userAuth.js";
import { adminsValidation } from "../../Middlewares/adminAuth.js";


const foodRouter = express.Router();

foodRouter.get("/allfood", getAllFood);
foodRouter.get("/food/:id",authenticateUser, getFoodById);
foodRouter.post("/addfood", upload.single("image"),adminsValidation, addFood);
foodRouter.put("/editfood/:id",adminsValidation, updateFood);
foodRouter.delete("/deletfood/:id",adminsValidation, deleteFood);

export { foodRouter };
