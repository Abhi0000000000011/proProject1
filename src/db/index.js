import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("connectionInstance is here ", connectionInstance);
        console.log(`\n mongoDB connected !!!! ${connectionInstance.connection.host}`);
        // main : connectionInstance.connection.host will show the MongoDB server hostname that Mongoose is connected to.
        // mine: this will show where the uri of the mongoDb where it is connected 
    }
    catch(err)
    {
        console.log("MONGODB connection error:", err);
        // there are others ways to handle error which are provided by node js 
        process.exit(1);
    }
    // we should not write the try and catch code mindlessly as when we see the error with the help of try and catch and we see 
    // taking this file example an error whihc starts with "MONGODB connection error:" we know that there is some error here 
    // or related to this file which make debugging easy 

    //  like here if we get the error with the help of catch block we know that here we are using DB_NAME and MONGODB_URI which 
    // will be the cause of the error so we now know where we have to correct our file 
}

export default connectDB;






// now we know how to connect with the database and which thngs are required and which are the things that may went wrong and
// where we need to work this is same for connectivity in any database 

