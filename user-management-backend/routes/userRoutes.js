const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth, isAdmin } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, req.user.userId + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ===================== ADMIN ROUTES =====================

// Get all users (ADMIN ONLY)
router.get("/", auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update any user (ADMIN ONLY)
router.put("/:id", auth, isAdmin, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    res.json({ message: "User updated", user: updated });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete any user (ADMIN ONLY)
router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===================== PROFILE ROUTES =====================

// Get logged-in user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    console.error("Profile load error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update logged-in user
router.put("/me", auth, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.userId,
      { name: req.body.name },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated", user: updated });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// Upload profile picture
router.post("/upload-photo", auth, upload.single("profilePic"), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { profilePic: `/uploads/${req.file.filename}` },
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile picture updated",
      user,
    });
  } catch (err) {
    console.error("Photo upload error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
