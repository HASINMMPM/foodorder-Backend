import express from 'express'
import { userRouter } from '../routers/userRouter.js'
import { foodRouter } from '../routers/foodRouter.js'
import { adminRouter } from '../routers/adminRouter.js'
import { superAdminRouter } from '../routers/superAdminRouter.js'
import { restaurantRouter } from '../routers/restaurantRouter.js'


const v1Router = express.Router()

v1Router.use("/v1/user",userRouter)
v1Router.use("/v1/food",foodRouter)
v1Router.use("/v1/admin",adminRouter)
v1Router.use("/v1",superAdminRouter)
v1Router.use("/v1/restuarant",restaurantRouter)


export{v1Router}