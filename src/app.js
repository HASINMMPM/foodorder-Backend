import express from 'express'
import connect from '../config/DB-connect.js'
// import { userRouter } from '../router/routs/userRouter.js'
import cookieParser from 'cookie-parser'
import { v1Router } from '../router/v1/v1Router.js'
const app = express()
const port = 3000

// middleware

app.use(express.json())
app.use(cookieParser());

app.use("/",v1Router)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app working on port http://localhost:${port}`)
})
connect()