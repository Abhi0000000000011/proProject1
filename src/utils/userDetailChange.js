import { User } from "../models/user.models";
import { APIerror } from "./apiError";
import { APIresponse } from "./apiResponse";
import { asyncHandler } from "./asyncHandler";

const changeDetail = (detail) => {
    return asyncHandler(async (req, res) => {

        const value = req.body[detail];

        if(detail === "email" || detail === "username")
        {
            const existedDetail = await User.findOne({
                [detail]: value,
                // _id: {$ne: req.user?._id}  // here we dont want this thing
                // // this here means "Check if this email exists anywhere in the database... except on my own user account."
                // // why are we using this cz 
                // // const existedDetail = await User.findOne({ email: value });
                // // When MongoDB runs this, it searches the entire database—and it finds a match because 
                // // that email already belongs to the logged-in user themselves! Because MongoDB finds a user with that email, 
                // // your code triggers the existedDetail check and throws an error: "Email already exists!" 
                // // This creates a frustrating bug where a user tries to save their profile, but your backend accidentally 
                // // accuses them of trying to steal an email that is already theirs.
            })

            if(existedDetail)
            {
                throw new APIerror(409, `${detail} already existed.....`);
            }
        }
        
        const user = await User.findByIdAndUpdate(req.user._id, {
            $set: {
                [detail]: value
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    return res.status(200)
    .json(new APIresponse(200, {user}, `${detail} field is updated !!!`));
    })
}

export { changeDetail }





















// // code without comments 

// import { User } from "../models/user.models";
// import { APIerror } from "./apiError";
// import { APIresponse } from "./apiResponse";
// import { asyncHandler } from "./asyncHandler";

// const changeDetail = (detail) => {
//     return asyncHandler(async (req, res) => {

//         const value = req.body[detail];

//         if(detail === "email" || detail === "username")
//         {
//             const existedDetail = await User.findOne({
//                 [detail]: value,
//             })

//             if(existedDetail)
//             {
//                 throw new APIerror(409, `${detail} already existed.....`);
//             }
//         }
        
//         const user = await User.findByIdAndUpdate(req.user._id, {
//             $set: {
//                 [detail]: value
//             }
//         },
//         {
//             new: true
//         }
//     ).select("-password -refreshToken")

//     return res.status(200)
//     .json(new APIresponse(200, {user}, `${detail} field is updated !!!`));
//     })
// }

// export { changeDetail }