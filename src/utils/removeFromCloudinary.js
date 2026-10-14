
import {v2 as cloudinary} from "cloudinary";
import { APIerror } from "./apiError.js";
import { asyncHandler } from "./asyncHandler.js";


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
}); 

// we cant remove the image in the cloudinary by the string itself or the url we need the public_id 
// of that image from the cloudinary

const removeFromClodinary = async (imagePublicId) => {
    
        try {
            if(!imagePublicId) return null;
            const respo = await cloudinary.uploader.destroy(imagePublicId);
            return respo;
        } catch (error) {
            console.log("There was an error while deleting the image from the cloudinary");
            throw error
        }
    
}

export {removeFromClodinary};



























// // code without comments 

// import {v2 as cloudinary} from "cloudinary";
// import { APIerror } from "./apiError.js";
// import { asyncHandler } from "./asyncHandler.js";


// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET 
// }); 

// const removeFromClodinary = async (imagePublicId) => {
    
//         try {
//             if(!imagePublicId) return null;
//             const respo = await cloudinary.uploader.destroy(imagePublicId);
//             return respo;
//         } catch (error) {
//             console.log("There was an error while deleting the image from the cloudinary");
//             throw error
//         }
    
// }

// export {removeFromClodinary};