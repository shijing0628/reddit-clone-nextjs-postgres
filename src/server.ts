import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import morgan from 'morgan'
import authRoutes from './routes/auth'
import trim from '../middleware/trim'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import postRoutes from './routes/posts'
import subsRoutes from './routes/subs'


dotenv.config()
const app = express();

app.use(express.json());
app.use(morgan('dev'))
app.use(trim)
app.use(cookieParser())



app.get('./',(req,res)=>console.log('hello world'))
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/subs', subsRoutes)




app.listen(process.env.PORT, async()=>{
 console.log(`server is running at http://localhost:${process.env.PORT}.`)
 try{
   await createConnection()
   console.log('Database connected')
 }catch(err){
  console.log(err)
 }
})
