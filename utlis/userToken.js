import jwt from "jsonwebtoken";
import "dotenv/config";

function generateAccessToken(phoneNumber) {
  return jwt.sign({phoneNumber:phoneNumber}, process.env.TOKEN_SECRET, { expiresIn: '180d' });
}

export default  generateAccessToken;
