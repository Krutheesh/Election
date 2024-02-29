import asyncHandler from "../utils/asyncHandler.js";
import User from '../models/userModel.js'
import sendEmail from '../utils/mailHelper.js'
import crypto from 'crypto'
const cookieOptions = {
  expires : new Date(Date.now() +3*24*60*60*1000),
  httpOnly:true
}
export const register = asyncHandler(async(req,res) => {
  const {name,email,password,constituency} = req.body;
  console.log(name,email,password)
     if(!name || !email || !password){
      console.log("Fields are missing")
      throw new Error("Fields are missing")
     }
    const existingUser = await  User.findOne({email})
    // console.log(existingUser)
     if(existingUser){
      throw new Error("User already exist")
     }
     const newUser = await User.create(
      {
        name,
        email,
        password,
        constituency
      }
     )
    
     const token = newUser.getJwtToken();
    //  console.log(token)
     newUser.password=undefined
    //  console.log(newUser)
     res.cookie("token",token,cookieOptions)
     res.status(200).json({
      success:true,
      token,
      newUser
     });
})

export const login = asyncHandler(async(req,res) => {

  const {email,password} = req.body;
  console.log(email,password)
     if( !email || !password){
      console.log("Fields are missing")
      throw new Error("Fields are missing")
     }
    const existingUser = await  User.findOne({email}).select("+password")
     if(!existingUser){
      throw new Error("User not found")
     }

     const isPasswordMatched = await existingUser.comparePassword(password)
     if(!isPasswordMatched) {
      throw new Error("incorrect password")
     }
     const token = existingUser.getJwtToken();
     existingUser.password = undefined ;
     res.cookie("token", token, cookieOptions);
     res.status(200).json({
      success:true,
      token,
      existingUser
     });

     
})

export const logout = asyncHandler(async (req,res) => {
 res.cookie("token", null, {
  expires: new Date(Date.now()),
  httpOnly:true
 });

 res.status(200).json({
  success:true,
  message:"Logged Out"
 });
  

});

export const getProfile = asyncHandler(async (req,res) => {
  console.log("user details")
  const {user} = req;
  // console.log(user)
  const userDetails = await User.findById(user.id);
  
  if(!user){
   throw new Error("User not found")
  }
  userDetails.password=undefined
  res.status(200).json({
    success:true,
    userDetails,
  });
   
 
 });


 export const forgotPassword = asyncHandler(async (req,res) => {
 const {email} = req.body;
 console.log("email:", email);

 const user = await User.findOne({email});
 if(!user){
  throw new Error("User not found");
 }
 console.log("__generating___")
 const resetToken = user.generateForgotPasswordToken();
 await user.save({ validateBeforeSave: false });
 const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
 const message = `Your password reset token is as follow: \n\n${resetUrl}\n\n If you have not requested this email, then ignore it.`
 console.log(resetUrl, user.email)
 try {
  await sendEmail({
    email:user.email,
    subject:"password recovery",
    message
  })
  res.status(200).json({
    success:true,
    message:`Email sent to: ${user.email}`
  });
  
 } catch (error) {
  user.forgotPassword=undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save({validateBefore:false})
  throw new Error(`${err.message}, ${err.code} error in mailing`)
 }
 });
 

 export const resetPassword = asyncHandler(async (req,res) => {
  const {password} = req.body;
  const {resetToken} = req.params
  console.log(password)
  console.log(resetToken)
 const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest("hex");
console.log("----"+resetPasswordToken)
 const user = await User.findOne({
  forgotPasswordToken:resetPasswordToken,
  forgotPasswordExpiry:{$gt: Date.now()}
 })
  console.log("----"+user);
  if(!user){
    throw new Error("user not found to reset password")
  }
  user.password = password;
  user.forgotPasswordToken=undefined
  user.forgotPasswordExpiry = undefined;
  await user.save() ;
  const token = user.getJwtToken();
  res.cookie("token", token,cookieOptions);
  res.status(200).json({
    success:true,
    user
  })
  });
 
  
  


  
