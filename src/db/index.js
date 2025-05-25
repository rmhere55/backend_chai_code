import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import express from 'express';


const connectDB = async()=>{
    try {
        
        const connectionInstance = await mongoose.connect(`${process.env.MONGOOSE_URL}/${DB_NAME}`);

        console.log(`\n MongoDB connected!! DB host :${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("mongoDb error" ,error);
        process.exit(1)
    }
}
export default connectDB;