import jwt from 'jsonwebtoken';
import 'dotenv/config';

function generateAdminToken(admin) {
  try {
    return jwt.sign({ id: admin._id, role: admin.role }, process.env.TOKEN_SECRET, {
      expiresIn: "100d",
    });
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
}

export default generateAdminToken;
