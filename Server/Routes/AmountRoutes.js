const express = require("express");
const router = express.Router();
const { answer } = require("../Controllers/Firstreply");
const { amountRecalculate } = require("../Controllers/Amount");
const { customAmount } = require("../Controllers/CustomAmount");
// POST because data comes from body
router.post("/recalculate-amount", amountRecalculate);
router.get("/checkBackend", answer);
router.post("/sponsorAmount", customAmount);
module.exports = router;
