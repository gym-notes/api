const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("You are on workouts route!");
});

module.exports = router;
