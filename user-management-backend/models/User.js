const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, default: "employee" },
  profilePic: { type: String, default: "" }
});

// IMPORTANT: This MUST be the only export
module.exports = mongoose.model("User", UserSchema);
