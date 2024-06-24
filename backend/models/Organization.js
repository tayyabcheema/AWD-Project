const mongoose = require("mongoose");

// Define the schema for the Organization model
const OrganizationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      // required: true,
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
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Matches Pakistani phone numbers starting with +92 or 03
          return /^(\+92|0)3[0-9]{9}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid phone number! Must be in the format +923xxxxxxxxx or 03xxxxxxxxx.`,
      },
    },
    address: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      // enum: ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "GB"],
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Organization model from the schema
const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports = Organization;
