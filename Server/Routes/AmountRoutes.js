const express = require("express");
const router = express.Router();
const { answer } = require("../Controllers/Firstreply");
const { amountRecalculate } = require("../Controllers/Amount");

// POST because data comes from body
router.post("/recalculate-amount", amountRecalculate);
router.get("/checkBackend", answer);

module.exports = router;
