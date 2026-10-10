import { User } from "../models/user.models";
import { APIerror } from "./apiError";
import { asyncHandler } from "./asyncHandler";
import { removeFromClodinary } from "./removeFromCloudinary";

const changeImage = (image) => {
    return asyncHandler(async (req, res) => {

        const user = await User.findById(req.user?._id).select("-password -refreshToken");

        if(!user)
        {
            throw new APIerror(404, "Unable to find the user");
        }

        const localFilepath = req.file?.path;
        // we use the multer in the user.routes 

        if(!localFilepath)
        {
            throw new APIerror(400, `Needed a image to change ${image}`);
        }

        const newImage = await uploadOnCloudinary(localFilepath);

        if(!newImage.url)
        {
            throw new APIerror(500, "Unable to update image in cloudinary !!")
        }

        // if(!user[image])
        // {
        //    throw new APIerror(400, `Unable to find ${image}`);
        // } /// this will cause error as if a user is registering or updating their profile for the very first time, 
        // user.avatar or user.coverImage will be empty (undefined). If you leave that check in, 
        // it will crash and throw a 400 error, stopping brand-new users from setting their first picture! 
        // It is completely fine for a user not to have an image yet

        if(image === "avatar" && user.avatarPublicId)
        {
            await removeFromClodinary(user.avatarPublicId);
        }
        else if(image === "coverImage" && user.coverImagePublicId)
        {
            await removeFromClodinary(user.coverImagePublicId);
        }

        user[image] = newImage.url;

        if(image === "avatar")
        {
            user.avatarPublicId = newImage.public_id;
        }
        else
        {
            user.coverImagePublicId = newImage.public_id;
        }

        
        // this is nothing special here we are just updating the object like plain js
        // here it is like user.avatar = newImage.url assigning value to ann attribute of an object

        await user.save({validateBeforeSave: false});

        return res.status(200)
        .json(new APIresponse(200, {user}, `${image} field is updated !!!`));

    })
}




// // can also be done like this below

// const changeImage = (image) => {
//     return asyncHandler(async (req, res) => {

//         const publicIdField = image === "avatar" ? "avatarPublicId" : "coverImagePublicId";

//         const localFilepath = req.file?.path;
//         // we use the multer in the user.routes 

//         if(!localFilepath)
//         {
//             throw new APIerror(400, `Needed a image to change ${image}`);
//         }

//         const newImage = await uploadOnCloudinary(localFilepath);

//         if(!newImage.url)
//         {
//             throw new APIerror(500, "Unable to update image in cloudinary !!")
//         }

//         const user = await User.findByIdAndUpdate(req.user?._id,
//             {
//                 $set: {
//                     [image]: newImage.url,
//                     [publicIdField]: newImage.public_id
//                 }
//             },
//             {
//                 new: true
//             }
//         ).select("-password -refreshToken");

//         return res.status(200)
//         .json(new APIresponse(200, {user}, `${image} field is updated !!!`));

//     })
// }







export {changeImage};






















// // code without comments 

// import { User } from "../models/user.models";
// import { APIerror } from "./apiError";
// import { asyncHandler } from "./asyncHandler";
// import { removeFromClodinary } from "./removeFromCloudinary";

// const changeImage = (image) => {
//     return asyncHandler(async (req, res) => {

//         const user = await User.findById(req.user?._id).select("-password -refreshToken");

//         if(!user)
//         {
//             throw new APIerror(404, "Unable to find the user");
//         }

//         const localFilepath = req.file?.path;

//         if(!localFilepath)
//         {
//             throw new APIerror(400, `Needed a image to change ${image}`);
//         }

//         const newImage = await uploadOnCloudinary(localFilepath);

//         if(!newImage.url)
//         {
//             throw new APIerror(500, "Unable to update image in cloudinary !!")
//         }

//         if(image === "avatar" && user.avatarPublicId)
//         {
//             await removeFromClodinary(user.avatarPublicId);
//         }
//         else if(image === "coverImage" && user.coverImagePublicId)
//         {
//             await removeFromClodinary(user.coverImagePublicId);
//         }

//         user[image] = newImage.url;

//         if(image === "avatar")
//         {
//             user.avatarPublicId = newImage.public_id;
//         }
//         else
//         {
//             user.coverImagePublicId = newImage.public_id;
//         }

//         await user.save({validateBeforeSave: false});

//         return res.status(200)
//         .json(new APIresponse(200, {user}, `${image} field is updated !!!`));

//     })
// }


// export {changeImage};