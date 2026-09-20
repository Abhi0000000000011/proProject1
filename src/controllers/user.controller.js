// we will be using the async handler function which will handle erros here if there is any 
// advantage of this is now e dont have to make an extray try catch block for our controllers this will help us 

import { asyncHandler } from "../utils/asyncHandler.js";


// passing a async function inside our helper function 
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "ok"
    })
})

// to check weather we have get response from registerUser means to test our api we use Thunder Client or Postman
// here we are using postman AND IT IS a tool must tobe learned 

export {registerUser}









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

