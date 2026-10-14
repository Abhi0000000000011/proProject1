import { Router } from "express";
import { changeAvatar, changeCoverImage, changeCurrentPassword, changeEmail, 
    changeFullName, changeusername, getCurrentUser, getUserChannelProfile, 
    getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser 
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const userRouter = Router()

// userRouter.route("/register").post(registerUser)
// as we want to run registerUser method when we get to the "http://localhost:8000/api/v1/users/register" so we do this 
// as we know that post interact with th resouces and add things so with this we will add this particular user 
// in our database which we will do further 
// as we know how middleware works so we will add this middleware bfore using registerUser
userRouter.route("/register").post(
    upload.fields([
        // passsing an array of our files here we are accepting avatar and coverImage if any so we will do
        {
            name: "avatar",
            // name should be matched with the model name 
            // so when our frontend field will be made that name also would be avatar which makes things easy for us 
            maxCount: 1
        },
        {
            name: "coverImage",
            // if there is no coverimage there we are using "" so we dont need to check that is there really a coverimage or not
            maxCount: 1
        }

    ]),
    // we are using array of files so we dont accept a single file we have to accept multiple files
    // with this now we can send images to cloudinary and can use them 
    registerUser
    // with this uploading details of our user in the db 
)

userRouter.route("/login").post(loginUser)

// secured Routes
// userRouter.route("/logout").post(logoutUser)

// adding a middleware here 
userRouter.route("/logout").post(verifyJWT, logoutUser)
// middleware is before going to the next one pass through me here logoutUser method is the next and verifyJWT is the middleware
// which will run just before the logoutUser
// the next in the middleware tells that this function when gets completed run the next method which here is logoutUser


// we can also do like this if there are multiple middlewares 
// userRouter.route("/logout").post(verifyJWT, anotherMiddleware1, another2, logoutUser)
// how many we want in a sequence we want 

userRouter.route("/refresh-token").post(refreshAccessToken)
// we not use the verifyJWT here bcz this is when the access token is expired than run not checking if the user is there or not

// userRouter.route("/coverImageUpdate").patch(verifyJWT, changeCoverImage); we dont write like this our routes 
// userRouter.route("/cover-image-update").patch(upload.single([
//     {name: "coverImage", maxCount: 1}
// ]), verifyJWT, changeCoverImage);
// patch is used when we partially updates to an existing resource. 
// we can also do this one we use req.file above one uses req.files.avatar[0] same for avatar
userRouter.route("/cover-image-update").patch(verifyJWT, upload.single("coverImage"), changeCoverImage);



// userRouter.route("/avatar-update").patch(upload.fields([
//     {name: "avatar", maxCount: 1}
// ]), verifyJWT, changeAvatar);
//  can also do this 
userRouter.route("/avatar-update").patch(verifyJWT, upload.single("avatar"), changeAvatar);
// we do the upper one cuz i just want to set the maxCount

userRouter.route("/current-user").get(verifyJWT, getCurrentUser);

userRouter.route("/update-email").patch(verifyJWT, changeEmail);

userRouter.route("/update-fullName").patch(verifyJWT, changeFullName);

userRouter.route("/update-username").patch(verifyJWT, changeusername);

userRouter.route("/update-password").patch(verifyJWT, changeCurrentPassword);

// now making routes for the one where we use aggregation pipelines 

// as here in getUserChannelProfile we have used params and in that we are using the username so we have to give the route 
// username too so that route can have the info of the username which it can give when getUserChannelProfile is called 
// by using the params
// The colon (:) before username tells Express: "This part of the URL is dynamic. It's a placeholder, not a hardcoded word."
// so if my username is "hardik" it will be "/c/hardik" here down bcz of it 
// as we want username so we will use "get" here 
userRouter.route("/c/:username").get(verifyJWT, getUserChannelProfile);

// here is watchHistory as we are updating it for a short period of time we will use patch
userRouter.route("/watch-history").patch(verifyJWT, getWatchHistory);

export default userRouter







// // again without comments 

// import { Router } from "express";
// import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
// import {upload} from "../middlewares/multer.middleware.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";


// const userRouter = Router()

// userRouter.route("/register").post(
//     upload.fields([
//         {
//             name: "avatar",
//             maxCount: 1
//         },
//         {
//             name: "coverImage",
//             maxCount: 1
//         }

//     ]),
//     registerUser
// )

// userRouter.route("/login").post(loginUser)

// userRouter.route("/logout").post(verifyJWT, logoutUser)

// userRouter.route("/refresh-token").post(refreshAccessToken)

// userRouter.route("/cover-image-update").patch(verifyJWT, upload.single("coverImage"), changeCoverImage);

// userRouter.route("/avatar-update").patch(verifyJWT, upload.single("avatar"), changeAvatar);

// userRouter.route("/current-user").get(verifyJWT, getCurrentUser);

// userRouter.route("/update-email").patch(verifyJWT, changeEmail);

// userRouter.route("/update-fullName").patch(verifyJWT, changeFullName);

// userRouter.route("/update-username").patch(verifyJWT, changeusername);

// userRouter.route("/update-password").patch(verifyJWT, changeCurrentPassword);

// userRouter.route("/c/:username").get(verifyJWT, getUserChannelProfile);

// userRouter.route("/watch-history").patch(verifyJWT, getWatchHistory);


// export default userRouter

