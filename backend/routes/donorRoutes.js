const express = require("express");
const router = express.Router();
const {
  getAllDonors,
  getOneDonor,
  updateDonor,
  deleteDonor,
} = require("../controllers/donorController");
const verifyAdmin = require("../middlewares/verifyAdmin");

// Get all donors (Admin only)
router.get("/donors", verifyAdmin, getAllDonors);

// Get a single donor by ID (Authenticated users)
router.get("/donors/:id", verifyAdmin, getOneDonor);

// Update a donor by ID (Authenticated users)
router.put("/donors/:id", verifyAdmin, updateDonor);

// Delete a donor by ID (Admin only)
router.delete("/donors/:id", verifyAdmin, deleteDonor);

module.exports = router;
