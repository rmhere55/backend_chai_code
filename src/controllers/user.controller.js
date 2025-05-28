import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
       const accessToken = await user.generateAccessToken()
        const refreshToken=await user.generateRefreshToken()
        user.refreshToken  = refreshToken
        console.log("Access token expiry:", process.env.ACCESS_TOKEN_EXPIRY); // should log: 1d

        await user.save({validateBeforeSave : false})

        return {accessToken, refreshToken}
    } catch (error) {
     
          console.error("Token generation error:", error); // ✅ log real error
        throw new ApiError(500 , "Something went wrong while generating refresh and access token")
    }
}
const registerUser = asyncHandler(async (req, res) => {
  //    get user from frontend
  // validation (required ) not empty
  // check user already exists :username or email also
  // files exists - check for avatar ,img
  // upload to Cloudinary , avatar

  // create user obj - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { username, email, password, fullname } = req.body;
  console.log(req.body);
  if (
    [fullname, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required");
  }
  const existedUer = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUer) {
    throw new ApiError(409, "User with username already exist");
  }
console.log(req.files);

//   const avatarLocalPath = req.files?.avatar[0]?.path
  
//   const coverImageLocalPath = req.files?.coverImage[0]?.path

// easy code 
 let avatarLocalPath;
if (
  req.files &&
  Array.isArray(req.files.avatar) &&
  req.files.avatar.length > 0
) {
  avatarLocalPath = req.files.avatar[0].path;
}

let coverImageLocalPath;
if (
  req.files &&
  Array.isArray(req.files.coverImage) &&
  req.files.coverImage.length > 0
) {
  coverImageLocalPath = req.files.coverImage[0].path;
}

    if (!avatarLocalPath) {
        throw new ApiError(400 , "Avatar file is required")
    }
    console.log("Avatar Local Path:", avatarLocalPath);
console.log("All req.files:", req.files);


  const avatar = await  uploadOnCloudinary(avatarLocalPath)
  const coverImage= await  uploadOnCloudinary(coverImageLocalPath)

      if (!avatar) {
        throw new ApiError(400 , "Avatar file is required")
    }
     
    const user = await    User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        username: username.toLowerCase()
    })
 const createrUser = await  User.findById(user._id).select(
    "-password -refreshToken"
 )
 if (!createrUser) {
    throw new ApiError(500 , "something went wrong to created the user ")
 }

 return res.status(201).json(
    new ApiResponse(200, createrUser, "User registered successful ")
 )
  // res.status(200).json({
  //     message:"ok"
  // })
});


const loginUser = asyncHandler(async(req, res)=>{
    // req body => data
    // username && email
    // find the user 
    // password check
    // access & refresh token
    // send cookie

    
  const { username, email, password } = req.body;
  console.log(req.body);
  if (
     !(email ||  username))
   {
    throw new ApiError(400, "username or email are required");
  }
  const user = await User.findOne({
    $or:[{username},{email}]
  })
  if (!user) {
    throw new ApiError(404 , "User does Not exist ")
  }
  const isPasswordValid = await user.isPasswordCorrect(password)
  if (!isPasswordValid) {
    throw new ApiError(404 , "inValid credential ")
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: true
  }
  return res.status(200).cookie("accessToken" ,accessToken , options).cookie("refreshToken", refreshToken , options)
  .json(
    new ApiResponse(200,
        {
            user: loggedInUser,accessToken , refreshToken
        },
        "User logged In Successfully"
    )
  )

})

const logoutUser = asyncHandler(async (req , res)=>{
    await User.findByIdAndUpdate(
        req.user._id,{
            $set:{
                refreshToken: undefined
            }
        },{
            new : true
        }
    )

    
  const options = {
    httpOnly: true,
    secure: true
  }
  return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken",  options)
  .json(
    new ApiResponse(200,
        {
        },
        "User logged Out "
    )
  )
})


const refreshAccessToken = asyncHandler(async(req,res)=>{
  const incomingRefreshToken = req.cookie.refreshToken  ||req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unuthoried request")
  }
  
 try {const decodedToken =  jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  )
  
  const user = await User.findById(decodedToken?._id)
  
  if (!user) {
    throw new ApiError(401, "Invalied  Token")
  }
  if(incomingRefreshToken !== user?.refreshToken){
    throw new ApiError(401, "Refresh Token is expired or used ")

  }
   
  const options = {
    httpOnly: true,
    secure: true
  }

    const {accessToken , newrefreshToken}  = await generateAccessAndRefreshToken(user._id)
   return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken" ,newrefreshToken,options).json(
    new ApiResponse(200 , {accessToken, refreshToken: newrefreshToken},
      "Access token refresh successfully"
    )
   )}
   catch(err){
    throw new ApiError(401, err?.message || "Invalid refresh token")
   }
})

export { registerUser , loginUser ,logoutUser ,refreshAccessToken};
