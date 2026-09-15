// making a class for the api responses

// so now whenever we are sending a res we will be using this class as a refrence of how to send a api response 
class APIresponse
{
    constructor(statusCode, data, message = "Success")
    {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode; // should be less than 400
    }
}