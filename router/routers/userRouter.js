import express from 'express'
import { userLogin, userSignup, verifyOtp } from '../../controllers/userContoller.js';
const userRouter = express.Router()

userRouter.post('/usersignup',userSignup )
userRouter.post('/userlogin',userLogin)
userRouter.post('/verify/register',verifyOtp)


export  {userRouter};