const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // El campo `username` debe ser único
  password: { type: String, required: true } // El campo `password` debe ser obligatorio
});

const User = mongoose.model('User', userSchema);

module.exports = User;