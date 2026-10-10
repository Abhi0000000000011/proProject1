// we will be using the async handler function which will handle erros here if there is any 
// advantage of this is now e dont have to make an extray try catch block for our controllers this will help us 

import { asyncHandler } from "../utils/asyncHandler.js";
import { APIerror } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
// importing user from the models bcz we need to check weather a user already exist or not 
// as mongoose has created this user spo this user has a direct contact with the database
// now this user will call for data from database on our behalf 
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { APIresponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken"
import { changeDetail } from "../utils/userDetailChange.js";
import { changeImage } from "../utils/userImageChange.js";
// // passing a async function inside our helper function  our first controller which is just for testing '='
// const registerUser = asyncHandler(async (req, res) => {
//     res.status(200).json({
//         message: "ok"
//     })
// })

// // to check weather we have get response from registerUser means to test our api we use Thunder Client or Postman
// // here we are using postman AND IT IS a tool must tobe learned 

// export {registerUser}



// creating a seprate access, refresh token function bcz w are going to use this function multiple times 
// here we will be passing userid and how we will get the userid we will see down below 
const generateAccessndRferesh = async (userId) => 
{
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // adding refresh token to the database
        user.refreshToken = refreshToken
        // and saving the user in the database
        // user.save();
        // as this user was already in the database we just updated its refreshtoken value and nothing else 
        // when we use user.save() the required fields starts to kick in so the fields like password email fullName
        // are also ment to be saved at the same time so to counter this we use 
        await user.save({validateBeforeSave: false});
        // this will turn off the required fields here and will save our user 

        // now returning access and refresh token 

        return {accessToken, refreshToken};

    }
    catch(err)
    {
        throw new APIerror(500, "Something went wrong while generating Access and Referesh token !!!", err)
    }
}






// using postman here 
// setting up postman
// passing the url "http://localhost:8000/api/v1/users/register" when we create a new request 


// as by default there we will be sending a get req which will cause this error 

// <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="utf-8">
//     <title>Error</title>
// </head>

// <body>
//     <pre>Cannot GET /</pre>
// </body>

// </html>

// we are sending post req so we have to send post req cuz here we are sending post req 
// import { registerUser } from "../controllers/user.controller.js";

// this is what we will get when we send post req with the url "http://localhost:8000/api/v1/users/register"
// {
//     "message": "ok"
// }
// this message is bcz of the method above in this file 
// in postman we can also see the status of our server, response time, response size and request size...





// now we have to make a controller for registeration of a user so we have to break that part dowen to small small part 





const registerUser = asyncHandler(async (req, res) => {

    // noting down what we want for registeration of a user
    // 1. the things we want : username, email, fullname, password, avatar if there is, cover image if any.
    // 2. validating those things if that email existed or not are all the req field filled or not and many more
    // although we put validation in frontend we also put those in backend for good practice
    // as in our model we also have avatar req so we also have to validate that the user have send avatar or not 
    // 3. if there are images like avatar will be having image and if there is a cover image we have to send it to cloudinary
    // and checking if the images are successfully upload or not this is also our task 
    // 4. creating a user object this is bcz when we send data in mongoDB as it is sequal database so we deal with 
    // objects there so we have to create a object and do a creation call for the entry in database 
    // to create we needd too study db calls like to create there is .create and many more for other things 
    // 5. checking if the response has come or not for user creation, checking that user is created or not 
    // if there is user created we do 6th 
    // 6. As we know that when anything is created in our mongodb whole thing as it is is return in the response so we 
    // remove the password and refresh token field from the response so that they did not get to the frontend
    // cuz we dont want to send them to the user 
    // and than returning the response 


    // if data is comming from a form or directly from json we use req.body as that stores the data if data is coming from 
    // url we do diff things we will do it further

    // creatng a obj so that i can store all the things i want from req.body
    const {fullName, email, password} = req.body; // these are the things i want from the user which will be
    // send by the frontend
    const username = req.body.username?.toLowerCase();

    console.log("email: ", email);
    console.log("password: ", password);
    console.log("username: ", username);

    // we will be using postman so that we can send some data to test weather our controller is working or not 
    // in postman we will be sending data from the body type raw meaning sending data in pure json format 
    // {
    //     "email": "ab@rwt.com",
    //     "username": "abrwt011",
    //     "password": ""
    // } after sending this data we dont get anything in reponse of postman but we can see here 
    // in our console.log we get our email and other things when we are sending it than only btw 
    // with this our 1st work is done getting user details from the frontend
    // here we have not done anything about file handeling we can only handle data not files directly here 
    // we can see now that in routes we have handle the files ie image 

    // now our 2nd step checking validation

    // if(fullName === "")
    // {
    //     throw new APIerror(400, "Full name is required")
    // }
    // this is bignners approach

    // (.some) is a method of array this method is a built-in JavaScript array method used to test whether at least 
    // one element in the array passes the test implemented by a provided callback function returns true or false value
    // Returns a boolean—true if the callback returns a truthy value for at least one element, and false otherwise.
    // Array.prototype.some() (array.some()) is designed to check if at least one element in the array passes a condition
    if([fullName, email, username, password].some((field) => {
        return field?.trim() === ""
        // this will return true if any of the given field's is empty 
    }))
    {
        // this will run if any of the given field is empty 
        throw new APIerror(400, "All Fields are required");
        // not returning ann error instead of it we are throwing it bcz In an async handler wrapped with express-async-handler,
        // returning an object does nothing—you must throw the error so it gets caught by your error-handling middleware
    }
    // we can further make our own validation method for checking weather an email is valid or not 

    // next we are going to checck if user already exist using email, username 
    
    if(username.includes("@"))
    {
        throw new APIerror(400, "Username must not contain '@' ");
    }

// checking if the user already exist or not 

// User.findOne({username}); // this is basic one to find a single thing from user in the database
// but here we want email and username if either one we find already exist we will return err that user already exist
// so for that we use $or 

const existedUser = await User.findOne({    
        $or: [{ username }, { email }]
        // passing n no. of objects we want to find but here we only want email and username so will be sending only 2
    })

if(existedUser)
{
    console.log(existedUser);
    throw new APIerror(409, "User wth email or username already existed ");
    // we can further narrow dowen and find from which it is coming from either from username or from email but we have to 
    // do it ourself
}

// as we know that req.body contain alll the data fromm the user, we also are using a middleware in user_route
// where middleware give us more methods and option and one of them is req.files

// here is this optional symbol bcz there can be a file of avatar or not depend on the user
// req.files?.avatar[0]
// there will be multiple property of avatar here but we need its first propeerty bcz in first property there may or 
// may not be an object with .path we will get the path uploaded by the multer

const avatarLocalPath = req.files?.avatar[0]?.path;
// here asssuming that avatar is there but not down there 
console.log(req.files)
// local path is bcz it is still in our server rn but not inn our cloud(cloudinary)

const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
// here first checking if there is a coverimage or not 

// these both images path can or cannot be there but we needd the avatar image path to be there ass it is necessary to be there 

if(!avatarLocalPath)
{
    throw new APIerror(400, "Avatar file is required");
}

// now uploading these in cloudinary and we have make that method in the starting '-'

const avatar = await uploadOnCloudinary(avatarLocalPath)
// this will take time as it depends on the internet and the size of file so we use await
// and that is why we use async in the starting 

let coverImage;

    if(coverImageLocalPath)
    {
        coverImage = await uploadOnCloudinary(coverImageLocalPath)
    }


// again checking for avatar as avatar is a req field checking if it goes to the database or not

if(!avatar)
{
    throw new APIerror(500, "Avatar file was not uploaded in cloudinary");
}

// now our next objective is to create an object and create an entry in the database
// which we will do with the help of User 

// there maybe an error here as we are dealing with database so nothing is garenteed 
// we can handle error with the async handler but what about the time that it will take while handeling the error 
// so for that we use async in this User.create
const user = await User.create({
    fullName,
    avatar: avatar.url,
    avatarPublicId: avatar.public_id,
    // avatar within itself is a whole obj so we will not send it instead we will send a url which is generatedd by coudinary 
    coverImage: coverImage?.url || "",
    coverImagePublicId: coverImage?.public_id || "",
    // as we know that coverImmage is not neccessary so it may or maynot have a url so for a case where there is no 
    // cover immage we choose option an empty string
    email,
    password,
    username
    // fullName, email, and password don't need .url because they are just raw text strings coming straight from your 
    // req.body JSON data, and username: username.toLowerCase() ensures it's neatly formatted before saving!
})

// checking if user is created or not as we know when we were studing about the database we know that mongoDB
// creates a unique "_id" for each entry which we will now use 

// const isCreated = User.findById(user_id);

// const createdUser = await User.findById(user._id)
// created user having password and refresh token in it which is a bad practice 


// here we chain a select method to remove
// though in select field wee pass those which we want to select but here which we select we want them to be removed from response
// here with a "-" we write those things we dont want in the response 


const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
);
// so after this there will be no pasword and refresh token in the response tht we will be sending to the frontend or in this 
// createdUser

if(!createdUser)
{
    throw new APIerror(500, "Something went wrong while registering the user");
    // here error in from our side as the server was unable to make a user there was no mistake from the user side
}
// else
// {
//     console.log(createdUser);
//     // this is for our own checking that what is inside createdUser
// }

// now sending back the response 

return res.status(201).json(
    new APIresponse(200, createdUser, "User registered successfully")
)
// the id we get from mongodb when user is created is a json data id

})


// now creating login 


// 1. we will be bringing data from the req.body
// 2. we will be checking username or email based login 
// 3. we will find if the user existed or not 
// 4. if there is a user check the password
// 5. if password is correct generate access and refresh token and send them to the user 
// 6. sending this data ie the tokens in cookies format to user

const loginUser = asyncHandler(async (req, res) => {

    const {email, password, username} = req.body;

    // if(!email || !username) // this is not the correct syntax
    if(!(email || username))
    {
        throw new APIerror(400, "Username or email is required");
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user)
    {
        throw new APIerror(404, "User does not exist");
    }

    // here we are not using "User" because it is an object of mongoose where we use mongoose method findOne etc like above
    // but here we are using a methods made by us whichh we have stored inn the user above as we can see 
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid)
    {
        throw new APIerror(408, "The passsword is inValid");
    }

    const {accessToken, refreshToken} = await generateAccessndRferesh(user._id);

    // now our task is to send these tokens in cookies in user browser so that it can validate 
    // that yes this is the user that just logged in 
    // now what info we have to send to the user bcz of using this 
    // const user = await User.findOne and giving user the User 
    // now as still our "user" has nothing in the refresh and access token so we have to store them first 
    // here comes imp thing we can again bring up and store the tokens by using db queries again 
    // or we can update the object of our "User" which is "user" it depends on us but main thing is 
    // on using db queries again it may or may not get expensive for us it totally depends on 
    // expensive in the sense increasing load in db in perfrmance of our website and all, in user experience  

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const option = {
        httpOnly: true,
        secure:  process.env.NODE_ENV === "production" // or we can make it directly "true"
        // these cookies can be modified by anyone in the frontend but by httpOnly and secure making true
        // we can now change these cookies from the servers only 
    }

    // console.log("access token :", accessToken)
    // console.log("access token type :", typeof accessToken);

    // now returning the response

    // using cookie withe the help of cookie-parser
    return res.status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
        new APIresponse(
            200,
            {
                // here i am returning access token and refresh token in the response which is for 
                // checking but in production we dont return these tokens
                user: loggedInUser, accessToken, refreshToken
                // here a Q arises that we have send the refresh and access token just above using cookies why are we still
                // sending tokens here we r just sending this top user bcz he may want them or want to store them in localstorage
                // anything can happen
            },
            "User logged In successfully"
        )
    );
    // passing cookie as a key value pair first key than its value giving option obj too so that no one can change our cookie





})



// now logging out our user 
const logoutUser = asyncHandler(async (req, res) => {
    // now bcz of all the bhang b* in the user.routes, in auth.middleware we can now get the user data by using 
    // req.user method 
    await User.findByIdAndUpdate(req.user._id,
        {
            // set helps us in which field we want to do hear fear which we passed as an object 
            $set: {
                refreshToken: undefined
                // as we remove refreshToken this generate access token which means access token will also get removed 
                // which will logout the user 
            }
        },
        {
            new: true,
            // this will give us new values in response like we will get the value of refreshToken undefined now 
            // otherwise we may get the old value of the updated fields for example refreshToken
        }
    )

    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" // False on localhost, true on deployed HTTPS servers
    }

    return res
    .status(200)
    // .clearCookie("accessToken", accessToken, option) // this is not correct here 
    .clearCookie("accessToken", option) // this is not correct here 
    .clearCookie("refreshToken", option)
    .json(
        new APIresponse(
            200,
            {},
            "User logged Out successfully"
        )
    );
 
})


// making an end pooint so that our refresh token generate a access token on access token expire 

// here this is called Refresh Token Rotation as we are also changing the refresh token with the access token 

// why we do it 

// The Risk of Static (Reusable) Refresh Tokens If you keep the old refresh token valid for its entire lifespan 
// (e.g., 7 days or 30 days): If a hacker ever intercepts or steals that single refresh token, 
// they can use it to generate new access tokens behind the scenes for weeks without the user ever knowing, 
// even if the user logs out or changes their password (unless you explicitly clear tokens).

// 2. The Power of Rotation (What your code does) When you generate a brand new refresh token every time: 
// One-time use: The moment a refresh token is used, it "burns out" and is replaced in the database. 
// The Theft Detection Bonus: If a hacker steals an old refresh token and tries to use it after the legitimate 
// user has already refreshed theirs, your backend will see that incomingRefreshToken != user.refreshToken. 
// That is a massive red flag—it tells your system that a token is being reused maliciously, 
// allowing you to instantly log out all devices for that user!



const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    // req.cookies is for web browser 
    // while req.body is for mobile apps 
    // this we have to do bcz both web browser and mobile apps handles and stores token differently 
    // mobile apps can use cookies, but practically and architecturally, they usually don't

    if(!incomingRefreshToken)
    {
        throw new APIerror(401, "Unauthorized request");
    }

    try {
        const decodedIncomingRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user =  await User.findById(decodedIncomingRefreshToken?._id);
    
        if(!user)
        {
            throw new APIerror(402, "Invalid refresh token !!!");
        }
    
        // checking the refresh token that user has and what we have get 
        // maybe the incomingRefreshToken can be old or a steal one which once belongs to the refresh tokenn but not now 
    
        // Token Theft and Reuse Detection
        if(incomingRefreshToken != user.refreshToken)
        {
            throw new APIerror(403, "Invalid Refresh Token expired or used");
        }
    
        const {accessToken, newRefreshToken} = await generateAccessndRferesh(user._id);
        // we declare newRefreshToken not refreshToken as we have decleared refreshToken earlier in this function
    
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        }
    
        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new APIresponse(202, {
                accessToken, refreshToken: newRefreshToken
            }, "access token refreshed successfully !!!")
        )
    } catch (error) { 
        throw new APIerror(400, "Error while making new Access token ");
    }

// i understand is that if my refresh token expiry is in 2 days and my access token expiry is 
// 20 min after logging and creating a access token by the user and after 20 min the access token expires 
// so now when the user again comes back weather it is after 1 hour or 2 hour but if he come within the duration 
// of refresh token a new access token and a new refresh token is also generated bcz the user visited again within 
// the time period of refresh token but if the refresh token expires so the user has to login again
// Spot on! You have completely nailed how the entire dual-token system works.



})



// now making a method which will change password when user wants to change 

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    // takking the current password and the new password from the user 

    // When a user is changing their password, they are already logged in and authenticated via their access token. 
    // Your authentication middleware (verifyJWT) decodes that token, finds the user, and attaches them to req.user. 
    // req.user is secure because it comes from a verified cryptographic token. req.body can be completely 
    // manipulated by anyone. If you used req.body.user?._id, a malicious user could pass someone else's user 
    // ID in the request body and change their password!

    const user = await User.findById(req.user?._id);
    // const user = User.findById(req.body.user?._id);

    const isCorrectPassword = await user.isPasswordCorrect(oldPassword);

    if(!isCorrectPassword)
    {
        throw new APIerror(401, "The password is wrong !!!");
    }

    user.password = newPassword;
    // now here that UserSchema.pre("save") will also execute as password is modified

    // now saving the password in our database


    // await User.findByIdAndUpdate(req.user._id, 
    //     {
    //         $set: {
    //             password: newPassword
    //         }
    //     }, 
    //     {
    //         new: true
    //     }
    // )

    // we choose this one as we have a save method in our user model which hash the password and we want our new 
    // password to get encrypted which that upper User.findByIdAndUpdate cannot do 
    await user.save({validateBeforeSave: false});

    return res.status(200)
    .json(new APIresponse(200, {}, "Password changed successfully !!!"));

})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200)
    .json(new APIresponse(200, {user: req.user}, "Current user fetched"));
})

// const updateAccountDetail = asyncHandler(async (req, res) => {
//     // this below comes under architectural reasoning which is how we architecture our metods 
//     // whenever we are updating a file make different controllers for them respectvely and end points too 
//     // so that we can save only that particular file if we save the whole user again and again it will again save 
//     // the text data and that data which is not changed too which increases the load in our app and db 
// })

const changeEmail = changeDetail("email");

const changeusername = changeDetail("username");

const changeFullName = changeDetail("fullName");

const changeCoverImage = changeImage("coverImage");

const changeAvatar = changeImage("avatar");

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    changeCoverImage,
    changeAvatar,
    changeEmail,
    changeusername,
    changeFullName
}






























// here we are again with o comments code 




// import { asyncHandler } from "../utils/asyncHandler.js";
// import { APIerror } from "../utils/apiError.js";
// import { User } from "../models/user.models.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { APIresponse } from "../utils/apiResponse.js";
// import jwt from "jsonwebtoken"
// const generateAccessndRferesh = async (userId) => 
// {
//     try{
//         const user = await User.findById(userId);
//         const accessToken = user.generateAccessToken()
//         const refreshToken = user.generateRefreshToken()

//         user.refreshToken = refreshToken
//         await user.save({validateBeforeSave: false});

//         return {accessToken, refreshToken};

//     }
//     catch(err)
//     {
//         throw new APIerror(500, "Something went wrong while generating Access and Referesh token !!!", err)
//     }
// }


// const registerUser = asyncHandler(async (req, res) => {

//     const {fullName, email, password} = req.body;

//     const username = req.body.username?.toLowerCase();

//     console.log("email: ", email);
//     console.log("password: ", password);
//     console.log("username: ", username);

//     if([fullName, email, username, password].some((field) => {
//         return field?.trim() === ""
//     }))
//     {
//         throw new APIerror(400, "All Fields are required");
//     }

//     if(username.includes("@"))
//     {
//         throw new APIerror(400, "Username must not contain '@' ");
//     }

// const existedUser = await User.findOne({    
//         $or: [{ username }, { email }]
//     })

// if(existedUser)
// {
//     console.log(existedUser);
//     throw new APIerror(409, "User wth email or username already existed ");
// }

// const avatarLocalPath = req.files?.avatar[0]?.path;

// console.log(req.files)

// const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

// if(!avatarLocalPath)
// {
//     throw new APIerror(400, "Avatar file is required");
// }

// const avatar = await uploadOnCloudinary(avatarLocalPath)

// let coverImage;

//     if(coverImageLocalPath)
//     {
//         coverImage = await uploadOnCloudinary(coverImageLocalPath)
//     }

// if(!avatar)
// {
//     throw new APIerror(500, "Avatar file was not uploaded in cloudinary");
// }

// const user = await User.create({
//     fullName,
//     avatar: avatar.url,
//     coverImage: coverImage?.url || "",
//     email,
//     password,
//     username
// })

// const createdUser = await User.findById(user._id).select(
//     "-password -refreshToken"
// );
// if(!createdUser)
// {
//     throw new APIerror(500, "Something went wrong while registering the user");
// }
// return res.status(201).json(
//     new APIresponse(200, createdUser, "User registered successfully")
// )
// })


// const loginUser = asyncHandler(async (req, res) => {

//     const {email, password, username} = req.body;

//     if(!(email || username))
//     {
//         throw new APIerror(400, "Username or email is required");
//     }

//     const user = await User.findOne({
//         $or: [{username}, {email}]
//     })

//     if(!user)
//     {
//         throw new APIerror(404, "User does not exist");
//     }

//     const isPasswordValid = await user.isPasswordCorrect(password)

//     if(!isPasswordValid)
//     {
//         throw new APIerror(408, "The passsword is inValid");
//     }

//     const {accessToken, refreshToken} = await generateAccessndRferesh(user._id);

//     const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

//     const option = {
//         httpOnly: true,
//         secure:  process.env.NODE_ENV === "production"
//     }

//     return res.status(200)
//     .cookie("accessToken", accessToken, option)
//     .cookie("refreshToken", refreshToken, option)
//     .json(
//         new APIresponse(
//             200,
//             {
                
//                 user: loggedInUser, accessToken, refreshToken
                
//             },
//             "User logged In successfully"
//         )
//     );



// })

// const logoutUser = asyncHandler(async (req, res) => {
    
//     await User.findByIdAndUpdate(req.user._id,
//         {
//             $set: {
//                 refreshToken: undefined
//             }
//         },
//         {
//             new: true,
//         }
//     )

//     const option = {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production"
//     }

//     return res
//     .status(200)
//     .clearCookie("accessToken", option)  
//     .clearCookie("refreshToken", option)
//     .json(
//         new APIresponse(
//             200,
//             {},
//             "User logged Out successfully"
//         )
//     );
 
// })

// const refreshAccessToken = asyncHandler(async(req, res) => {
//     const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

//     if(!incomingRefreshToken)
//     {
//         throw new APIerror(401, "Unauthorized request");
//     }

//     try {
//         const decodedIncomingRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
//         const user =  await User.findById(decodedIncomingRefreshToken?._id);
    
//         if(!user)
//         {
//             throw new APIerror(402, "Invalid refresh token !!!");
//         }
    
//         if(incomingRefreshToken != user.refreshToken)
//         {
//             throw new APIerror(403, "Invalid Refresh Token expired or used");
//         }
    
//         const {accessToken, newRefreshToken} = await generateAccessndRferesh(user._id);
    
//         const options = {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production"
//         }
    
//         return res.status(200)
//         .cookie("accessToken", accessToken, options)
//         .cookie("refreshToken", newRefreshToken, options)
//         .json(
//             new APIresponse(202, {
//                 accessToken, refreshToken: newRefreshToken
//             }, "access token refreshed successfully !!!")
//         )
//     } catch (error) { 
//         throw new APIerror(400, "Error while making new Access token ");
//     }

// })


// const changeCurrentPassword = asyncHandler(async (req, res) => {
//     const {oldPassword, newPassword} = req.body;

//     const user = await User.findById(req.user?._id);

//     const isCorrectPassword = await user.isPasswordCorrect(oldPassword);

//     if(!isCorrectPassword)
//     {
//         throw new APIerror(401, "The password is wrong !!!");
//     }

//     user.password = newPassword;

//     await user.save({validateBeforeSave: false});

//     return res.status(200)
//     .json(new APIresponse(200, {}, "Password changed successfully !!!"));

// })

// const getCurrentUser = asyncHandler(async (req, res) => {
//     return res.status(200)
//     .json(new APIresponse(200, {user: req.user}, "Current user fetched"));
// })

// const changeEmail = changeDetail("email");

// const changeusername = changeDetail("username");

// const changeFullName = changeDetail("fullName");

// const changeCoverImage = changeImage("coverImage");

// const changeAvatar = changeImage("avatar");

// export {
//     registerUser,
//     loginUser,
//     logoutUser,
//     refreshAccessToken,
//     changeCurrentPassword,
//     getCurrentUser,
//     changeCoverImage,
//     changeAvatar,
//     changeEmail,
//     changeusername,
//     changeFullName
// }




