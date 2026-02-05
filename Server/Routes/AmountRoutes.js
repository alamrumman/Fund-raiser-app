const express = require("express");
const router = express.Router();

const { amountRecalculate } = require("../Controllers/Amount");

// POST because data comes from body
router.post("/recalculate-amount", amountRecalculate);

module.exports = router;
