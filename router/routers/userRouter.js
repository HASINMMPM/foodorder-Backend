import express from 'express'
import { userLogin, userSignup } from '../../controllers/userContoller.js';
const userRouter = express.Router()

userRouter.post('/usersignup',userSignup )
userRouter.post('/userlogin',userLogin)

export  {userRouter};