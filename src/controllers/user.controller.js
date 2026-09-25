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

// // passing a async function inside our helper function  our first controller which is just for testing '='
// const registerUser = asyncHandler(async (req, res) => {
//     res.status(200).json({
//         message: "ok"
//     })
// })

// // to check weather we have get response from registerUser means to test our api we use Thunder Client or Postman
// // here we are using postman AND IT IS a tool must tobe learned 

// export {registerUser}









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
    // 4. creating a user object  this is bcz when we send data in mongoDB as it is sequal database so we deal with 
    // objects there so we have to create a object and do a creation call for the entry in database 
    // to create we needd too study db calls like to create there is .create and many more for other things 
    // 5. checking if the respnse has come or not for user creation, checking that user is created or not 
    // if there is user created we do 6th 
    // 6. As we know that when anything is created in our mongodb whole thing as it is is return in the response so we 
    // remove the password and refresh token field from the response so that they did not get to the frontend
    // cuz we dont want to send them to the user 
    // and than returning the response 


    // if data is comming from a form or directly from json we use req.body as that stores the data if data is coming from 
    // url we do diff things we will do it further

    // creatng a obj so that i can store all the things i want from req.body
    const {fullName, username, email, password} = req.body; // these are the things i want from the user which will be
    // send by the frontend
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
    if([fullName, email, username, password].some((field) => {
        return field?.trim === ""
        // this will return true if any of the given field's is empty 
    }))
    {
        // this will run if any of the given field is empty 
        throw new APIerror(400, "All Fields are required");
    }
    // we can further make our own validation method for checking weather an email is valid or not 

    // next we are going to checck if user already exist using email, username 

// checking if the user already exist or not 

// User.findOne({username}); // this is basic one to ffind a single thingfrom user in the database
// but here we want email and username if either one we find already exist we will return err that user already exist
// so for that we use $or 

const existedUser = await User.findOne({    
        $or: [{ username }, { email }]
        // passing n no. of objects we want to find but here we only want email and username so will be sending only 2
    })

if(existedUser)
{
    console.log(existedUser);
    return new APIerror(409, "User wth email or username already existed ");
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
    throw new APIerror(400, "Avatar file is req");
}

// now our next objective is to create an object and create an entry in the database
// which we will do with the help of User 

// there maybe an error here as we are dealing with database so nothing is garenteed 
// we can handle error with the async handler but what about the time that it will take while handeling the error 
// so for that we use async in this User.create
const user = await User.create({
    fullName,
    avatar: avatar.url,
    // avatar within itself is a whole obj so we will not send it instead we will send a url which is generatedd by coudinary 
    coverImage: coverImage?.url || "",
    // as we know that coverImmage is not neccessary so it may or maynot have a url so for a case where there is no 
    // cover immage we choose option an empty string
    email,
    password,
    username: username.toLowerCase()
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
else
{
    console.log(createdUser);
    // this is for our own checking that what is inside createdUser
}

// now sending back the response 

return res.status(201).json(
    new APIresponse(200, createdUser, "User registered successfully")
)
// the id we get from mongodb when user is created is a json data id

})





export {registerUser}






























// here we are again with o comments code 


// import { asyncHandler } from "../utils/asyncHandler.js";
// import { APIerror } from "../utils/apiError.js";
// import { User } from "../models/user.models.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { APIresponse } from "../utils/apiResponse.js";




// const registerUser = asyncHandler(async (req, res) => {

//     const {fullName, username, email, password} = req.body; 

//     console.log("email: ", email);
//     console.log("password: ", password);
//     console.log("username: ", username);

//     if([fullName, email, username, password].some((field) => {
//         return field?.trim === ""
//     }))
//     {
//         throw new APIerror(400, "All Fields are required");
//     }

// const existedUser = await User.findOne({    
//         $or: [{ username }, { email }]
//     })

// if(existedUser)
// {
//     console.log(existedUser);
//     return new APIerror(409, "User wth email or username already existed ");
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
//     throw new APIerror(400, "Avatar file is req");
// }

// const user = await User.create({
//     fullName,
//     avatar: avatar.url,
//     coverImage: coverImage?.url || "",
//     email,
//     password,
//     username: username.toLowerCase()

// })

// const createdUser = await User.findById(user._id).select(
//     "-password -refreshToken"
// );

// if(!createdUser)
// {
//     throw new APIerror(500, "Something went wrong while registering the user");
// }
// else
// {
//     console.log(createdUser);
// }

// return res.status(201).json(
//     new APIresponse(200, createdUser, "User registered successfully")
// )

// })





// export {registerUser}