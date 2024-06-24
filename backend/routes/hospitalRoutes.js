const express = require("express");
const router = express.Router();
const {
  getAllHospitals,
  getOneHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitalController");
const verifyAdmin = require("../middlewares/verifyAdmin");

// Get all hospitals (Admin only)
router.get("/hospitals", verifyAdmin, getAllHospitals);

// Get a single hospital by ID (Authenticated users)
router.get("/hospitals/:id", verifyAdmin, getOneHospital);

// Update a hospital by ID (Authenticated users)
router.put("/hospitals/:id", verifyAdmin, updateHospital);

// Delete a hospital by ID (Admin only)
router.delete("/hospitals/:id", verifyAdmin, deleteHospital);

module.exports = router;
