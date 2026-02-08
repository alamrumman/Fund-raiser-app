const express = require("express");
const router = express.Router();
const { imbWebhook } = require("../Controllers/Webhook");

// POST because data comes from body
router.post("/imb-webhook", imbWebhook);

module.exports = router;
