const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

const verifyOrganization = (req, res, next) => {
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

    if (!req.user.organizationId) {
      return res.status(403).json({
        message: "Access Denied: You do not have organization privileges",
      });
    }

    next();
  } catch (error) {
    return next(createError(400, "Invalid Token"));
  }
};

module.exports = verifyOrganization;
