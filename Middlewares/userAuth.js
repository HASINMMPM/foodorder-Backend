import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticateUser(req, res, next) {
  const token = req.cookies.token;

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
   

    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }

    console.log("user",user);

    next();
  });
}


export default authenticateUser;
