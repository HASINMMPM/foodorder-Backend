
import express from 'express'

import { superAdminlog, superAdminsignup } from '../../controllers/superAdminController.js';
const superAdminRouter = express.Router()

superAdminRouter.post('/superadminsignup',superAdminsignup )
superAdminRouter.post('/superadminlogin',superAdminlog)


export  {superAdminRouter};