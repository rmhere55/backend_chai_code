import dotenv from "dotenv";
import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config();




connectDB().then(()=>{
    app.listen(process.env.PORT||4000,()=>{
        console.log(`App is lisenting on port${process.env.PORT} `);
        
    })})
.catch((err)=>{
    console.log("db connection fail",err);
    
})



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