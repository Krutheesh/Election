import asyncHandler from "../utils/asyncHandler.js";
import JWT from 'jsonwebtoken'
import User from '../models/userModel.js'
export const isLoggedIn = asyncHandler(async(req, res, next) => {
  const cookie = req.cookies;
  console.log("cookie:", cookie);
  let token;
  if (
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.startWith("Bearer"))
  ) {
      token = req.cookies.token || req.headers.authorization.split('')[1];
      if(!token){
        throw new Error("not authorized to access this route ---- please login------")
      }

      try {
        const decodedJwtPayload = JWT.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decodedJwtPayload)
        next()
      } catch (error) {
        throw new Error('not authorized to access this route, please login')
      }
  }
});
