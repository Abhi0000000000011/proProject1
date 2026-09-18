// making a class for the api responses

// so now whenever we are sending a response we will be using this class as a refrence of how to send a api response 

// Instead of randomly typing res.json({ success: true, user: data }) or res.json({ status: 200, result: ... }) 
// differently in every route, this class ensures that every response looks completely uniform.





class APIresponse
{
    constructor(statusCode, data, message = "Success")
    {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        // This is NOT passed as an argument. 
        // Instead, we are calculating it automatically based on the statusCode!
        this.success = statusCode; // should be less than 400
    }
}