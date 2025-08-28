const mongoose = require('mongoose');

// Define the schema properly using 'new'
const userSchema = new mongoose.Schema({
  username: String,
  email: String,  
  password: String,
  role: String,
  isActivated:{
        type: Boolean,
        default: false
  },
  activationToken: String
});

// Create the model with a meaningful name (e.g., 'User')
const User = mongoose.model('User', userSchema);

module.exports = User;