import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import { User } from "../models/userSchema.js";

export const isAuthorized = catchAsyncError(async(req, res, next)=>{
    const {token} = req.cookies;  //token is variable we can provide anyname
    if(!token){
        return next(new ErrorHandler("User not authorized", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decoded.id);

    next();
})