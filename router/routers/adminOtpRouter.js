
import express from 'express'
import { sendOTP } from '../../controllers/otpController.js';
const otpRouter = express.Router()


otpRouter.post('/send',sendOTP )


export  {otpRouter};