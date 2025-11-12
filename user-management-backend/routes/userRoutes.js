const express = require("express");
const User = require("../models/User");
const { auth, isAdmin } = require("../middleware/auth");
const router = express.Router();

// Get All Users (Admin)
router.get("/", auth, isAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});


// Update User (Admin)
router.put("/:id", auth, isAdmin, async (req, res) => {
  const { name, email, role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { name, email, role }, { new: true });
  res.json(user);
});


// Delete User (Admin)
router.delete("/:id", auth, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User Deleted" });
});

module.exports = router;
