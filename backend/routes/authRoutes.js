const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/authController");
const verifyAdmin = require("../middlewares/verifyAdmin");
const verifyHospital = require("../middlewares/verifyHospital");
const verifyOrganization = require("../middlewares/verifyOrganization");
const verifyDonor = require("../middlewares/verifyDonor");

// Admin Auth Routes
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.post("/admin/refresh", verifyAdmin, refresh);
router.post("/admin/logout", verifyAdmin, logout);

// Donor Auth Routes
router.post("/donor/register", registerDonor);
router.post("/donor/login", loginDonor);
router.post("/donor/refresh", verifyDonor, refresh);
router.post("/donor/logout", verifyDonor, logout);

// Hospital Auth Routes
router.post("/hospital/register", registerHospital);
router.post("/hospital/login", loginHospital);
router.post("/hospital/refresh", verifyHospital, refresh);
router.post("/hospital/logout", verifyHospital, logout);

// Organization Auth Routes
router.post("/organization/register", registerOrganization);
router.post("/organization/login", loginOrganization);
router.post("/organization/refresh", verifyOrganization, refresh);
router.post("/organization/logout", verifyOrganization, logout);

module.exports = router;
