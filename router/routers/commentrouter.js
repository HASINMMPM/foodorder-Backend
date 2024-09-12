import express from 'express'

import { addComment, bestComment, getAllComments } from '../../controllers/commentController.js';
const commentRouter = express.Router()

commentRouter.post('/add/comment',addComment )
commentRouter.put('/best/comment/:id',bestComment)
commentRouter.get('/get/comment',getAllComments)



export  {commentRouter};