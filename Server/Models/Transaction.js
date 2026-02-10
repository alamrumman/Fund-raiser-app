const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    // 🧑 User info
    name: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      enum: ["first", "second", "third"],
      required: true,
    },
    gender: {
      type: String,
      enum: ["SW", "SD"],
    },

    // 💰 Payment info (your system)
    amount: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String, // your internal order id
      required: true,
      unique: true,
      index: true,
    },

    // 🔁 IMB identifiers (VERY IMPORTANT)
    imbOrderId: {
      type: String, // IMB's orderId (from create-order response)
      index: true,
    },
    imbTxnRef: {
      type: String, // extracted from check_link (UPIx...)
      index: true,
    },
    checkLink: {
      type: String, // IMB public status URL
    },

    // 🏦 Payment resolution
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
      index: true,
    },
    utr: {
      type: String, // may arrive late or via webhook
    },

    // 🧠 Meta / reconciliation
    source: {
      type: String,
      enum: ["QR", "INTENT", "UNKNOWN"],
      default: "UNKNOWN",
    },
    verifiedAt: {
      type: Date, // when status became final
    },

    // 🔍 Debug / audit
    rawGatewayResponse: {
      type: Object, // optional: store last check-status response
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  },
);

module.exports = mongoose.model("Transaction", transactionSchema);
