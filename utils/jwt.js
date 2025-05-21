const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "fallbackSecret";

function generateToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, secret, {
    expiresIn: "1d",
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
