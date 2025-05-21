const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3041;

const logger = require('./logger');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    logger.info("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB error:", err);
    logger.error("MongoDB error:", err);
  });

app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultSecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(express.json());
app.use(express.static("public"));

// app.use("/auth", require("./routes/auth"));

// session implementation
// function requireLogin(req, res, next) {
//   if (!req.session.userId) {
//     logger.error("Not authenticated");
//     return res.status(401).json({ error: "Not authenticated" });
//   }
//   next();
// }

const requireAuth = require("./middleware/auth");
app.use("/api", requireAuth, require("./routes/api"));

// app.use("/api", requireLogin, require("./routes/api"));

app.get("/", (req, res) => {
  if (req.session.userId) {
    res.sendFile(__dirname + "/public/home.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
