import mongoose from "mongoose";
import validator from "validator";  
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your valid name"],
        minLength: [3, "Name must conatain at list 3 characters!"],
        maxLength: [30, "Name cannot exceed more than 30 characters!"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
        type: Number,
        required: [true , "Please provide your phone number"],
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: [8 , "Password must be 8 words !"],
        maxLength: [32 , "Password cannot exceed 32 words !"],
    },
    role: {
        type: String,
        required: [true, "Please select a role"],
        enum: ["Job Seeker", "Employer"],
      },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

//hassing password

// ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES THEIR PASSWORD
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next(); // If the password hasn't been modified, move to the next middleware
    }
    this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt rounds value of 10 beacsue of companies prefere
    next(); // Proceed to save the document
  });
  
  // COMPARING THE PASSWORD ENTERED BY THE USER WITH THE STORED PASSWORD
  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with hashed password
  };
  
  // GENERATING A JWT TOKEN FOR THE USER AUTHORIZATIONS to varifiy inside utils folder jwt token 
  userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {   //_id is comming from mongodb when any user created
      expiresIn: process.env.JWT_EXPIRES, // Set the token expiration time
    });
  };
  

export const User = mongoose.model("User", userSchema);  //this is user model creation 