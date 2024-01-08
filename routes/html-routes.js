// exports an Express router
// defines two routes: one to index.html file notes.html

const router = require("express").Router();
const path = require("path");

// Defines route to send index.html
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Defines route to notes.html
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;

// import & mount as middleware

const express = require("express");
const app = express();
const htmlRoutes = require("./html.routes");

// mount the HTML routes middleware
app.use("/", htmlRoutes);

// ... other middleware & routes ...

// start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});