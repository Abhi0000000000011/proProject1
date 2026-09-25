import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";


const userRouter = Router()

// userRouter.route("/register").post(registerUser)
// as we want to run registerUser method when we get to the "http://localhost:8000/api/v1/users/register" so we do this 
// as we know that post interact with th resouces and add things so with this we will add this particular user 
// in our database which we will do further 
// as we know how middleware works so we will add this middleware bfore using registerUser
userRouter.route("/register").post(
    upload.fields([
        // passsing an array of our files here we are accepting avatar and coveriage if any so we will do
        {
            name: "avatar",
            // name should be matched with the model name 
            // so when our frontend field will be made that name also would be avatar which makes things easy for us 
            maxCount: 1
        },
        {
            name: "coverImage",
            // if there is no coverimage there we are using "" so we dont needd to check that is there really a coverimage or not
            maxCount: 1
        }

    ]),
    // we are using array of files so we dont accept a single file we have to accept multiple files
    // with this now we can send images to cloudinary and can use them 
    registerUser
    // with this uploading details of our user in the db 
)


export default userRouter







// // again without comments 

// import { Router } from "express";
// import { registerUser } from "../controllers/user.controller.js";
// import {upload} from "../middlewares/multer.middleware.js";


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


// export default userRouter

