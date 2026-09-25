
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
// this cookieparser is used to access the user browser from our server and to access tha user browser's cookies and can 
// set those cookies acc to our benifits and can perform (credentials(cred operations)) in those cookies

const app = express();

// configuration of cors // this is a  middleware as we are using app.use
app.use(cors({
    // origin here means from which origins we are allowing 
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

app.use(express.static("public")); // means we can store public assets or what things we want to store in this folder
// this is for whenever we want to store a file or a folder or images i want to store in my own folder so we declare a public
// folder that we can store our public assets 

app.use(cookieParser());// setting up cookieparser


// app.get();

// app.listen();










// routes



// Route : A specific path, rule, or mapping that defines how a particular request or URL should be handled.

// In Web Development: It connects a URL endpoint (e.g., /profile or /api/users) to the specific code, function, 
// or component that should render when a user visits that address.

// Router: The control mechanism or manager that handles, evaluates, and directs multiple routes.

// In Web Development: A library or component (like React Router or Express Router) that listens to incoming URL 
// changes or requests, looks at the defined collection of routes, and decides which specific route matches and should be executed


// routes import
import userRouter from "./routes/user.routes.js";

// routes decleration

// first we were using 
// app.get() here we did not expect any routing as with the help of app we were declearing routes and controllers here only
// but now as we have saparated the routes and controllers so now we need the help of middleware to bring the route
// this is complusory as this is the syntax

// app.use("/users", userRouter)
// here the first one is the route and the second one is the router 

// app.use("/users", userRouter)
// now when any user reaches for example "http://localhost:8000/users"our server will give control to the userRouter 
// thann we will do the things which willl be performedd in the user.router.js

// rather than just using "/users" we have to define what we are using weather we are using api or not so what we do is we add 
// api and its first version v1 here mmaybe in future we make its version 2 so we write it down like this



app.use("/api/v1/users", userRouter)
// "http://localhost:8000/api/v1/users" will be 





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

// import userRouter from "./routes/user.routes.js";
// import { registerUser } from "./controllers/user.controller.js";

// app.use("/users", userRouter)

// app.use("/api/v1/users", userRouter)

// export {app}


