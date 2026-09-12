import mongoose from "mongoose";
import {DB_NAME} from "./constants"
import express from "express"











// // this is the first approch where we do all the things in this index.js 


// const app = express();

// // ;()() this is an IIFE function
// // this ; before ()() is bcz sometime there maybe be no ; in the last line which may cause error to preavent it we use this
// // ;()() this first() is my function and the 2nd () is to exectue the function immideately

// ;(async () => {
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         app.on("error", (error) => {
//             console.log("Error in binding with the Database");
//             throw error;
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port: ${process.env.PORT}`);
//         })
//     }
//     catch(error)
//     {
//         console.error("ERROR:", error);
//         throw error
//     }
// })() 

// // now our database is connected









