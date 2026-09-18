// // here we will make the function of the database connectivity here as we are making a saparate folder for the async function 
// // we can make it in two ways by try and catch and another is promises

// // this is a higher order function those function which treat other functions as variables or parameters which 
// // we can pass in that higher order function 

// // const asyncHandler = () => {}
// // const asyncHandler = (fn) => {() => {}} //accepting an function and further passing this function in the after function 
// // this is higher order function

// // this next is for a middleware if further used 
// const asyncHandler = (fn) => {return async (req, res, next) => {
//     // fn will be the function for which we will be using this function as this function needs a function to execute as it takes
//     // a function as a parameter to execute
//     try{
//         await fn(req,res,next);
//     }
//     catch(err)
//     {
//         res.status(err.code || 500).json({
//             // this jason response is to clear things out for the frontend engineer so that he may figure out 
//             // that if there is a error or not 
//             success: false,
//             message: err.message
//         });
//         // this is one of the few ways to send back the response if there is an error using status 
//     }
// }
// }
// // this here is a wrapper function which we will be using most of the places in the code 

// export { asyncHandler }






// the above one was one of the way using try and catch


// same higher order function
const asyncHandler = (requestHandler) => {
    // this req handler will be a function as this function will be used further in other functions taking those functions 
    // as input 
    return (req, res, next) => {
        // resolve means promise is successfull catch means promise is failed
        Promise.resolve(
            requestHandler(req, res, next)
        ).catch(
            (err) => next(err)
        )
    }
}

export { asyncHandler }




// we will be using this function in express as app.get('/profile', asyncHandler(getMyProfile)) as middleware or a utility 
// so express will be needing something which it will get when we will return something to it doing insidethe async function 
// only dont do the things 
