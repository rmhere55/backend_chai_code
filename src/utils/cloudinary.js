import { v2 as cloudinary } from 'cloudinary';
// import { log } from 'console';
import fs from 'fs'

import dotenv from "dotenv";

dotenv.config(); // make sure this is called before using process.env


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.COUDINARY_CLOUD_NAME, 
        api_key: process.env.COUDINARY_API_KEY, 
        api_secret: process.env.COUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if (!localFilePath) {
            return null
        }
    // Upload an image

   const uploadResult= await cloudinary.uploader
       .upload(
           localFilePath, {
               public_id: 'shoes',
                resource_type:'auto'
           }
       )
    //    file has been uploaded successfull
    console.log("file is uploaded on claoudinery",uploadResult.url );
     // Clean up temp file
        fs.unlinkSync(localFilePath);
    return uploadResult;
    // fs.unlink(uploadResult)

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed 
        return null  
        // console.log(error);

        
    }
}

    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    

    export {uploadOnCloudinary}