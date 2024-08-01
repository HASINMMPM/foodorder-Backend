import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticateUser(req, res, next) {
  const token = req.cookies.token;

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) {
      return res.sendStatus(403);
    }

    console.log(user);

    next();
  });
}

export default authenticateUser;
