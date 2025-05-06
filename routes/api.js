const express = require("express");
const router = express.Router();
const fs = require("fs");
const {
  reverseText,
  diffText,
  countText,
  convertCase,
} = require("../utils/textUtils");

router.post("/reverse", (req, res) => {
  const { text } = req.body;
  res.json({ result: reverseText(text) });
});

router.post("/diff", (req, res) => {
  const { text1, text2 } = req.body;
  res.json({ result: diffText(text1, text2) });
});

router.post("/count", (req, res) => {
  const { text } = req.body;
  res.json(countText(text));
});

router.post("/convert", (req, res) => {
  const { text, type } = req.body;
  res.json({ result: convertCase(text, type) });
});

router.post("/upload", (req, res) => {
  const file = req.files?.file;
  if (!file) return res.status(400).send("No file uploaded.");
  const content = file.data.toString("utf8");
  res.json({ content });
});

module.exports = router;
