const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const tokenFromCookie = req.cookies.accessToken;
  // console.log({tokenFromHeaders: authHeader});
  // console.log({tokenFromCookies: tokenFromCookie});

  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (tokenFromCookie) {
    token = tokenFromCookie;
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Remove any extraneous quotes from the token
  token = token.replace(/['"]+/g, "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = verifyAdmin;




// const jwt = require("jsonwebtoken");
// const createError = require("../utils/error");

// const verifyAdmin = (req, res, next) => {
//   const token = req.cookies.accessToken;

//   try {
//     if (!token) {
//       return res
//         .status(404)
//         .json({ message: "Access denied No token provided!" });
//     }

//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;

//     if (!req.user.adminId) {
//       return res
//         .status(403)
//         .json({ message: "Access Denied: You do not have admin privileges" });
//     }

//     next();
//   } catch (error) {
//     console.log(error.message);
//     return res.status(400).json({ message: "Invalid Token" });
//   }
// };

// module.exports = verifyAdmin;
