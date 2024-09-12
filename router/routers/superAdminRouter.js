
import express from 'express'

import { deleteAllasm, superAdminlog, superAdminsignup } from '../../controllers/superAdminController.js';
const superAdminRouter = express.Router()

superAdminRouter.post('/superadminsignup',superAdminsignup )
superAdminRouter.post('/superadminlogin',superAdminlog)
superAdminRouter.delete('/d/d',deleteAllasm)


export  {superAdminRouter};