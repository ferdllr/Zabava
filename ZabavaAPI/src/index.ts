import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from './routes/userRoutes';
import localRouter from './routes/localRoutes';
import trabalhoRouter from './routes/trabalhoRoutes'
import eventoRouter from './routes/eventoRoutes'

import swaggerUi from "swagger-ui-express"
import { connect } from "./service/database"

dotenv.config()

const app: Express = express()

const port = process.env.PORT
const databaseUrl = process.env.DATABASE_URL || ""

connect(databaseUrl)

const corsOptions = { 
  origin : ['http://localhost:3000'], 
} 
 
app.use(cors(corsOptions)) 
app.use(express.json())
app.use(express.static("public"))
app.use(
  "/swagger", 
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
)

app.use('/api/user', userRouter)
app.use('/api/local', localRouter)
app.use('/api/trabalho', trabalhoRouter)
app.use('/api/evento', eventoRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server")
})

app.listen(port, () => {
  console.log(`Server Started at ${port}`)
})