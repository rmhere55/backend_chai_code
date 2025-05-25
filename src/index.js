import dotenv from "dotenv";
import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import express from 'express';
import connectDB from "./db/index.js";

dotenv.config();




connectDB();



// const app = express(); 
// ;(async()=>{
// try {
//     mongoose.connect(`${process.env.MONGOOS_URL}/${DB_NAME}`)
//     app.on("error",()=>{
//         console.log("error",error);
//         throw error
//     })
//     app.listen(process.env.PORT,()=>{
//         console.log(`App is lisenting on port${process.env.PORT}`);
        
//     })
// } catch (error) {
//     console.error("error",error);
//     throw err
    
// }
// })()