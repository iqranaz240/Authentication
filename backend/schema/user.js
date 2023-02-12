const mongoose = require("mongoose");

let userInfo = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String
});

module.exports = userInfo = mongoose.model("Users", userInfo);