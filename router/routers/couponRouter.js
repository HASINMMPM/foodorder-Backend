
import express from 'express'
import { createCoupon, validateCoupon } from '../../controllers/couponController.js'


const couponRouter = express.Router()


couponRouter.post('/create',createCoupon )
couponRouter.post('/check',validateCoupon)


export  {couponRouter};