
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
// this cookieparser is used to access the user browser from our server and to access tha user browser's cookies and can 
// set those cookies acc to our benifits and can perform (credentials(cred operations)) in those cookies

const app = express();

// configuration of cors // this is a  middleware as we are using app.use
app.use(cors({
    // origin here means which which origins we are allowing 
    // this origin 
    origin: process.env.CORS_ORIGIN,
    credentials: true // credentials = creds

//     credentials mainly mean:
// Cookies — commonly used for login/session authentication backend sets a login
// HTTP authentication information
// Client-side TLS certificates in some scenarios
// The most common case is cookies.

}))

// middleware to set configuration
// app.use(express.json()) this means we are accepting json 
app.use(express.json({limit: "16kb"}))
// setting a limit of how much a json we can accept 


// accepting data from a url setting up a middleware for it 
// app.use(express.urlencoded()) this is to accpet data from the url 
app.use(express.urlencoded({extended: true, limit: "20kb"}))
// extended here means we can pass objects inside the objects and limit we know about it 

app.use(express.static("public")); // means we can store public assets or what things we want to storein this folder
// this is for whenever we want to store a file or a folder or images i want to store in my own folder so we declare a public
// folder that we can store our public assets 

app.use(cookieParser());// setting up cookieparser


// app.get();

// app.listen();


export {app}



























// this is without any comments here it is 


// import express from "express"
// import cors from "cors"
// import cookieParser from "cookie-parser";

// const app = express();

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

// app.use(express.json({limit: "16kb"}))

// app.use(express.urlencoded({extended: true, limit: "20kb"}))

// app.use(express.static("public"));

// app.use(cookieParser());

// export {app}


