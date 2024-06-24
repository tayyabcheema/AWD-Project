// models/BloodStock.js
const mongoose = require('mongoose');

const BloodStockSchema = new mongoose.Schema({
    bloodType: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true,
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
});

module.exports = mongoose.model('BloodStock', BloodStockSchema);
