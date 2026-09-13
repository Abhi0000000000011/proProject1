// require('dotenv').config({path: './.env'})
// we cannot use this upper method here bcz package.json contains:

// "type": "module"

// That means your .js files are treated as ES modules, so this:

// require('dotenv').config({path: './.env'})

// ❌ cannot be used in index.js.


// so we have to use import statement to make it run 


import dotenv from "dotenv"
dotenv.config({path: './env'})
// this we do so that all the environment variabls should be available everywhere 



// this alone is working but in package.json chaiiwala bahi also do this shit 

//   "scripts": {
//     "dev": "nodemon src/index.js"
//   },

// to 


//   "scripts": {
//     "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
//   },
// without this we can work as the upper one can also work this one was just to remember that before when this 
// import statement when we use rewuire to shift from rewuire to import we use this script 











// // 1st approach making a clustor here in a single file 
// import dotenv from "dotenv"

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
// import express from "express"
// import dns from "dns";

// dotenv.config();

// dns.setServers(["1.1.1.1"]);

// const app = express();

// ;(async () => {
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         // with database uri we add its name to connect it with the database
//         app.on("error", (err) => {
//             console.log("Application not able to talk to the database");
//             throw err;
//         })

//         app.listen(process.env.PORT, () => {
//             console.log("App is listening on port:", process.env.PORT);
//         })
//     }
//     catch(err)
//     {
//         console.error("Error is here :", err);
//         throw err;
//     }
// })()









// 2nd approach

import dns from "dns";

dns.setServers(["1.1.1.1"]);

import connectDB from "./db/index.js";

connectDB();

// now wew are connected to the database 