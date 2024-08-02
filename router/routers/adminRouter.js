
import express from 'express'

import { adminlog, adminsignup, deleteAdmin, getAdmins } from '../../controllers/adminController.js';
import { adminsValidation, authenticateSuperAdmin } from '../../Middlewares/adminAuth.js';
const adminRouter = express.Router()

adminRouter.post('/adminsignup',adminsignup )
adminRouter.post('/adminlogin',adminlog)
adminRouter.get('/getalladmin',authenticateSuperAdmin, getAdmins)
adminRouter.delete('/deleteadmin/:id',adminsValidation,deleteAdmin)


export  {adminRouter};