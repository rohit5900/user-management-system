const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const { auth } = require("../middleware/auth");

// Mark attendance (current user)
router.post("/mark", auth, async (req, res) => {
  try {
    const record = new Attendance({
      userId: req.user.userId,
      date: new Date(),
      status: "present"
    });
    await record.save();
    res.json({ message: "Attendance saved", record });
  } catch (err) {
    console.error("Attendance mark error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get attendance for current user
router.get("/me", auth, async (req, res) => {
  try {
    const records = await Attendance.find({ userId: req.user.userId }).sort({ date: -1 }).limit(50);
    res.json(records);
  } catch (err) {
    console.error("Attendance fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: get all attendance (optional)
router.get("/", auth, async (req, res) => {
  try {
    // optionally check admin role
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
    const records = await Attendance.find().sort({ date: -1 }).limit(500);
    res.json(records);
  } catch (err) {
    console.error("Attendance admin fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
