// routes/organizationRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllOrganizations,
  getOneOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../controllers/organizationController");
const verifyAdmin = require("../middlewares/verifyAdmin");

// Get all organizations (Admin only)
router.get("/organizations", verifyAdmin, getAllOrganizations);

// Get an organization by ID (Authenticated users)
router.get("/organizations/:id", verifyAdmin, getOneOrganization);

// Update an organization by ID (Authenticated users)
router.put("/organizations/:id", verifyAdmin, updateOrganization);

// Delete an organization by ID (Admin only)
router.delete("/organizations/:id", verifyAdmin, deleteOrganization);

module.exports = router;
