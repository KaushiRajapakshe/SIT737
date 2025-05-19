const express = require("express");
const router = express.Router();
const User = require("../models/User");

const logger = require("../logger");

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password || username.length < 3 || password.length < 6) {
    logger.error("Username must be at least 3 chars and password at least 6.");
    return res.status(400).json({
      error: "Username must be at least 3 chars and password at least 6.",
    });
  }
  try {
    const user = new User({ username, password });
    await user.save();
    req.session.userId = user._id;
    res.json({ success: true });
  } catch (err) {
    if (err.code === 11000) {
      logger.error("Username already taken");
      return res.status(409).json({ error: "Username already taken" });
    }
    logger.error("Server error");
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    logger.error("Missing credentials.");
    return res.status(400).json({ error: "Missing credentials." });
  }
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    logger.error("Invalid username or password.");
    return res.status(400).json({ error: "Invalid username or password." });
  }
  req.session.userId = user._id;
  res.json({ success: true });
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

router.get("/session", (req, res) => {
  res.json({ loggedIn: !!req.session.userId });
});

module.exports = router;
