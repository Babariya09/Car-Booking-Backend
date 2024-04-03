const mongoose = require("mongoose");

const AddDriver = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    licenseNumber: String,
    state: String
});

module.exports = mongoose.model("Driver Data", AddDriver);
