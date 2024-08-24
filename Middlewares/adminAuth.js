import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticateAdmin(req, res, next) {
  const token = req.cookies.token;
  // console.log(token);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    console.log("jwt result", result);

    if (result.role === "Admin") {
      next();
    } else {
      return res.send("You cant access this rout");
    }
  });
}

function authenticateSuperAdmin(req, res, next) {
  const token = req.cookies.token;
  // console.log(token);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    console.log("jwt result", result);

    if (result.role === "Super admin") {
      next();
    } else {
      return res.send("You cant access this Page");
    }
  });
}

function adminsValidation(req, res, next) {
  const token = req.cookies.token;
  // console.log(token);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    console.log("jwt result", result);

    if (result.role === "Admin" || "Super admin") {
      next();
    } else {
      return res.send("You cant access this rout");
    }
  });
}

export { authenticateAdmin, authenticateSuperAdmin, adminsValidation };
