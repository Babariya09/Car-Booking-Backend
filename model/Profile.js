const mongoose = require("mongoose");

const Profile = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    gender: String,
    dob: String,
    Address: String,
});

module.exports = mongoose.model("Profile Data", Profile);
