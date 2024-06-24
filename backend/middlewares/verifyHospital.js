const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

const verifyHospital = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log({ AccessToken: token });

  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied: No token provided" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    if (!req.user.hospitalId) {
      return res.status(403).json({
        messsage: "Access Denied: You do not have hospital privileges",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = verifyHospital;
