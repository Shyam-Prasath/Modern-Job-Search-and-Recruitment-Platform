//Register.js
const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    category: { type: String, required: true, enum: ['hiring', 'job wanted'] }
});

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
