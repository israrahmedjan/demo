const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
    username: { type: String, Required: true },
    email: { type: String, Required: true, unique: true },
    password: { type: String, Required: true }

}, { timestamps: true })
const User = mongoose.model('Users', userSchema);
module.exports = User;
