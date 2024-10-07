
import express from 'express'
import { createCoupon, getAllCoupons, validateCoupon } from '../../controllers/couponController.js'


const couponRouter = express.Router()


couponRouter.post('/create',createCoupon )
couponRouter.post('/check',validateCoupon)
couponRouter.get("/all",getAllCoupons)

export  {couponRouter};