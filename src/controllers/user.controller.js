import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"


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
  console.log(email);
  if (
    [fullname, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required");
  }
  const existedUer = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUer) {
    throw new ApiError(409, "User with username already exist");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path
  
  const coverImageLocalPath = req.files?.coverImage[0]?.path
    if (!avatarLocalPath) {
        throw new ApiError(400 , "Avatar file is requiere")
    }
    

  const avatar = await  uploadOnCloudinary(avatarLocalPath)
  const coverImage= await  uploadOnCloudinary(coverImageLocalPath)

      if (!avatar) {
        throw new ApiError(400 , "Avatar file is requiere")
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

export { registerUser };
