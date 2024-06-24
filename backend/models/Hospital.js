const mongoose = require("mongoose");

// Define the schema for the Hospital model
const HospitalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["hospital", "organization"],
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
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^((\+92)|(0))\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
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
); // Automatically add createdAt and updatedAt fields

// Create the Hospital model from the schema
const Hospital = mongoose.model("Hospital", HospitalSchema);

module.exports = Hospital;
