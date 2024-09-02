import {catchAsyncError} from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { User } from "../models/userSchema.js";




export const register = catchAsyncError(async(req, res ,next) => {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) {
      return next(new ErrorHandler("Please fill full form!"));
    }
    const isEmail = await User.findOne({email}) ;   //findone to find out user is registared or not!!
    if(isEmail){
        return next(new ErrorHandler ("Email already registared"));
    }
    const user = await User.create({
        name,
        email,
        phone,
        role,
        password,
    })
    res.status(200).json({
        success: true,
        message: "Welcome you'r registered!",
        user,
    });
});