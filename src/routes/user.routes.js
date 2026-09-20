import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";


const userRouter = Router()

userRouter.route("/register").post(registerUser)
// as we want to run registerUser method when we get to the "http://localhost:8000/api/v1/users/register" so we do this 
// as we know that post interact with th resouces ad=nd add things so with this this will add this particular user 
// in our database which we will do further 

export default userRouter

