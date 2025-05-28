import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";


export const verifyJWT = asyncHandler(async(req, res , next)=>{
  try {const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")


    if (!token) {
        throw new ApiError(401 , "Unauthorization request")
    }
  const decodeToken =    jwt.verify(token, process.env.
ACCESS_TOKEN_SECRET)
     const user =   await User.findById(decodeToken?._id).select("-password -refreshToken")


        if (!user) {
            // Todos about frontend
        throw new ApiError(401 , " Invalid Access Token")
            
        }

        req.user = user;
        next()}
        catch(err){
        throw new ApiError(401 , err.message|| " Invalid Access Token")

        }
})