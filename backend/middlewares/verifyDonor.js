const jwt = require("jsonwebtoken");

const verifyDonor = (req, res, next) => {
  const token = req.cookies.accessToken;

  try {
    if (!token) {
      return res
        .status(404)
        .json({ message: "Access denied No token provided!" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    if (!req.user.donorId) {
      return res
        .status(403)
        .json({ message: "Access Denied: You do not have Donor privileges" });
    }

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = verifyDonor;
