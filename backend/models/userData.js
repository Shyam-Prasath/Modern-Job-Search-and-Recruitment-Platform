// userData.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    job: String,
    degree: String,
    resume: String, // Assuming resume is a URL
});

const UserData = mongoose.model("UserData", userSchema);

module.exports = UserData;
