import  jwt from "jsonwebtoken";

const resetToken =  (id) => {
  return jwt.sign({id}, process.env.RESET_TOKEN_SECRET, {
     expiresIn: process.env.RESET_TOKEN_EXPIRY ,
}); };

const generateAccessToken = (id,username,email) => {
    return jwt.sign({ id, email }, process.env.ACCESS_TOKEN_SECRET, {
       expiresIn: process.env.ACCESS_TOKEN_EXPIRY ,
  }); };

  const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
       expiresIn: process.env.REFRESH_TOKEN_EXPIRY ,
  }); };

export {generateAccessToken,generateRefreshToken,resetToken};