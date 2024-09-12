import jwt from "jsonwebtoken";
import "dotenv/config";

function generateAccessToken(user) {
  return jwt.sign({ id: user._id, phoneNumber: user.phoneNumber }, process.env.TOKEN_SECRET, {
    expiresIn: "100d",
  });}

export default  generateAccessToken;
