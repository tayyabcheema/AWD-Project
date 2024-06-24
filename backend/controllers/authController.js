const Admin = require("../models/Admin");
const Donor = require("../models/Donor");
const Hospital = require("../models/Hospital");
const Organization = require("../models/Organization");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateTokens = require("../utils/generateTokens");
const cookieOptions = require("../utils/cookieOptions");
const createError = require("../utils/error");

// Admin Auth
const registerAdmin = async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    if (!name || !email || !password || !isAdmin) {
      return next(createError(400, "All fields are required"));
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return next(createError(400, "Admin already exists"));
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = new Admin({ name, email, password: hashedPassword, isAdmin });
    await admin.save();
    return res
      .status(201)
      .json({ success: true, message: "Admin registered successfully" });
  } catch (error) {
    next(createError(500, "Error registering Admin"));
  }
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(createError(400, "All fields are required"));
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return next(createError(404, "Admin not found"));
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return next(createError(400, "Invalid credentials"));
    }
    const { accessToken, refreshToken } = generateTokens({
      adminId: admin._id,
    });
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);
    return res.status(200).json({
      message: "Successfully logged in",
      data: {
        accessToken,
        refreshToken,
        user: { adminId: admin._id, adminEmail: admin.email },
      },
    });
  } catch (error) {
    next(createError(500, "Admin Login Failed"));
  }
};

// Donor Auth
const registerDonor = async (req, res, next) => {
  const {
    name,
    age,
    bloodGroup,
    nationality,
    medicalFit,
    email,
    password,
    phone,
    address,
    area,
    city,
  } = req.body;
  try {
    if (
      !name ||
      !age ||
      !bloodGroup ||
      !nationality ||
      !medicalFit ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !area ||
      !city
    ) {
      return next(createError(400, "All fields are required"));
    }

    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
      return next(createError(400, "Donor already exists"));
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const donor = new Donor({
      name,
      age,
      bloodGroup,
      nationality,
      medicalFit,
      email,
      password: hashedPassword,
      phone,
      address,
      area,
      city,
    });
    await donor.save();
    return res.status(201).json({
      success: true,
      message: "Donor registered successfully",
      data: donor,
    });
  } catch (error) {
    next(createError(500, "Error registering Donor"));
  }
};

const loginDonor = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(createError(400, "All fields are required"));
    }

    const donor = await Donor.findOne({ email });
    if (!donor) {
      return next(createError(404, "Donor not found"));
    }
    const isPasswordValid = await bcrypt.compare(password, donor.password);
    if (!isPasswordValid) {
      return next(createError(400, "Invalid credentials"));
    }
    const { accessToken, refreshToken } = generateTokens({
      donorId: donor._id,
    });
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);
    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: {
        accessToken,
        refreshToken,
        user: { donorId: donor._id, donorEmail: donor.email },
      },
    });
  } catch (error) {
    next(createError(500, "Donor login failed"));
  }
};

// Hospital Auth
const registerHospital = async (req, res, next) => {
  const { name, type, email, password, phone, address, area, city } = req.body;
  try {
    if (
      !name ||
      !type ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !area ||
      !city
    ) {
      return next(createError(400, "All fields are required"));
    }

    const existingHospital = await Hospital.findOne({ email });
    if (existingHospital) {
      return next(createError(400, "Hospital already exists"));
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const hospital = new Hospital({
      name,
      type,
      email,
      password: hashedPassword,
      phone,
      address,
      area,
      city,
    });
    await hospital.save();
    return res.status(201).json({
      success: true,
      message: "Hospital registered successfully",
      data: hospital,
    });
  } catch (error) {
    next(createError(500, "Error registering Hospital"));
  }
};

const loginHospital = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(createError(400, "All fields are required"));
    }

    const hospital = await Hospital.findOne({ email });
    if (!hospital) {
      return next(createError(404, "Hospital not found"));
    }
    const isPasswordValid = await bcrypt.compare(password, hospital.password);
    if (!isPasswordValid) {
      return next(createError(400, "Invalid credentials"));
    }
    const { accessToken, refreshToken } = generateTokens({
      hospitalId: hospital._id,
    });
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);
    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: {
        accessToken,
        refreshToken,
        user: { hospitalId: hospital._id, hospitalEmail: hospital.email },
      },
    });
  } catch (error) {
    next(createError(500, "Hospital login Failed"));
  }
};

// Organization Auth
const registerOrganization = async (req, res, next) => {
  const { name, email, password, phone, address, area, city } = req.body;
  try {
    if (!name || !email || !password || !phone || !address || !area || !city) {
      return next(createError(400, "All fields are required"));
    }

    const existingOrganization = await Organization.findOne({ email });
    if (existingOrganization) {
      return next(createError(400, "Organization already exists"));
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const organization = new Organization({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      area,
      city,
    });
    await organization.save();
    return res.status(201).json({
      success: true,
      message: "Organization registered successfully",
      data: organization,
    });
  } catch (error) {
    next(createError(500, "Error registering Organization"));
  }
};

const loginOrganization = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(createError(400, "All fields are required"));
    }

    const organization = await Organization.findOne({ email });
    if (!organization) {
      return next(createError(404, "Organization not found"));
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      organization.password
    );
    if (!isPasswordValid) {
      return next(createError(400, "Invalid credentials"));
    }
    const { accessToken, refreshToken } = generateTokens({
      organizationId: organization._id,
    });
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);
    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: {
        accessToken,
        refreshToken,
        user: {
          organizationId: organization._id,
          organizationRmail: organization.email,
        },
      },
    });
  } catch (error) {
    next(createError(500, "Organization login failed"));
  }
};

// Token Refresh
const refresh = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return next(createError(401, "No token, authorization denied"));
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const { adminId, donorId, hospitalId, organizationId } = decoded;
    const newAccessToken = jwt.sign(
      { adminId, donorId, hospitalId, organizationId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    res.cookie("accessToken", newAccessToken, cookieOptions);
    res.json({ message: "Access token refreshed" });
  } catch (error) {
    console.log("Error verifying token", error.message);
    next(createError(401, "Token is not valid"));
  }
};

// Logout Function
const logout = (req, res, next) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  registerAdmin,
  loginAdmin,
  registerDonor,
  loginDonor,
  registerHospital,
  loginHospital,
  registerOrganization,
  loginOrganization,
  refresh,
  logout,
};
