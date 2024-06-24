const mongoose = require("mongoose");

// Define the schema for the Donor model
const donorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Remove whitespace from the beginning and end of strings
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 65,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    nationality: {
      type: String,
      required: true,
      enum: ["Pakistani"],
      default: "Pakistani",
    },
    medicalFit: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
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
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
      match: [
        /^((\+92)|(0))3\d{9}$/,
        "Please enter a valid Pakistani phone number.",
      ], // Validate Pakistani phone numbers
    },
    address: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
      enum: ["Downtown", "Uptown"],
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

// Create the Donor model from the schema
const Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor;
