const express = require("express");
const router = express.Router();
const createSupportTicket = require("../Controllers/createSupportticket");
const SupportTicket = require("../Models/SupportTicket");
router.post("/create-ticket", createSupportTicket);
router.get("/all", async (req, res) => {
  try {
    const tickets = await SupportTicket.find().sort({ createdAt: -1 });

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
