const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const apiRoutes = require("./routes/api");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(fileUpload());
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3041;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
