const Organization = require("../models/Organization");

// Get All Organizations

const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    return res.status(200).json({ data: organizations });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

// Get One Organization using specific ID

const getOneOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    return res.status(200).json({ data: organization });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// update Organization using specific ID

const updateOrganization = async (req, res) => {
  const { name, email, phone, address, area, city } = req.body;

  const updatedFields = {
    name,
    email,
    phone,
    address,
    area,
    city,
  };

  try {
    let organization = await Organization.findById(req.params.id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    organization = await Organization.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    return res.status(201).send({
      message: "Organization Updated Successfully",
      data: organization,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ message: "Server error" });
  }
};

// Delete Organization using Specific ID

const deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    await Organization.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ message: "Organization Deleted successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ message: "Server error" });
  }
};

module.exports = {
  getAllOrganizations,
  getOneOrganization,
  updateOrganization,
  deleteOrganization,
};
