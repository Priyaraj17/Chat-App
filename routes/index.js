const express = require("express");

const router = express.Router();

router.post("/login/:userId", (req, res) => {
  res.status(200).json({
    message: "Success",
  });
});

module.exports = router;
