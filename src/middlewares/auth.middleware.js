// this middleware will check weather the user is there or not 

import jwt from "jsonwebtoken";
import { APIerror } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {
// export const verifyJWT = asyncHandler(async(req, _, next) => {
    // here we convert the res to "_" as we are not using it we can convert it to a "_"
    try {
        // here we are going to access cookies with the help of cookie parser in app and giving cookies to the user in th 
        // user.controller.js we can now directly access the cookies
        
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        // accessing the token either from the cookie or from the custom header
    
        // here the data comes in header form like we send a key name "authorization" in the headers we can see in the postman
        // and value we send is "Bearer <fullnameOfTokenName>" this is how we send a custom header as a user 
    
        // this is how we send token by custom headers from the user side 
        // "Authorization: Bearer <space> <token>"
    
        if(!token)
        {
            throw new APIerror(401, "Unauthorized request");
        }
    
        // to decode our token which has access token we need the access token secret key which we provide
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        // we can see in the declaration of the access token that the id is decleared as "_id"
    
        if(!user)
        {
            throw new APIerror(400, "Invalid Access Token");
        }
    
        req.user = user; // this req.user is used in multiple fields 
        // adding a new obj in the req and giving it the access of the user obj;
    
        next();

    } catch (error) {
        throw new APIerror(500, error?.message || "Invalid Access Token")
    }

})








// // again without comments 

// import jwt from "jsonwebtoken";
// import { APIerror } from "../utils/apiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { User } from "../models/user.models.js";

// export const verifyJWT = asyncHandler(async(req, res, next) => {

//     try {
        
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
//         if(!token)
//         {
//             throw new APIerror(401, "Unauthorized request");
//         }
    
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
//         const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
//         if(!user)
//         {
//             throw new APIerror(400, "Invalid Access Token");
//         }
    
//         req.user = user;
    
//         next();

//     } catch (error) {
//         throw new APIerror(500, error?.message || "Invalid Access Token")
//     }

// })





