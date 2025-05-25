import express from 'express';

import cors from 'cros';
import cookieparser from'cookie-parser';


const app = express()
app.use(cors({
    origin:process.env.CROS_ORIGIN,
    Credential:true
}))

app.use(express.json({ limit:"16kb"}))
app.use(express.urlencoded( ))
app.use(express.static("public"))
app.use(cookieparser())


   
export{app}