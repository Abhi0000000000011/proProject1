// this file is to make sure that our errors responses are in standardized manner 


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
        this.statusCode = statusCode; // should be more than 400 or equal to it
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
            // passing the instance of the class
        }

    }
}


export { APIerror }