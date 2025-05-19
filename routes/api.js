const express = require("express");
const router = express.Router();
const multer = require("multer");
const History = require("../models/History");
const {
  reverseText,
  diffText,
  countText,
  convertCase,
} = require("../utils/textUtils");

const upload = multer();

const logger = require("../logger");

const saveHistory = async (req, action, input, result) => {
  if (!req.session.userId) return;
  try {
    await History.create({
      user: req.session.userId,
      action,
      input,
      result,
    });
  } catch (e) {}
};

router.post("/reverse", async (req, res) => {
  const { text } = req.body;
  const result = reverseText(text || "");
  await saveHistory(req, "reverse", { text }, result);
  logger.info("reverse", result);
  res.json({ result });
});

router.post("/diff", async (req, res) => {
  const { text1, text2 } = req.body;
  const result = diffText(text1 || "", text2 || "");
  await saveHistory(req, "diff", { text1, text2 }, result);
  logger.info("diff", result);
  res.json({ result });
});

router.post("/count", async (req, res) => {
  const { text } = req.body;
  const result = countText(text || "");
  await saveHistory(req, "count", { text }, result);
  logger.info("count", result);
  res.json(result);
});

router.post("/convert", async (req, res) => {
  const { text, type } = req.body;
  const result = convertCase(text || "", type || "upper");
  await saveHistory(req, "convert", { text, type }, result);
  logger.info("convert", result);
  res.json({ result });
});

// File upload (text only)
router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    logger.error("No file uploaded.");
    return res.status(400).send("No file uploaded.");
  }
  const content = req.file.buffer.toString("utf8");
  logger.info("file", content);
  res.json({ content });
});

// User history
router.get("/history", async (req, res) => {
  const items = await History.find({ user: req.session.userId })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();
  res.json(
    items.map(({ action, input, result, createdAt }) => ({
      action,
      input,
      result,
      createdAt,
    }))
  );
});

module.exports = router;
