const mongoose = require("mongoose");

const supportTicketSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    upiRef: { type: String, required: true, unique: true },
    message: { type: String, required: true },

    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },

    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const SupportTicket = mongoose.model(
  "SupportTicket",
  supportTicketSchema
);

module.exports = SupportTicket;
