import express from 'express'
import { userRouter } from '../routers/userRouter.js'
import { foodRouter } from '../routers/foodRouter.js'
const v1Router = express.Router()

v1Router.use("/v1/user",userRouter)
v1Router.use("/v1/food",foodRouter)


export{v1Router}
