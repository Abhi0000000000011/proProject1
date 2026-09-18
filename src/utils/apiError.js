// this file is to make sure that our errors responses are in standardized manner 

// Instead of randomly typing res.json({ success: false, user: data }) or res.json({ status: 400, result: ... }) 
// differently in every route, this class ensures that every response looks completely uniform for the error.






// this is where stack is used and why it is used 

// Because stack is an optional parameter, someone can explicitly pass it in as an argument when they create a new 
// instance of your error.

// How it looks in practice:
// Most of the time, people only pass 2 or 3 arguments:

// JavaScript
// // No stack passed here, so it falls into the `else` block and auto-generates one:
// throw new ApiError(404, "User not found");
// However, in certain advanced scenarios (like catching an error from a microservice, a message queue, or a third-party library)
//  you might already have a pre-existing error object that has its own stack trace. You would pass it like this:

// JavaScript
// try {
//     // Some dangerous code or external API call that fails
//     await thirdPartyLibrary.doSomething();
// } catch (externalError) {
//     // 👇 Look! We are passing the external error's stack as the 4th argument!
//     throw new ApiError(
//         500, 
//         "External service failed", 
//         [], 
//         externalError.stack // <-- This gets caught by `if (stack)`!
//     );                       
// }
// Summary
// A custom stack is passed simply by handing a string (usually someError.stack) as the 4th argument when you call 
// new ApiError(...). If you don't pass anything there, stack is empty (""), the if (stack) check fails, and it drops 
// down to auto-generate one using Error.captureStackTrace!



class APIerror extends Error
{
    constructor(
        statusCode,
        message= "Something went wrong",
        errors= [],
        stack= ""
        // stack here, we are referring to the "Stack Trace"—which is 
        // essentially the automated crime scene report that tells you exactly how your code got to the point of crashing
    )
    {
        super(message)
        this.statusCode = statusCode; // should be more than 400 or equal to it
        this.message= message;
        // passing data although it is not necessary to be there as a paramater in the constructor
        this.data = null;
        this.success = false;
        this.errors = errors;

        if(stack)
        {
            this.stack = stack
        }
        else{
            // passing the instance of the class which is (this) and 
            Error.captureStackTrace(this, this.constructor);
            // If a custom stack isn't passed (which is 99% of the time), 
            // this tells Node.js: "Hey, automatically generate a fresh stack trace right now."
        }
        
    }
}


export { APIerror }

//         Think of this.constructor like a "Do Not Enter" sign or a magic cutoff line for your error logs.

// Here is why we need it in plain English:

// The Problem Without It
// When your code crashes, Node.js automatically takes a picture of every single step your code took to get there 
// (the call stack).

// If you only give Node.js the error object (this), the stack trace photo will include the internal lines of code 
// inside your ApiError class file itself. Your error log would look something like this:

// Error happened at line 7 of ApiError.js

// Error happened at line 4 of ApiError.js

// Error happened at line 12 of user.controller.js

// That top part is useless! You didn't make a mistake inside your ApiError file; the mistake happened in your controller file.

// How this.constructor Fixes It
// By handing this.constructor to Node.js, you are telling it:

// "Hey Node, when you are taking the picture of where the error happened, stop recording the moment you enter the ApiError 
// class. Cut off everything above it!"

// Because of that "cutoff line," your error log becomes clean and goes straight to the point:

// Error happened at line 12 of user.controller.js 🚀

// It hides the boring helper-class code and points a giant neon arrow directly at the exact place you made a mistake 
// in your controller!




























// here we are again without comments code 



class APIerror extends Error
{
    constructor(
        statusCode,
        message= "Something went wrong",
        errors= [],
        stack= ""
    )
    {
        super(message)
        this.statusCode = statusCode;
        this.message= message;
        this.data = null;
        this.success = false;
        this.errors = errors;

        if(stack)
        {
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}


export { APIerror }