
import express from 'express'

import { adminlog, adminsignup, deleteAdmin, getAdmin, getAdmins } from '../../controllers/adminController.js';
// import { adminsValidation, authenticateSuperAdmin } from '../../Middlewares/adminAuth.js';
const adminRouter = express.Router()


adminRouter.post('/adminsignup',adminsignup )
adminRouter.post('/adminlogin',adminlog)
adminRouter.get('/getalladmin', getAdmins)
adminRouter.delete('/deleteadmin/:id',deleteAdmin)

adminRouter.post('/singeladmin', getAdmin)


export  {adminRouter};