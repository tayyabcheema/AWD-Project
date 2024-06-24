const mongoose = require("mongoose");

// Define the schema for the Admin model
const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."], // Validate email format
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // Set default value for isAdmin
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the Admin model from the schema
const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
