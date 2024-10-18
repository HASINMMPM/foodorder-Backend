
import express from 'express'
import { createCoupon, deleteCoupon, getAllCoupons, validateCoupon } from '../../controllers/couponController.js'


const couponRouter = express.Router()


couponRouter.post('/create',createCoupon );
couponRouter.post('/check',validateCoupon);
couponRouter.get("/all",getAllCoupons);
couponRouter.delete("/delete/:id",deleteCoupon);

export  {couponRouter};