import jwt from "jsonwebtoken";
import "dotenv/config";

function generateAdminToken(role) {
    
  return jwt.sign({role:role}, process.env.TOKEN_SECRET, { expiresIn: '180d' });
  
}

export default  generateAdminToken; 
