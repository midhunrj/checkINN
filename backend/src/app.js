import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import nocache from 'nocache'
import HotelRouter from './routes/HotelRoutes.js'







const app=express()

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const corsOptions={
    origin:[process.env.CLIENT_URL],
    credentials:true
}

app.use(cors(corsOptions))

// app.use('/',)

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("mongodb connected")
    
})
.catch((err)=>{
    console.error(err.message)
})

app.use('/',HotelRouter)
app.listen(7886,()=>{
    console.log("server is connected and running on 7886");
    
})