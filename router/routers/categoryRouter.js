
import express from 'express'
import { addCategory, deleteCategory, getAllCategories } from '../../controllers/categoryController.js';
import upload from '../../Middlewares/multer.js';
import {  authenticateSuperAdmin } from '../../Middlewares/adminAuth.js';

const categoryRouter = express.Router()

categoryRouter.post("/add",upload.single("image"),authenticateSuperAdmin ,addCategory)
categoryRouter.get("/getall",getAllCategories)
categoryRouter.delete("/delete/:id",authenticateSuperAdmin ,deleteCategory)

export  {categoryRouter};